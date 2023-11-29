import Button from '@components/Button';
import Input from '@components/Input';
import { ERROR_MSG } from '@constants/messages';
import { emailRegex, nameRegex, phoneNumberRegex } from '@constants/regex';
import { useForm } from 'react-hook-form';
import { StudentInputs } from 'src/types';

type FormInputs = Omit<StudentInputs, 'id'>;

const RegisterPage = () => {
  // Hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<FormInputs>();

  return (
    <main className="bg-custom-gradient-yellow h-screen flex items-center justify-center">
      <form
        className="bg-white p-16 rounded-2xl shadow-lg max-w-xl w-full grid grid-cols-1 z-50"
        onSubmit={handleSubmit(() => {})}
      >
        <h2 className="text-3xl font-700 text-center mb-10 uppercase">
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
          <p className="text-red-500 text-xs" role="alert">
            {errors.name.message}
          </p>
        )}

        {/* Email input */}
        <label className="text-custom-dark-gray mt-5" htmlFor="email">
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
          <p className="text-red-500 text-xs" role="alert">
            {errors.email.message}
          </p>
        )}

        {/* Phone input */}
        <label className="text-custom-dark-gray mt-5" htmlFor="phone">
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
          <p className="text-red-500 text-xs" role="alert">
            {errors.phone.message}
          </p>
        )}

        <Button
          disabled={
            (!isValid && isSubmitted && !errors.root) ||
            (!errors.root && isSubmitting)
          }
          primary
          className="mt-10 w-1/2 justify-self-center uppercase text-md"
          type="submit"
        >
          {errors.root ? 'retry' : isSubmitting ? 'submitting...' : 'done'}
        </Button>

        {errors.root && (
          <p
            className="text-red-500 text-sm text-center mt-1 transition-all delay-300"
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
