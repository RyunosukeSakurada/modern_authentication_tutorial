'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type RegisterInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    console.log(data);
    // ここで登録処理を行う
    // 成功したら、ログインページなどにリダイレクト
    router.push('/login');
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">メールアドレス</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">パスワード</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">確認用パスワード</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || "Passwords do not match"
          })}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit" className="w-full px-5 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center">Register</button>
    </form>
  );
};

export default RegisterForm;