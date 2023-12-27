import calculatorSolid from '@assets/calculatorSolid.svg';
import flaskSolid from '@assets/flaskSolid.svg';
import atomSolid from '@assets/atomSolid.svg';
import seedlingSolid from '@assets/seedlingSolid.svg';
import DashBoardCard from '@components/DashBoardCard';
import { COURSES_URL, PATH_NAME } from '@constants/services';
import { useEffect, useState } from 'react';
import CourseForm from './components/index';
import api from '@services/api-request/index';
import { TSCourse } from 'src/types/index';

const CoursesPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [courseData, setCourseData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses/1'); // Replace with your actual endpoint
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };
    fetchData();
  }, []);

  console.log('course:', courseData);

  return (
    <article className="dashboard-grid">
      <DashBoardCard
        to="/courses/math"
        variant="fifthly"
        name="math"
        mainInfo="43"
      >
        <img src={calculatorSolid} alt="calculator solid" />
      </DashBoardCard>

      <DashBoardCard
        to="/courses/physics"
        variant="sixthly"
        name="physics"
        mainInfo="56"
      >
        <img src={atomSolid} alt="atom solid" />
      </DashBoardCard>

      <DashBoardCard
        to="/courses/chemistry"
        variant="seventhly"
        name="chemistry"
        mainInfo="32"
      >
        <img src={flaskSolid} alt="flask solid" />
      </DashBoardCard>

      <DashBoardCard
        to="/courses/biology"
        variant="eighthly"
        name="biology"
        mainInfo="21"
      >
        <img src={seedlingSolid} alt="seedling solid" />
      </DashBoardCard>

      <CourseForm
        isOpen={showPopup}
        setIsOpen={setShowPopup}
        courseDetail={courseData}
      />
    </article>
  );
};

export default CoursesPage;
