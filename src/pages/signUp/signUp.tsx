import { Dumbbell } from 'lucide-react';
import './signUpStyles.css';
import { useState } from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type Tab = 'login' | 'register';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('login');
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="loginContainer">
      <div className="card loginCard">
        <div className="card-header">
          <div className="logoContainer">
            <div className="logo">
              <Dumbbell className="logoIcon" />
            </div>
          </div>
          <h1 className="title">GymTracker</h1>
          <p className="description">Tu compañero de entrenamiento personal</p>
        </div>
        <div className="description2">
          {activeTab === 'login'
            ? 'Ingresa tus credenciales para acceder a la cuenta'
            : 'Crea tu cuenta'}
        </div>
        <div className="card-body">
          <div className="tabs">
            <div className="tabsList">
              <button
                className={`tabsTrigger ${
                  activeTab === 'login' ? 'active' : ''
                }`}
                onClick={() => handleTabChange('login')}
              >
                Iniciar Sesión
              </button>
              <button
                className={`tabsTrigger ${
                  activeTab === 'register' ? 'active' : ''
                }`}
                onClick={() => handleTabChange('register')}
              >
                Registrarse
              </button>
            </div>
            <div
              className={`tabsContent ${activeTab === 'login' ? 'active' : ''}`}
            >
              <LoginForm />
            </div>
            <div
              className={`tabsContent ${
                activeTab === 'register' ? 'active' : ''
              }`}
            >
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
