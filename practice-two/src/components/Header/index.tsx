import Input from '@components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@components/Button';

const Header = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const setSearchQuery = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.set('q', value);
        return prev;
      },
      { replace: true }
    );
  };

  if (searchQuery.length > 50) throw new Error('Search query length error');

  return (
    <header className="gx-3 flex justify-between px-8 py-5">
      <Button
        className={`${
          window.location.pathname === '/' ? 'invisible' : ''
        } text-xs`}
        onClick={() => navigate(-1)}
      >
        Back{' '}
      </Button>

      <div className="relative w-1/6 min-w-fit">
        <Input
          className="w-full pr-12"
          type="text"
          name="Search"
          id="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-5 top-1/2 -translate-y-1/2 transform text-custom-gray"
        />
      </div>
    </header>
  );
};

export default Header;
