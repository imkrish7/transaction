import { auth } from "../lib/auth.ts";

export type AppContext = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    Session: typeof auth.$Infer.Session.session | null;
  };
};
