import calculatorSolid from '@assets/calculatorSolid.svg';
import flaskSolid from '@assets/flaskSolid.svg';
import atomSolid from '@assets/atomSolid.svg';
import seedlingSolid from '@assets/seedlingSolid.svg';
import DashBoardCard from '@components/DashBoardCard';
import api from '@services/api-request';
import { useQuery } from 'react-query';
import List from '@components/List';
import uuid from 'react-uuid';
import { useContext } from 'react';
import { AuthContext } from '@contexts/Authentication';

// Assuming your subject has a 'name' property
type Subject = {
  id: number;
  name: string;
  course_length: number;
  // Add more properties if your subject has them
};

const CoursesPage: React.FC = () => {
  const {
    data: subjects,
    isError,
    error,
    isLoading,
  } = useQuery<Subject[], Error>(
    'subjects',
    async () =>
      (await api.get(
        `${import.meta.env.VITE_API_URL}/api/subjects/`
      )) as Subject[]
  );

  const { auth } = useContext(AuthContext);

  type Variant =
    | 'primary'
    | 'secondary'
    | 'thirdly'
    | 'fourthly'
    | 'fifthly'
    | 'sixthly'
    | 'seventhly'
    | 'eighthly';

  const variants: Variant[] = [
    'primary',
    'secondary',
    'thirdly',
    'fourthly',
    'fifthly',
    'sixthly',
    'seventhly',
    'eighthly',
  ];

  const icons = [calculatorSolid, flaskSolid, atomSolid, seedlingSolid];

  return (
    <article className="min-w-min px-8">
      <header>
        <h1 className="text-3xl font-700">Courses</h1>
      </header>
      <hr />
      <List
        className="dashboard-grid"
        isLoading={isLoading}
        isError={isError}
        error={error as Error}
      >
        {subjects ? (
          subjects.map((subject, index) => (
            <DashBoardCard
              key={subject.id}
              name={subject.name}
              to={`${subject.name}`}
              variant={variants[index % 8]}
              mainInfo={subject.course_length.toString()}
            >
              <img
                src={icons[Math.floor(Math.random() * icons.length)]}
                alt="icon"
              />
            </DashBoardCard>
          ))
        ) : (
          <p className="text-center text-custom-dark-gray">Not Found</p>
        )}
        {auth?.user.role == 'admin' ? (
          <DashBoardCard
            key={uuid()}
            name="add"
            to={`add`}
            variant={variants[(subjects ? subjects.length : 0) % 8]}
          ></DashBoardCard>
        ) : (
          ''
        )}
      </List>
    </article>
  );
};

export default CoursesPage;
