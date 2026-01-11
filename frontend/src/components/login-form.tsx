"use client";
import { cn } from "@/lib/utils";
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
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/schema/auth";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        router.push("/dashboard?page=1&dir=next");
      } catch (error) {
        console.error(error);
        toast.error("Login failed");
      }
    });
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...field}
                    />
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      type="password"
                      placeholder="********"
                      required
                      {...field}
                    />
                  </Field>
                )}
              />
              <Field>
                <Button disabled={isPending} type="submit">
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
