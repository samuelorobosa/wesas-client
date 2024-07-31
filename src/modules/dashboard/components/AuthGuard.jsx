import { getFromLocalStorage } from '@/src/core/utils/getFromLocalStorage.js';
import { secretKeys } from '@/src/core/utils/secretKeys.js';
import { useEffect, useState } from 'react';
import { GlobalContext } from '@/src/core/context/GlobalContext.js';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/src/core/navigation/routenames.js';
import { getProfileThunk } from '@/src/modules/profile/net/profileThunks.js';
import { useDispatch } from 'react-redux';

export default function AuthGuard({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const getAuth = () => {
    const token = getFromLocalStorage(secretKeys.USER_TOKEN);
    dispatch(getProfileThunk());
    if (token) {
      setToken(token);
    } else {
      // redirect to login page
      navigate(routeNames.login);
    }
  };

  useEffect(() => {
    if (!token) {
      getAuth();
    }

    return () => {
      setToken(null);
    };
  }, []);
  return (
    <GlobalContext.Provider value={{ token }}>
      {children}
    </GlobalContext.Provider>
  );
}
