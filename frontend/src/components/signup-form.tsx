"use client";
import { signupAction } from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { SignupFormState } from "@/types/auth.type";
import Link from "next/link";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [state, formAction, isPending] = useActionState<
    SignupFormState,
    FormData
  >(signupAction, {
    values: {
      name: "",
      email: "",
      password: "",
    },
    success: false,
    errors: null,
  });

  useEffect(() => {
    if (state.success) {
      toast.success("Account created successfully!");
    }
  }, [state]);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="****************"
                required
              />
              <FieldDescription>Please enter your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button disabled={isPending} type="submit">
                  {isPending ? <Spinner /> : "Create Account"}
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
