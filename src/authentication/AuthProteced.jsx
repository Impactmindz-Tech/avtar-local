import { getLocalStorage } from '@/utills/LocalStorageUtills';
import { Outlet, Navigate } from 'react-router-dom';

const AuthProtected = () => {
  const token = getLocalStorage('token');
  const currentState = getLocalStorage('user')?.Activeprofile;

  if (token) {
    switch (currentState) {
      case 'user':
        return <Navigate to='/user/dashboard'  />;
      case 'avatar':
        return <Navigate to='/avatar/dashboard'  />;
      default:
        return <Navigate to='/user/dashboard'  />;
    }
  }

  return <Outlet />;
};

export default AuthProtected;
