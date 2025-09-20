import { Dumbbell } from 'lucide-react';
import React from 'react';
import { useAuthStore } from '../../store/GymUserStore';

const Header = () => {
  return (
    <header id="header">
      <div className="header-logo">
        <Dumbbell className="logo-icon" />

        <a className="header-title" href="/">
          GymTracker
        </a>
      </div>
      <div>
        {/* <Avatar.Root>
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/broken-link" />
            </Avatar.Root> */}
      </div>
    </header>
  );
};

export default Header;
