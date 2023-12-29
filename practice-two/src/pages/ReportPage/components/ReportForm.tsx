import Button from '@components/Button';
import Input from '@components/Input';
import useAuth from '@hooks/useAuth';
import api from '@services/api-request';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { TReport } from 'src/types';

type FormInputs = Pick<TReport, 'title' | 'description'>;

const ReportForm = (props: { close: () => void }) => {
  const { close } = props;
  const { auth } = useAuth();
  // Hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<FormInputs>();

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    async (data: FormInputs) =>
      await api.post(`${import.meta.env.VITE_API_URL}/api/report/`, {
        ...data,
        student: auth?.user.id,
      }),
    {
      onSuccess: () => {
        close();
        queryClient.invalidateQueries({ queryKey: 'reports' });
      },
    }
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Modal close  */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => close()}
      />

      <form
        className="z-50 grid w-full max-w-2xl grid-cols-1 rounded-2xl bg-white p-16 shadow-lg"
        onSubmit={handleSubmit((data) => mutateAsync(data))}
      >
        <h2 className="mb-10 text-center text-3xl font-700 uppercase">
          add new report
        </h2>

        <label className="text-custom-dark-gray" htmlFor="title">
          Title{' '}
        </label>
        <Input
          autoFocus
          id="title"
          type="text"
          placeholder="Enter your name"
          inValid={!!errors.title}
          {...register('title', {
            required: 'This is a required field',
          })}
        />
        {/* Error message */}
        {errors.title && (
          <p className="text-xs text-red-500" role="alert">
            {errors.title.message}
          </p>
        )}

        <label className="mt-5 text-custom-dark-gray" htmlFor="description">
          Description{' '}
        </label>
        <Input
          id="description"
          type="text"
          placeholder="Enter your description"
          inValid={!!errors.description}
          {...register('description', {
            required: 'This is a required field',
          })}
        />
        {/* Error message */}
        {errors.description && (
          <p className="text-xs text-red-500" role="alert">
            {errors.description.message}
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

        {errors.root && (
          <p
            className="mt-1 text-center text-sm text-red-500 transition-all delay-300"
            role="alert"
          >
            {errors.root.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReportForm;
