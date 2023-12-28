import Button from '@components/Button';
import { NOTIFIES_MSG } from '@constants/messages';
import useAuth from '@hooks/useAuth';
import { formatDate } from '@services/format';
import { useLoaderData } from 'react-router-dom';
import { TCourse } from 'src/types';

const CourseDetail = () => {
  const data = useLoaderData() as TCourse;
  const { auth } = useAuth();
  return (
    <article className="min-w-min p-5">
      <header className="flex justify-between px-5 py-3">
        <h1 className="text-4xl font-700">{data.name}</h1>
        <Button
          primary
          onClick={() => alert(NOTIFIES_MSG.FUTURE_FEATURE)}
          disabled={auth?.user.role !== 'admin'}
        >
          Edit course details
        </Button>
      </header>
      <hr />
      <div className="flex flex-col gap-2 px-3 py-5">
        <div className="flex justify-center rounded-lg border bg-black p-5">
          <iframe
            width="1200"
            height="600"
            loading="lazy"
            src={`https://www.youtube.com/embed/${
              data.video ? data.video : 'kAM1PulT0Ns'
            }`}
          ></iframe>
        </div>
        <p className="text-xl font-700">
          Calendar:{' '}
          <span className="text-lg normal-case">
            Every week at {data.schedule}
          </span>
        </p>
        <p className="text-xl font-700">
          Subject: <span className="text-lg">{data.subject.name}</span>
        </p>
        <p className="text-xl font-700">
          Time:{' '}
          <span className="text-lg">
            {formatDate(data.start_date)} - {formatDate(data.end_date)}
          </span>
        </p>
        <p className="text-xl font-700">
          Total Students:{' '}
          <span className="self-center text-lg">{data.students.length}</span>
        </p>
        <p className="text-xl font-700">
          Students:{' '}
          {data.students.map((student) => (
            <span className="self-center text-lg">{student.name}</span>
          ))}
        </p>
        <p className="text-xl font-700">Description:</p>
        <p className="rounded-lg border p-3 normal-case text-gray-500">
          {data.description || 'No description'}
        </p>
      </div>
    </article>
  );
};

export default CourseDetail;
