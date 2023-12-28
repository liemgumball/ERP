import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '@services/login';
import Button from '@components/Button';
import Input from '@components/Input';
import { AuthContext } from '@contexts/Authentication';
import { emailRegex } from '@constants/regex';
import { ERROR_MSG } from '@constants/messages';

export type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { setAuth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isSubmitting },
    setError,
  } = useForm<LoginInputs>();

  const onValid: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const auth = await login(data);
      if (auth && setAuth) setAuth(auth); // if login successfully
    } catch (err) {
      const errorMessage = (err as Error).message;
      if (errorMessage === ERROR_MSG.WRONG_EMAIL_OR_PASSWORD) {
        // set errors for inputs field
        setError('email', { type: 'value', message: errorMessage });
        setError('password', { type: 'value', message: errorMessage });
      }
    }
  };

  return (
    <form
      method="post"
      role="form"
      autoComplete="off"
      className="flex flex-col text-left"
      onSubmit={handleSubmit(onValid)}
    >
      <label className="capitalize text-custom-dark-gray" htmlFor="email">
        email
      </label>
      <Input
        id="email"
        type="text"
        placeholder="Enter your email"
        autoFocus
        inValid={!!errors.email}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: emailRegex,
            message: ERROR_MSG.INVALID_EMAIL,
          },
        })}
      />
      {errors.email && (
        <p
          className="text-xs text-red-500 transition duration-500"
          role="alert"
        >
          {errors.email.message}
        </p>
      )}

      <label
        className="mt-10 capitalize text-custom-dark-gray"
        htmlFor="password"
      >
        password
      </label>
      <Input
        id="password"
        type="password"
        placeholder="Enter your password"
        inValid={!!errors.password}
        {...register('password', {
          required: 'Password is required',
        })}
      />
      {errors.password && (
        <p
          className="text-xs text-red-500 transition duration-500"
          role="alert"
        >
          {errors.password.message}
        </p>
      )}

      <Button
        primary
        type="submit"
        className="text-700 mt-8 uppercase text-white"
        disabled={(!isValid && isSubmitted) || isSubmitting}
      >
        {isSubmitting ? 'Loading...' : 'sign in'}
      </Button>
    </form>
  );
};

LoginForm.whyDidYouRender = true;

export default LoginForm;
