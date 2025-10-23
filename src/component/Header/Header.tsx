import { useAuthStore } from "../../store/GymUserStore";
import "./header.css";

import { useNavigate } from "react-router";
const Header = () => {
  const user = useAuthStore((state) => state.user?.username);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header id="header">
      <div className="header-logo">
        <img className="logo-icon" src="/favicon.ico" alt="logo" />
        <a className="logo-title" href="/">
          Zylo
        </a>
      </div>
      <div className="dropdown">
        <button className="dropbtn">{user}</button>

        <div className="dropdown-content">
          <a href="#">Profile</a>

          <a onClick={handleLogout}>Log out</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
