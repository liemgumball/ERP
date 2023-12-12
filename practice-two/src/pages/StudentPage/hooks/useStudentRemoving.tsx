import { useMutation, useQueryClient } from 'react-query';
import api from '@services/api-request';
import { STUDENTS_URL } from '@constants/services';
import { TStudent } from 'src/types';
import useAuth from '@hooks/useAuth';

const useStudentRemoving = () => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();

  const { mutateAsync, mutate } = useMutation({
    mutationFn: async (id: string | number) =>
      (await api.remove(
        STUDENTS_URL + '/' + id,
        auth?.accessToken
      )) as TStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] }); // invalidate & refetch on mutation success
    },
    onError: (error: Error) => {
      window.alert(error.message);
    },
  });

  return { removeStudentAsync: mutateAsync, removeStudent: mutate };
};

export default useStudentRemoving;
