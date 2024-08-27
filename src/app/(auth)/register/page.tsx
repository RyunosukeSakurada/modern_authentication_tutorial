import AuthPage from '@/app/_components/AuthPage';
import RegisterForm from '@/app/_components/Forms/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthPage title="アカウント登録">
      <RegisterForm />
    </AuthPage>
  );
};

export default RegisterPage;