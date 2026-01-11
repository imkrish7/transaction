import { Hono } from "hono";
import { type AppContext } from "../types/app.types.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { TransactionSchema } from "../schema/transaction.schema.ts";
import { extractTransaction } from "../services/transaction-extracter.service.ts";
import prisma from "../lib/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";
import { decodeCursor, encodeCursor } from "../utiles/cursor.util.ts";

const transactionRoutes = new Hono<AppContext>().basePath("/transactions");

transactionRoutes.use(authMiddleware);

transactionRoutes.post("/extract", async (c) => {
  try {
    const user = c.get("user");
    if (!user) throw new Error("User not found");

    const requestPayload = await c.req.json();

    const validatedPayload = TransactionSchema.safeParse(requestPayload);

    if (!validatedPayload.success) {
      return c.json({ error: "Bad request" }, 400);
    }

    const { txText } = validatedPayload.data;
    const transaction = await extractTransaction(txText);

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: transaction.amount,
        category: transaction.type,
        transactionDate: new Date(transaction.date).toISOString(),
        description: transaction.description ?? "",
        userId: user.id,
        merchantName: transaction.merchant ?? "",
        runningBalance: transaction.balance ?? 0,
        transactionType: transaction.type,
        currency: transaction.currency ?? "INR",
        rawText: txText,
      },
    });
    return c.json(transaction);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to extract transactions" }, 500);
  }
});

transactionRoutes.get("/", async (c) => {
  try {
    const user = c.get("user");
    if (!user) throw new Error("User not found");

    const { dir, page, cursor } = c.req.query();

    const offset = 10;

    let query: Prisma.TransactionFindManyArgs = {
      take: dir === "prev" ? -offset : offset,
      where: { userId: user.id },
      orderBy: { id: "desc" },
    };

    if (cursor !== "null") {
      const decodedCursor = decodeCursor(cursor);
      query.cursor = { id: decodedCursor };
      query.skip = 1;
    }

    let transactions = await prisma.transaction.findMany(query);
    if (dir === "prev") {
      transactions = transactions.reverse();
    }
    const first = transactions[0] ?? null;
    const last = transactions[transactions.length - 1] ?? null;

    const nextCursor = last ? encodeCursor(last.id) : null;
    const prevCursor = first ? encodeCursor(first.id) : null;

    return c.json({
      currentPage: parseInt(page),
      totalPages: Math.ceil(transactions.length / offset),
      transactions,
      next: nextCursor,
      prev: prevCursor,
      hasMore: transactions.length === offset,
    });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch transactions" }, 500);
  }
});

export default transactionRoutes;
