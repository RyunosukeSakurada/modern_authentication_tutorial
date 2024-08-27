import React from 'react';

type AuthPageProps = {
  title: string;
  children: React.ReactNode;
}

const AuthPage: React.FC<AuthPageProps> = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 bg-white shadow-lg rounded-lg">
        <h3 className="mb-6 text-2xl font-bold text-center">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default AuthPage;
