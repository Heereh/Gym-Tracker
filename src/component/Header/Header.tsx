import { Dumbbell } from "lucide-react";
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
        <Dumbbell className="logo-icon" />

        <a className="header-title" href="/">
          GymTracker
        </a>
      </div>
      <div className="dropdown">
        <button className="dropbtn">{user}</button>

        <div className="dropdown-content">
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a onClick={handleLogout}>Log out</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
