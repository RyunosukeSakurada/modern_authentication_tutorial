'use server'

import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";

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

  await connectDB();

  // existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hash(password, 12);

  await User.create({ email, password: hashedPassword, confirmPassword });
  console.log(`ユーザーの作成に成功しました🎉`);
  redirect("/login");
};

export { register, login };