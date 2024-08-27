import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy:'jwt'},
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

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !db.user.password) {
          throw new Error("無効なメールアドレスもしくはパスワード");
        }

        const isMatched = await compare(password, db.user.password);

        if (!isMatched) {
          throw new Error("パスワードが一致しませんでした");
        }

        const userData = {
          email: user.email,
          id: user.id,
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
          const { email, id, image } = user;
          const existingUser = await db.user.findUnique({ where: { email } });

          if (!existingUser) {
            await db.user.create({
              data: {
                email,
                authProviderId: id,
                image,
              },
            });
          }
          return true;
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