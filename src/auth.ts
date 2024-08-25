import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("メールアドレスとパスワードの両方を入力してください");
        }

        await connectDB();

        const user = await User.findOne({ email }).select("+password +role");

        if (!user || !user.password) {
          throw new Error("無効なメールアドレスもしくはパスワード");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("パスワードが一致しませんでした");
        }

        const userData = {
          name: user.name,
          email: user.email,
          id: user._id,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
      }
      return session;
    },


    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
            await User.create({ email, name, image, authProviderId: id });
          } else {
            return true;
          }
        } catch (error) {
          throw new Error("ユーザー作成中にエラーが発生しました");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});