import { TransactionSchema } from "@/schema/transaction";
import z from "zod";

export type TransactionFormState = {
  values: z.infer<typeof TransactionSchema>;
  errors: null | Partial<
    Record<keyof z.infer<typeof TransactionSchema>, string[]>
  >;
  success: boolean;
};

export type Transaction = {
  id: string;
  transactionDate: string;
  amount: number;
  description: string;
  category: string;
  type: string;
  currency: string;
  userId: string;
  createdAt: Date;
  transactionType: string;
  merchantName: string;
  runningBalance: number;
};
