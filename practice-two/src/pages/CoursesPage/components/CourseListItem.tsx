/* eslint-disable @typescript-eslint/no-explicit-any */
import eye from '@assets/eye.svg';
import pen from '@assets/pen.svg';
import Button from '@components/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@contexts/Authentication';

const CourseListItem = (props: any) => {
  const { id, name, start_date, end_date, schedule } = props.data;
  const { auth } = useContext(AuthContext);

  const handleEnrollment = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/enroll-course/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: auth?.user.id,
          course_id: id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during enrollment:', error);
    }
  };
  return (
    <li
      data-id={id}
      className="course-list-item group relative my-3 grid items-center rounded-xl border  font-400 transition hover:bg-custom-beige"
    >
      <p className="truncate">{id}</p>
      <p className="truncate">{name}</p>
      <p className="truncate">{start_date}</p>
      <p className="truncate">{end_date}</p>
      <p className="truncate">{schedule}</p>
      <div className="action-group flex items-stretch justify-end gap-x-2">
        <Link to={``}>
          <Button
            onClick={handleEnrollment}
            className="view-details-btn group-hover:bg-custom-light-pink group-hover:hover:bg-white"
          >
            <img src={pen} alt="pen" loading="eager" />
          </Button>
        </Link>
        <Link to={`${id}`}>
          <Button className="view-details-btn h-full group-hover:bg-custom-light-pink group-hover:hover:bg-white">
            <img src={eye} alt="eye" loading="eager" width={19} height={19} />
          </Button>
        </Link>
      </div>
    </li>
  );
};

export default CourseListItem;
