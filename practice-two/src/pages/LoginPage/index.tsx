import { PATH_NAME } from '@constants/services';
import bigLogo from '@assets/bigLogo.svg';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { useContext } from 'react';
import { AuthContext } from '@contexts/Authentication';

const LoginPage = () => {
  const { auth } = useContext(AuthContext);

  if (auth) return <Navigate to={PATH_NAME.HOME} replace />; //navigate to home page if logged in

  return (
    <div className="bg-custom-gradient-yellow flex h-full min-h-screen items-center justify-center p-10">
      <main className="login-card">
        <Link
          to={PATH_NAME.HOME}
          replace
          className="flex items-center justify-center"
        >
          <img
            width="7"
            height="auto"
            src={bigLogo}
            alt="logo"
            className="mr-2"
          />
          <h1 className="text-3xl font-700 uppercase">CRUD operations</h1>
        </Link>
        <div>
          <h2 className="mb-2 text-2xl font-700 uppercase">sign in</h2>
          <p className="font-400 text-custom-dark-gray">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-custom-dark-gray">
          Don't have an account?{' '}
          <Link className="text-custom-yellow underline" to="/register" replace>
            Register
          </Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
