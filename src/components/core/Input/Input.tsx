import React from 'react';
import classes from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: JSX.Element;
}

const Input: React.FC<InputProps> = ({ type, label, value, name, onChange, icon }) => {
  return (
    <div className={`${classes['c-input']}`}>
      <input
        type={type || 'text'}
        className={`${classes['c-input__field']}`}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <label className={`${classes['c-input__label']}`}>{label}</label>
      {icon}
    </div>
  );
};

export default Input;
