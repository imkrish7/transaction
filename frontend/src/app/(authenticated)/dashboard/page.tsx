import { TransactionTable } from "@/components/transaction-table";
import { fetchTransactions } from "@/services/fetchTransactions";
import { TablePagination } from "@/components/table-pagination";
import { connection } from "next/server";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; dir: string; cursor: string }>;
}) {
  await connection();
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const dir = params.dir;
  const cursor = params.cursor ?? null;
  const { data, error } = await fetchTransactions(dir, page, cursor);

  if (error) {
    return (
      <div>
        <p>Error fetching transactions: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <TransactionTable transactions={data.transactions} />
      <div className="mt-4 p-2">
        {data && (
          <TablePagination
            nextCursor={data.next}
            prevCursor={data.prev}
            page={page}
            hasMore={data.hasMore}
          />
        )}
      </div>
    </div>
  );
}
