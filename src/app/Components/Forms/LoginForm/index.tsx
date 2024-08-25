'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    // ここでログイン処理を行う
    // 成功したら、ダッシュボードなどにリダイレクト
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">メールアドレス</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'メールアドレスは必須です' })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">パスワード</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'パスワードは必須です' })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full px-5 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center">ログイン</button>
    </form>
  );
};

export default LoginForm;