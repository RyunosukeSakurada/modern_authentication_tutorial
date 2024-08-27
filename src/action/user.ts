'use server'

import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/db";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    if (result?.error) {
      return result.error;
    }
  } catch (error) {
    return error;
  }
  redirect("/");
};

const register = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password  || !confirmPassword) {
    throw new Error("すべての項目を入力してください");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error("このメールアドレスはすでに利用されています。");
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  console.log(`ユーザーの作成に成功しました🎉`);
  redirect("/login");
};

export { register, login };