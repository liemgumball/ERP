import { HTMLAttributes } from 'react';
import { Link, To } from 'react-router-dom';

export type DashBoardCardProps = {
  variant: 'primary' | 'secondary' | 'thirdly' | 'fourthly';
  name: string;
  mainInfo?: string;
  to: To;
  children?: React.ReactNode;
} & HTMLAttributes<HTMLElement>;

const DashBoardCard: React.FC<DashBoardCardProps> = (props) => {
  const { variant, name, mainInfo, children, to, ...rest } = props;

  return (
    <Link
      className={`dashboard-card dashboard-card-${variant}`}
      to={to}
      {...rest}
    >
      {children}
      <p className="text mt-2 capitalize">{name}</p>
      <p className="mt-3 truncate text-end text-4xl font-700 uppercase text-black">
        {mainInfo}
      </p>
    </Link>
  );
};

DashBoardCard.whyDidYouRender = true;

export default DashBoardCard;
