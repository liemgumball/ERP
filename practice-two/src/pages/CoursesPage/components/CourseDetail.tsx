import { useLoaderData } from 'react-router-dom';

const CourseDetail = () => {
  const data = useLoaderData();
  return <div>{JSON.stringify(data)}</div>;
};

export default CourseDetail;
