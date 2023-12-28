import List from '@components/List';
import { useLoaderData } from 'react-router-dom';
import CourseListItem from './CourseListItem';
import { useQuery } from 'react-query';
import api from '@services/api-request';
import { useState } from 'react';
import useAuth from '@hooks/useAuth';

type TData = {
  name: string;
  courses: [];
};

const CoursesList: React.FC = () => {
  const [joined, setJoined] = useState(false);
  const { auth } = useAuth();
  const data = useLoaderData() as TData;

  const { data: newData } = useQuery<TData>(
    [`course_${data.name}`, joined],
    async () =>
      (await api.get(
        `${import.meta.env.VITE_API_URL}/api/subject/${data.name}/${
          joined ? `?userId=${auth?.user.id}` : ''
        }`
      )) as TData,
    { placeholderData: data }
  );
  if (data)
    return (
      <article className="min-w-min px-8">
        <header className="flex justify-between">
          <h1 className="text-3xl font-700">{data.name || 'None'}</h1>
          <label htmlFor="joined" className="p-2">
            <input
              type="checkbox"
              name="joined"
              id="joined"
              className="mx-3"
              checked={joined}
              onChange={(e) => setJoined(e.target.checked)}
            />
            joined
          </label>
        </header>
        <hr />
        <section className="py-3">
          <header className="course-list-heading grid whitespace-nowrap font-600 text-custom-medium-gray">
            <span />
            <span>name</span>
            <span>start date</span>
            <span>end date</span>
            <span>schedule</span>
            <span />
          </header>

          <List>
            {newData?.courses.map((course) => (
              <CourseListItem data={course}></CourseListItem>
            ))}
          </List>
        </section>
      </article>
    );

  return <div className="text-center text-custom-dark-gray">Not found</div>;
};

export default CoursesList;
