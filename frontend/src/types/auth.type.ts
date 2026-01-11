import { z } from "zod";
import { signupSchema } from "@/schema/auth";
export type LoginResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
    role: string;
  };
  token: string;
};

export type SignupFormState = {
  values: z.infer<typeof signupSchema>;
  errors: null | Partial<Record<keyof z.infer<typeof signupSchema>, string[]>>;
  success: boolean;
};

export type LogoutFormState = {
  error: null | string;
  success: boolean;
};
