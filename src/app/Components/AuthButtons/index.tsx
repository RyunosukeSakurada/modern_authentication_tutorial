"use server";

import { signIn } from "@/auth";

export default async function AuthButtons({ provider, label }: { provider: string; label: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button
        className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="submit"
      >
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          {label}
        </span>
      </button>
    </form>
  );
}
