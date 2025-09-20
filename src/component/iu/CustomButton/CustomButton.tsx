import React from 'react';
import './CustomButton.css';

interface CustomButtonProps {
  size?: 'small' | 'mediun' | 'large';
  backgroundColor?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'neutral'
    | 'success'
    | 'custom';
  appearance?: 'solid' | 'outline' | 'ghost';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
	size = 'small',
	backgroundColor = 'primary',
	appearance = 'solid',
	children,
	type,
	onClick,
	disabled 
}) => {
	const className = `custom-button ${size} ${backgroundColor} ${appearance}`;
	return (
    <button
      className={className}
      type={type}
      onClick={onClick} // Llamamos al onClick que se pasa como props
      disabled ={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
