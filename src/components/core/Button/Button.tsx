import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  variant?: string;
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, variant, onClick }) => {
  return (
    <button
      className={`${classes['c-button']} ${classes[variant ? `c-button--${variant}` : '']}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
