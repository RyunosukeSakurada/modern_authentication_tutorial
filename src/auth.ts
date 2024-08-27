import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
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
          select: {
            id: true,
            email: true,
            password: true,
          }
        });

        if (!user || !user.password) {
          throw new Error("無効なメールアドレスもしくはパスワード");
        }

        const isMatched = await compare(password, user.password);

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
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, id, image } = user;

          if (!email) {
            throw new Error("Googleアカウントのメールアドレスが見つかりませんでした");
          }

          const existingUser = await db.user.findUnique({
            where: { email },
            include: { accounts: true },
          });

          if (existingUser) {
            // 既存のAccountを確認
            const existingAccount = existingUser.accounts.find(
              (acc) => acc.provider === account.provider && acc.providerAccountId === account.providerAccountId
            );

            if (!existingAccount) {
              // 既存ユーザーに新しいプロバイダをリンク
              await db.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  id_token: account.id_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                },
              });
            }
          } else {
            // 新しいユーザーを作成
            await db.user.create({
              data: {
                email,
                authProviderId: id,
                image,
                accounts: {
                  create: {
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    access_token: account.access_token,
                    id_token: account.id_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at,
                  },
                },
              },
            });
          }
          return true;
        } catch (error) {
          console.error("User creation error:", error);
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
