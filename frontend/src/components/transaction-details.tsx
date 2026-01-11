import { Transaction } from "@/types/transaction.type";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import {
  Clock,
  Tag,
  CreditCard,
  Hash,
  User,
  Calendar,
  PieChart,
  Info,
} from "lucide-react";
import DetailItem from "./detail-item";

const TransactionDetails = ({
  transaction,
  onClose,
}: {
  transaction: Transaction;
  onClose: (transaction: Transaction | null) => void;
}) => {
  const isCredit = transaction.type === "CREDIT";
  const currency = transaction.currency === "USD" ? "$" : "₹";
  return (
    <Sheet defaultOpen={true} onOpenChange={() => onClose(null)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Transaction Details</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col p-2">
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center text-3xl font-bold ${
                  isCredit
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-50 text-slate-600"
                }`}
              >
                {transaction.merchantName.charAt(0)}
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  {transaction.merchantName}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  {transaction.category}
                </p>
              </div>
            </div>

            <div className="text-right flex flex-col items-center md:items-end">
              <span
                className={`text-md font-extrabold tracking-tight ${
                  isCredit ? "text-emerald-600" : "text-slate-900"
                }`}
              >
                {currency}
                {transaction.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <div className="flex items-center gap-2 mt-1 px-1 py-1 bg-slate-50 rounded-full text-slate-500 font-medium text-sm">
                <Clock className="w-4 h-4" />
                {new Date(transaction.transactionDate).toDateString()}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8 mt-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                Transaction Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                <DetailItem
                  icon={<Tag className="w-5 h-5" />}
                  label="Description"
                  value={transaction.description}
                />
                <DetailItem
                  icon={<CreditCard className="w-5 h-5" />}
                  label="Type"
                  value={transaction.transactionType}
                />
                <DetailItem
                  icon={<Hash className="w-5 h-5" />}
                  label="Reference ID"
                  value={transaction.id}
                />
                <DetailItem
                  icon={<PieChart className="w-5 h-5" />}
                  label="Running Balance"
                  value={`${currency}${transaction.runningBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                  valueClass="font-mono"
                />
                <DetailItem
                  icon={<User className="w-5 h-5" />}
                  label="User ID"
                  value={transaction.userId}
                />
                <DetailItem
                  icon={<Calendar className="w-5 h-5" />}
                  label="Noted At"
                  value={transaction.createdAt.toLocaleString()}
                />
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={() => onClose(null)}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetails;
