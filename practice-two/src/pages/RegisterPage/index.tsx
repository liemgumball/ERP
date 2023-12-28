import Button from '@components/Button';
import Input from '@components/Input';
import { ERROR_MSG } from '@constants/messages';
import {
  emailRegex,
  enrollNumberRegex,
  nameRegex,
  phoneNumberRegex,
} from '@constants/regex';
import { PATH_NAME } from '@constants/services';
import { registerStudent } from '@services/register';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { StudentInputs } from 'src/types';

type FormInputs = Pick<
  StudentInputs,
  'name' | 'email' | 'phone' | 'enrollNumber'
>;

const RegisterPage = () => {
  const navigate = useNavigate();

  // Hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<FormInputs>();

  const onValid: SubmitHandler<FormInputs> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const auth = await registerStudent<any>({
        email: data.email,
        name: data.name,
        phone: data.phone,
        enroll_number: data.enrollNumber,
      });

      if (auth) navigate('login', { replace: true });
    } catch (err) {
      const errorMessage = (err as Error).message;
      alert(errorMessage);
    }
  };

  return (
    <main className="bg-custom-gradient-yellow flex h-screen items-center justify-center">
      <form
        className="z-50 grid w-full max-w-xl grid-cols-1 rounded-2xl bg-white p-16 shadow-lg"
        onSubmit={handleSubmit(onValid)}
      >
        <h2 className="mb-10 text-center text-3xl font-700 uppercase">
          student information
        </h2>

        {/* Name input */}
        <label className="text-custom-dark-gray" htmlFor="name">
          Name{' '}
        </label>
        <Input
          autoFocus
          id="name"
          type="text"
          placeholder="Enter your name"
          inValid={!!errors.name}
          {...register('name', {
            required: 'Please enter name',
            pattern: {
              value: nameRegex,
              message: ERROR_MSG.INVALID_NAME,
            },
          })}
        />
        {/* Error message */}
        {errors.name && (
          <p className="text-xs text-red-500" role="alert">
            {errors.name.message}
          </p>
        )}

        {/* Email input */}
        <label className="mt-5 text-custom-dark-gray" htmlFor="email">
          Email{' '}
        </label>
        <Input
          id="email"
          type="text"
          placeholder="Enter your email address"
          inValid={!!errors.email}
          {...register('email', {
            required: 'Please enter a valid email',
            pattern: {
              value: emailRegex,
              message: ERROR_MSG.INVALID_EMAIL,
            },
          })}
        />
        {/* Error message */}
        {errors.email && (
          <p className="text-xs text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}

        {/* Phone input */}
        <label className="mt-5 text-custom-dark-gray" htmlFor="phone">
          Phone number{' '}
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          inValid={!!errors.phone}
          {...register('phone', {
            required: 'Please enter a valid phone number',
            pattern: {
              value: phoneNumberRegex,
              message: ERROR_MSG.INVALID_PHONE_NUMBER,
            },
          })}
        />
        {/* Error message */}
        {errors.phone && (
          <p className="text-xs text-red-500" role="alert">
            {errors.phone.message}
          </p>
        )}

        {/* Enroll number input */}
        <label className="mt-5 text-custom-dark-gray" htmlFor="enrollNumber">
          Enroll number{' '}
        </label>
        <Input
          id="enrollNumber"
          type="number"
          placeholder="Enter your enroll number"
          inValid={!!errors.enrollNumber}
          {...register('enrollNumber', {
            required: 'Please enter a valid enroll number',
            pattern: {
              value: enrollNumberRegex,
              message: ERROR_MSG.INVALID_ENROLL_NUMBER,
            },
          })}
        />
        {/* Error message */}
        {errors.enrollNumber && (
          <p className="text-xs text-red-500" role="alert">
            {errors.enrollNumber.message}
          </p>
        )}

        <Button
          disabled={
            (!isValid && isSubmitted && !errors.root) ||
            (!errors.root && isSubmitting)
          }
          primary
          className="text-md mt-10 w-1/2 justify-self-center uppercase"
          type="submit"
        >
          {errors.root ? 'retry' : isSubmitting ? 'submitting...' : 'done'}
        </Button>

        <Link
          to={PATH_NAME.LOGIN}
          className="text-md mt-3 w-1/2 justify-self-center rounded-lg border p-3 text-center uppercase hover:shadow-lg"
        >
          Back
        </Link>

        {errors.root && (
          <p
            className="mt-1 text-center text-sm text-red-500 transition-all delay-300"
            role="alert"
          >
            {errors.root.message}
          </p>
        )}
      </form>
    </main>
  );
};

export default RegisterPage;
