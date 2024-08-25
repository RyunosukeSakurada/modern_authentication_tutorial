import React from 'react'
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const dashBoard = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) return redirect("/");

  return (
    <div>
      ログインしたユーザーのみ閲覧できます。
    </div>
  )
}

export default dashBoard