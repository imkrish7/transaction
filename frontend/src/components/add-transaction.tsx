"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";

import { TransactionFormState } from "@/types/transaction.type";
import { toast } from "sonner";
import { addTransactionAction } from "@/app/actions/transaction-actions";

export function AddTransaction() {
  const [toggle, setToggle] = useState(false);
  const [state, formAction, isPending] = useActionState<
    TransactionFormState,
    FormData
  >(addTransactionAction, {
    values: {
      txText: "",
    },
    success: false,
    errors: null,
  });
  useEffect(() => {
    startTransition(() => {
      if (state.success) {
        toast.success("Transaction added successfully!");
        setToggle(false);
      }
    });
  }, [state]);

  return (
    <Dialog open={toggle} onOpenChange={() => setToggle((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 sm:h-80">
        <form action={formAction} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add Transaction </DialogTitle>
            <DialogDescription>
              Add a new transaction to your account.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <Field>
              <FieldLabel htmlFor="tx-text">Raw Transaction</FieldLabel>
              <Textarea
                id="tx-text"
                name="txText"
                placeholder="m@example.com"
                required
              />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
