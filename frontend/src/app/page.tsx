import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col flex-1 mt-4">
          <div className="flex flex-col items-center flex-1 justify-center">
            <h1 className="text-4xl font-bold text-center text-zinc-900 dark:text-white">
              Welcome to Vessify transaction manager
            </h1>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/register">
              <Button variant={"secondary"}>Register</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
