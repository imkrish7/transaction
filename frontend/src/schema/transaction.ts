import { z } from "zod";

export const TransactionSchema = z.object({
  txText: z.string().describe("The text of the transaction"),
});
