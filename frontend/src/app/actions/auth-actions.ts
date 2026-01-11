"use server";
import { signupSchema } from "@/schema/auth";
import { SignupFormState } from "@/types/auth.type";

export const signupAction = async (
  _prevState: SignupFormState,
  credentials: FormData,
) => {
  const email = credentials.get("email")?.toString();
  const password = credentials.get("password")?.toString();
  const name = credentials.get("name")?.toString();
  const validateForm = signupSchema.safeParse({ email, password, name });

  if (!validateForm.success) {
    return {
      values: {
        email: email || "",
        password: password || "",
        name: name || "",
      },
      errors: validateForm.error.flatten().fieldErrors,
      success: false,
    };
  }
  try {
    const response = await fetch(`${process.env.BACKEND_URI}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    await response.json();

    return {
      values: {
        email: email || "",
        password: password || "",
        name: name || "",
      },
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      values: {
        email: email || "",
        password: password || "",
        name: name || "",
      },
      errors: {
        email: ["An error occurred"],
        password: ["An error occurred"],
        name: ["An error occurred"],
      },
      success: false,
    };
  }
};
