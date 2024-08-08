import { getFromLocalStorage } from '@/src/core/utils/getFromLocalStorage.js';
import { secretKeys } from '@/src/core/utils/secretKeys.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/src/core/navigation/routenames.js';
import { useDispatch } from 'react-redux';
import { getProfileThunk } from '@/src/modules/profile/net/profileThunks.js';
import CustomLoader from '@/src/modules/dashboard/components/Loader.jsx';
import { GlobalContext } from '@/src/core/context/GlobalContext.js';

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  const getAuth = async () => {
    const token = getFromLocalStorage(secretKeys.USER_TOKEN);
    if (token) {
      setToken(token);
    } else {
      // redirect to login page
      navigate(routeNames.login);
    }

    try {
      setLoading(true);
      const response = await dispatch(getProfileThunk());
      setProfile(response.payload.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!token || !profile) {
      getAuth();
    }
  }, []);

  if (loading) return <CustomLoader />;

  return (
    <GlobalContext.Provider value={{ token, profile }}>
      {children}
    </GlobalContext.Provider>
  );
}
