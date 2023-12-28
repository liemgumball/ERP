import List from '@components/List';
import { useLoaderData } from 'react-router-dom';
import CourseListItem from './CourseListItem';

type TData = {
  name: string;
  courses: [];
};

const CoursesList: React.FC = () => {
  const data = useLoaderData();
  if (data)
    return (
      <article className="min-w-min px-8">
        <header>
          <h1 className="text-3xl font-700">{(data as TData).name}</h1>
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
            {(data as TData).courses.map((course) => (
              <CourseListItem data={course}></CourseListItem>
            ))}
          </List>
        </section>
      </article>
    );
  return <div className="text-center text-custom-dark-gray">Not found</div>;
};

export default CoursesList;
