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
        className="relative flex items-center justify-center w-full h-12 px-4 space-x-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md shadow-sm hover:bg-slate-100"
        type="submit"
      >
        <span className="text-neutral-700 text-sm">
          {label}
        </span>
      </button>
    </form>
  );
}
