import RegisterForm from '@/app/components/Forms/RegisterForm';
import React from 'react';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 bg-white shadow-lg rounded-lg">
        <h3 className="mb-6 text-2xl font-bold text-center">Create an account</h3>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;