import { MouseEvent, useCallback, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useDebounce from '@hooks/useDebounce';

import Button from '@components/Button';
import List from '@components/List';
import { DATABASE_RESOURCES } from '@constants/services';
import { SearchQueryContext } from '@contexts/SearchQuery';
import StudentListItem from './components/StudentListItem';
import StudentForm from './components/StudentForm';
import { CONFIRM_MSG, ERROR_MSG } from '@constants/messages';
import useStudentForm from './hooks/useStudentForm';
import { StudentInputs, TStudent } from '@utils/types';
import api from '@services/apiRequest';

const StudentPage: React.FC = () => {
  // Student form reducer
  const [formState, dispatch] = useStudentForm();

  // Debounce the search query change
  const { searchQuery } = useContext(SearchQueryContext);
  const debouncedSearchQuery = useDebounce(searchQuery);

  // Get students
  const url = `${process.env.API_GATEWAY}/${DATABASE_RESOURCES.STUDENTS}`;
  const query = `?_sort=createdAt&_order=desc&q=${debouncedSearchQuery}`;

  const { data, isError, error, isLoading } = useQuery(
    ['students', debouncedSearchQuery],
    async () => (await api.get(url + query)) as TStudent[]
  );

  // Mutations
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => api.remove(url + '/' + id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  /**
   * Delegated onClick handle (edit || remove)
   * @param event mouse event
   */
  const onClick = useCallback(
    async (event: MouseEvent) => {
      try {
        const dataId = (event.target as HTMLElement)
          .closest('li')
          ?.getAttribute('data-id');
        const btn = (event.target as HTMLUListElement).closest('button');

        if (dataId && btn) {
          if (btn.classList.contains('btn-edit')) {
            dispatch({
              status: 'editing',
              student: (await api.get(url + '/' + dataId)) as StudentInputs,
            });
          }

          if (btn.classList.contains('btn-remove')) {
            // show alert confirm message
            if (window.confirm(CONFIRM_MSG.REMOVE_STUDENT)) {
              await mutateAsync(dataId); // remove and refetch the students
            }
          }
        } else {
          throw new Error(ERROR_MSG.MISSING_ID);
        }
      } catch (err) {
        alert((err as Error).message);
      }
    },
    [dispatch, url, mutateAsync]
  );

  return (
    <>
      <article className="px-8 min-w-min">
        <header className="py-3 flex justify-between items-center bg-white border-b">
          <h1 className="text-3xl font-700">students list</h1>
          <Button
            className="uppercase"
            variant="primary"
            onClick={() => dispatch({ status: 'adding' })}
          >
            add new student
          </Button>
        </header>
        <hr />
        <section className="students py-3">
          <header className="student-list-heading grid text-custom-medium-gray font-600 whitespace-nowrap">
            <span />
            <span>name</span>
            <span>email</span>
            <span>phone</span>
            <span>enroll number</span>
            <span>date of admission</span>
            <span />
          </header>
          <List
            isError={isError}
            isLoading={isLoading}
            error={error as Error}
            onClick={onClick}
          >
            {data && data.length ? (
              data.map((item) => <StudentListItem key={item.id} data={item} />)
            ) : (
              <p className="text-custom-dark-gray text-center">not found</p>
            )}
          </List>
        </section>
      </article>
      {formState.shown && (
        <StudentForm
          setFormState={dispatch}
          title={formState.title}
          student={formState.title === 'edit' ? formState.student : undefined}
        />
      )}
    </>
  );
};

StudentPage.whyDidYouRender = true;

export default StudentPage;
