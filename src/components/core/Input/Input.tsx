import React from 'react';
import classes from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: JSX.Element;
  error: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  value,
  name,
  onChange,
  icon,
  error = false
}) => {
  return (
    <div
      className={`${classes['c-input']} ${classes[error ? 'c-input--error' : '']} ${classes[type === 'file' ? 'c-input--type' : '']} `}
    >
      <input
        type={type || 'text'}
        className={`${classes['c-input__field']} ${classes[type === 'file' ? 'c-input__field--file' : '']}`}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
      />
      {label && (
        <label
          className={`${classes['c-input__label']} ${classes[error ? 'c-input__label--error' : '']}`}
        >
          {label}
        </label>
      )}
      {icon}
    </div>
  );
};

export default Input;
