import { useState } from 'react';
import classes from './SearchBar.module.scss';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { searchForUsers } from 'src/services/UserService';
import User from 'src/models/User';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<User[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 3) {
      searchForUsers(value)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          if (error.response.status == 403) {
            toast.warning('Something went wrong!');
          }
        });
    } else {
      setResults([]);
    }
  };

  const handleResetResults = () => {
    setResults([]);
  };

  return (
    <div className={`${classes['c-search-bar']}`}>
      <div className={`${classes['c-search-bar__input']}`}>
        <MagnifyingGlassIcon className={`${classes['c-search-bar__icon']}`} />
        <input
          placeholder='Type here to search for users...'
          onChange={handleInputChange}
          className={`${classes['c-search-bar__field']}`}
        />
      </div>
      <div className={`${classes['c-search-bar__results-list']}`}>
        {results &&
          results.length > 0 &&
          results.map((result) => {
            return (
              <Link
                key={result.id}
                to={`/profile/${result.id}`}
                className={`${classes['c-search-bar__result']}`}
                onClick={handleResetResults}
              >
                {result.firstName} {result.lastName} <i>@{result.username}</i>{' '}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SearchBar;
