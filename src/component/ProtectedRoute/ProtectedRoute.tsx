import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../../store/GymUserStore';

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggenIn);
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
