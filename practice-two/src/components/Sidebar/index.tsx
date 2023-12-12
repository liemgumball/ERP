import { useContext } from 'react';
import { Link, NavLink, To } from 'react-router-dom';
import { PATH_NAME } from '@constants/services';
import { AuthContext } from '@contexts/Authentication';
import Button from '@components/Button';

// images
import avatar from '@assets/avatar.png';
import smallLogo from '@assets/smallLogo.svg';
import house from '@assets/house.svg';
import bookmark from '@assets/bookmark.svg';
import graduationCap from '@assets/graduationCap.svg';
import usdSquare from '@assets/usdSquare.svg';
import fileChartLine from '@assets/fileChartLine.svg';
import sliderSquare from '@assets/sliderSquare.svg';
import signOut from '@assets/signOut.svg';

const NavList: { to: To; imgSrc?: string; alt?: string; innerText: string }[] =
  [
    { to: PATH_NAME.HOME, imgSrc: house, alt: 'house', innerText: 'home' },
    {
      to: PATH_NAME.COURSES,
      imgSrc: bookmark,
      alt: 'book mark',
      innerText: 'courses',
    },
    {
      to: PATH_NAME.STUDENTS,
      imgSrc: graduationCap,
      alt: 'graduation cap',
      innerText: 'students',
    },
    {
      to: PATH_NAME.PAYMENTS,
      imgSrc: usdSquare,
      alt: 'usd square',
      innerText: 'payments',
    },
    {
      to: PATH_NAME.REPORTS,
      imgSrc: fileChartLine,
      alt: 'file chart line',
      innerText: 'reports',
    },
    {
      to: PATH_NAME.SETTINGS,
      imgSrc: sliderSquare,
      alt: 'slider square',
      innerText: 'settings',
    },
  ];

const Sidebar: React.FC = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => setAuth(null);

  return (
    <aside className="sidebar">
      <Link to={PATH_NAME.HOME} className="flex items-center justify-center">
        <img width="7" src={smallLogo} alt="Logo" />
        <p className="ml-3 text-xl font-700 uppercase">CRUD operations</p>
      </Link>
      <div className="flex flex-col items-center gap-y-2">
        <div className="h-32 w-32">
          <img
            width="128"
            height="128"
            src={avatar}
            alt="avatar"
            className="h-full w-full rounded-full"
          />
        </div>
        <h2 className="text-xl font-700">{auth?.user.name}</h2>
        <p className="text-custom-yellow">{auth?.user.role || 'user'}</p>
      </div>
      <nav className="p-5">
        <ul>
          {NavList.map((item) => (
            <li key={item.innerText}>
              {/* NavLink already implement active in ClassName */}
              <NavLink className="nav-link" to={item.to}>
                <img src={item.imgSrc} alt={item.alt} loading="eager" />
                {item.innerText}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        className="mx-5 border-none capitalize hover:bg-custom-gray"
        onClick={handleLogout}
      >
        logout
        <img src={signOut} alt="sign out" className="ml-3 inline-block" />
      </Button>
    </aside>
  );
};

export default Sidebar;
