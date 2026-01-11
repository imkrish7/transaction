"use server";
import { TransactionSchema } from "@/schema/transaction";
import { TransactionFormState } from "@/types/transaction.type";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const addTransactionAction = async (
  _prevState: TransactionFormState,
  transaction: FormData,
) => {
  try {
    const transactionPayload = {
      txText: transaction.get("txText") || "",
    };

    const validatePayload = TransactionSchema.safeParse(transactionPayload);

    if (!validatePayload.success) {
      return {
        values: {
          txText: "",
        },
        errors: validatePayload.error.flatten().fieldErrors,
        success: false,
      };
    }

    const session = await auth();
    const response = await fetch(
      `${process.env.BACKEND_URI}/transactions/extract`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(transactionPayload),
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to add transaction");
    }
    revalidatePath("/dashboard");
    return {
      success: true,
      values: {
        txText: "",
      },
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      values: {
        txText: "",
      },
      errors: {
        txText: ["Failed to add transaction"],
      },
    };
  }
};
