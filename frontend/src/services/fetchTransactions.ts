import { auth } from "@/lib/auth";

export async function fetchTransactions(
  dir: string,
  page: number,
  cursor: string | null,
) {
  const session = await auth();
  const response = await fetch(
    `${process.env.BACKEND_URI}/transactions?dir=${dir}&page=${page}&cursor=${cursor}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },

      credentials: "include",
    },
  );
  if (!response.ok) {
    return {
      error: "Failed to fetch transactions",
      data: [],
    };
  }
  const data = await response.json();
  return {
    error: null,
    data,
  };
}
