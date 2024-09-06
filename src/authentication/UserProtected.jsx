import { getLocalStorage } from '@/utills/LocalStorageUtills';
import { Outlet, Navigate } from 'react-router-dom';

const UserProtected = () => {
  const token = getLocalStorage('token');
  const currentState = getLocalStorage('user')?.Activeprofile;
  
  if (!token || currentState !== 'user') {
    return <Navigate to='/auth/login'  />;
  }

  return <Outlet />;
};

export default UserProtected;
