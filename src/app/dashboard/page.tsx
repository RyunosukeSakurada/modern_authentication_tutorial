import React from 'react'
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const dashBoard = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) return redirect("/");

  return (
    <div className="px-12 py-4">
      ログインしたユーザーのみ閲覧できます。
      <p>メールアドレス: {user.email}</p>
    </div>
  )
}

export default dashBoard