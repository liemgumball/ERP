import { PATH_NAME } from '@constants/services';
import bigLogo from '@assets/bigLogo.svg';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className="bg-custom-gradient-yellow p-10 min-h-screen h-full flex justify-center items-center">
      <main className="login-card">
        <Link to={PATH_NAME.HOME} className="flex items-center justify-center">
          <img
            width="7"
            height="auto"
            src={bigLogo}
            alt="logo"
            className="mr-2"
          />
          <h1 className="text-3xl uppercase font-700">CRUD operations</h1>
        </Link>
        <div>
          <h2 className="uppercase font-700 text-2xl mb-2">sign in</h2>
          <p className="text-custom-dark-gray font-400">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-custom-dark-gray">
          Forgot your password?{' '}
          <Link
            className="text-custom-yellow underline"
            to={PATH_NAME.EMPTY_PAGE}
          >
            Reset Password
          </Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;