"use client";
import { useState } from "react";
import { Transaction } from "../types/transaction.type";
import TransactionDetails from "./transaction-details";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface IProps {
  transactions: Transaction[];
}

export const TransactionTable = ({ transactions }: IProps) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleViewClick = (transaction: Transaction | null) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Transaction Date
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Merchant Name
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Transaction Type
            </th>

            <th scope="col" className="px-6 py-3 font-medium">
              Current Balance
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Description
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              return (
                <tr
                  key={transaction.id}
                  className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                >
                  <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    {new Date(transaction.transactionDate).toDateString()}
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {transaction.merchantName}
                  </th>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        transaction.transactionType === "DEBIT"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {transaction.transactionType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">{transaction.runningBalance}</td>
                  <td className="px-6 py-4">{transaction.amount}</td>
                  <td className="px-6 py-4">{transaction.description}</td>
                  <td className="px-6 py-4">
                    {selectedTransaction ? (
                      <TransactionDetails
                        onClose={handleViewClick}
                        transaction={selectedTransaction}
                      />
                    ) : (
                      <Button onClick={() => handleViewClick(transaction)}>
                        View
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={9} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
