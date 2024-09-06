import { getLocalStorage } from '@/utills/LocalStorageUtills';
import { Outlet, Navigate } from 'react-router-dom';

const AvatarProtected = () => {
  const token = getLocalStorage('token');
  const currentState = getLocalStorage('user')?.Activeprofile;
  
  if (!token || currentState !== 'avatar') {
    return <Navigate to='/auth/login'  />;
  }

  return <Outlet />;
};

export default AvatarProtected;
