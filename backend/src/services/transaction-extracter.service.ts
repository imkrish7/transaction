import { ChatOllama } from "@langchain/ollama";
import { get } from "node:https";
import { z } from "zod";
import getSystemPrompt from "../utiles/llm.prompt.ts";

const TransactionSchema = z.object({
  date: z.string().describe("YYYY-MM-DD format"),
  merchant: z.string(),
  amount: z.number().describe("Negative for debits, positive for credits"),
  currency: z.string().default("INR"),
  type: z.enum(["DEBIT", "CREDIT"]),
  balance: z.number().nullable(),
  description: z.string().nullable(),
});

type Transaction = z.infer<typeof TransactionSchema>;

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
  maxRetries: 2,
});

export const extractTransaction = async (
  text: string,
): Promise<Transaction> => {
  const llmWithSchema = llm.withStructuredOutput(TransactionSchema);
  const prompt = getSystemPrompt(text);

  const response = await llmWithSchema.invoke(prompt);
  const transaction = response as Transaction;

  return transaction;
};
