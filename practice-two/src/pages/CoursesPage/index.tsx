import calculatorSolid from '@assets/calculatorSolid.svg';
import flaskSolid from '@assets/flaskSolid.svg';
import atomSolid from '@assets/atomSolid.svg';
import seedlingSolid from '@assets/seedlingSolid.svg';
import DashBoardCard from '@components/DashBoardCard';
import { PATH_NAME } from '@constants/services';

const CoursesPage : React.FC = () =>{
    return(
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
    </article>
    );
};

export default CoursesPage;