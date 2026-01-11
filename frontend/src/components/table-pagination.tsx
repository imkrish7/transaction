"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IProps {
  nextCursor: string;
  prevCursor: string;
  page: number;
  hasMore: boolean;
}

export function TablePagination({
  nextCursor,
  prevCursor,
  page,
  hasMore,
}: IProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : undefined}
            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
            href={`?cursor=${prevCursor}&page=${page - 1}&dir=prev`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            isActive={hasMore}
            href={`?cursor=${nextCursor}&page=${page + 1}&dir=next`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
