/* eslint-disable @typescript-eslint/no-explicit-any */
import eye from '@assets/eye.svg';
import Button from '@components/Button';
import { Link } from 'react-router-dom';

const CourseListItem = (props: any) => {
  const { id, name, start_date, end_date, schedule } = props.data;
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
      <div className="action-group flex justify-end gap-x-2">
        <Link to={`${id}`}>
          <Button className="view-details-btn group-hover:bg-custom-light-pink group-hover:hover:bg-white">
            <img src={eye} alt="eye" loading="eager" />
          </Button>
        </Link>
      </div>
    </li>
  );
};

export default CourseListItem;
