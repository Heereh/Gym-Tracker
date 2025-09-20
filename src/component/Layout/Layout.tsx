import { useAuthStore } from '../../store/GymUserStore';
import Header from '../Header/Header';
import { Outlet } from 'react-router';

export const Layout = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggenIn);

  return (
    <>
      {isLoggedIn && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
