import LoginForm from '@/app/components/Forms/LoginForm';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 bg-white shadow-lg rounded-lg">
        <h3 className="mb-6 text-2xl font-bold text-center">アカウントにログイン</h3>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;