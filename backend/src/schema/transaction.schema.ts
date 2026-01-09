import { z } from "zod";

export const TransactionSchema = z.object({
  text: z.string().describe("The text of the transaction"),
});
