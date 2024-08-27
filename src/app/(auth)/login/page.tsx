import AuthPage from '@/app/_components/AuthPage';
import LoginForm from '@/app/_components/Forms/LoginForm';

const LoginPage = () => {
  return (
    <AuthPage title="ログイン">
      <LoginForm />
    </AuthPage>
  );
};

export default LoginPage;