import { Hono, type Context } from "hono";
import { registerSchema, loginSchema } from "../schema/auth.schema.ts";
import { auth } from "../lib/auth.ts";
import { APIError } from "better-auth/api";

const authRoutes = new Hono().basePath("/auth");

authRoutes.post("/register", async (c: Context) => {
  try {
    const requestPayload = await c.req.json();
    const validatePayload = registerSchema.safeParse(requestPayload);

    if (!validatePayload.success) {
      return c.json({ error: validatePayload.error }, 400);
    }
    const { email, password, name } = validatePayload.data;

    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
    return c.json({ ...user });
  } catch (error) {
    if (error instanceof APIError) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error }, 500);
  }
});

authRoutes.post("/login", async (c) => {
  try {
    const requestPayload = await c.req.json();
    const validatePayload = loginSchema.safeParse(requestPayload);

    if (!validatePayload.success) {
      return c.json({ error: validatePayload.error }, 400);
    }
    const { email, password } = validatePayload.data;

    const user = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return c.json({ ...user });
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return c.json(
        {
          error: error.message,
        },
        400,
      );
    }
    return c.json({ error }, 500);
  }
});

export default authRoutes;
