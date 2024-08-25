import { login } from "@/action/user";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import AuthButtons from "../../AuthButtons";


const LoginForm = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <>
      <form className="w-full max-w-md space-y-4" action={login}>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full px-5 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center">ログイン</button>
      </form>
      {/* GitHubサインインボタン */}
      <AuthButtons provider="github" label="Github" />
      {/* Googleサインインボタン */}
      <AuthButtons provider="google" label="Google" />
    </>
  );
};

export default LoginForm;