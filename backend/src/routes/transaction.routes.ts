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

    const requestPayload = await c.req.text();
    const validatedPayload = TransactionSchema.safeParse(requestPayload);

    if (!validatedPayload.success) {
      return c.json({ error: "Bad request" }, 400);
    }

    const { text } = validatedPayload.data;
    const transaction = await extractTransaction(text);
    const newTransaction = await prisma.transaction.create({
      data: {
        amount: transaction.amount,
        category: transaction.type,
        transactionDate: transaction.date,
        description: transaction.description ?? "",
        userId: user.id,
        merchantName: transaction.merchant ?? "",
        runningBalance: transaction.balance ?? 0,
        transactionType: transaction.type,
        currency: transaction.currency ?? "INR",
        rawText: text,
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

    const { currentPage, page, cursor } = c.req.query();

    const offset = 10;

    let query: Prisma.TransactionFindManyArgs = {
      take: parseInt(currentPage) > parseInt(page) ? -offset : offset,
      cursor: { id: user.id },
      where: { userId: user.id },
      orderBy: { transactionDate: "desc" },
    };

    if (cursor) {
      const decodedCursor = decodeCursor(cursor);
      query.cursor = { id: decodedCursor };
      query.skip = 1;
    }
    const transactions = await prisma.transaction.findMany(query);
    const nextCursor = transactions[-1].id;
    const prevCursor = parseInt(page) == 1 ? null : transactions[0].id;

    return c.json({
      currentPage: parseInt(currentPage),
      totalPages: Math.ceil(transactions.length / offset),
      transactions,
      next: encodeCursor(nextCursor),
      prev: encodeCursor(prevCursor),
      hasMore: transactions.length === offset,
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch transactions" }, 500);
  }
});

export default transactionRoutes;
