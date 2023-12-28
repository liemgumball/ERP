import Button from '@components/Button';
import Input from '@components/Input';
import { ERROR_MSG } from '@constants/messages';
import { emailRegex, nameRegex, phoneNumberRegex } from '@constants/regex';
import { useForm } from 'react-hook-form';
import { StudentInputs } from 'src/types';
import { useContext } from 'react';
import { AuthContext, AuthType } from '@contexts/Authentication';

type FormInputs = Pick<StudentInputs, 'name' | 'email' | 'phone'>;

const SettingPage = () => {
  const { auth, setAuth } = useContext(AuthContext);

  // Hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    try {
      // Assuming you have a user ID, replace 'USER_ID' with the actual user ID
      const userId = auth?.user.id;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/update/${userId}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert('Updated your Information');
        const newdata = await response.json();
        console.log(newdata);
        if (newdata.user)
          setAuth((current) => {
            return {
              ...current,
              user: newdata.user,
            } as AuthType;
          });
      } else {
        // Handle errors from the server
        const errorData = await response.json();
        alert(`Error:, ${errorData}`);
      }
    } catch (error) {
      // Handle network or other errors
      alert(`Error:, ${error}`);
    }
  };

  return (
    <main className="flex w-full justify-center">
      <form
        className="z-50 grid grid-cols-1  p-16 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-10 text-center text-3xl font-700 uppercase">
          change account information
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
          defaultValue={auth?.user.name}
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
          defaultValue={auth?.user.email}
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
          defaultValue=""
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

        {/* <Button
          type="button"
        > */}

        {/* </Button> */}

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

export default SettingPage;
