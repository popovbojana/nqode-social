import React, { useState } from 'react';
import Card from 'components/Card/Card';
import Button from 'components/core/Button/Button';
import Input from 'components/core/Input/Input';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import classes from './RegistrationPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { register } from 'src/services/AuthService';
import Message from 'src/components/Message/Message';
import NewUser from 'src/models/NewUser';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    email: false,
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    phoneNumber: false
  });
  const [newUser, setNewUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phoneNumber: ''
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: false });
  };

  const validateInput = () => {
    let isValid = true;

    Object.keys(newUser).forEach((key) => {
      const fieldName = key as keyof NewUser;
      const isFieldValid = newUser[fieldName].trim() !== '';

      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: !isFieldValid
      }));

      if (!isFieldValid) {
        isValid = false;
      }
    });

    if (!isValid) {
      setErrorMessage('Please fill in all fields.');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInput()) {
      register(newUser)
        .then((response) => {
          if (response.status == 201) {
            navigate('/login');
            toast.success('Successfully registered!');
          }
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    }
  };

  return (
    <div className={`${classes['c-registration-page']}`}>
      <div className={`${classes['c-registration-page__container']}`}>
        <Card title='nQode Social Network'>
          <form className={`${classes['c-registration-page__form']}`} onSubmit={handleSubmit}>
            <Input
              label='Email'
              value={newUser.email}
              name='email'
              onChange={handleInputChange}
              error={validationErrors.email}
            />
            <Input
              label='First name'
              value={newUser.firstName}
              name='firstName'
              onChange={handleInputChange}
              error={validationErrors.firstName}
            />
            <Input
              label='Last name'
              value={newUser.lastName}
              name='lastName'
              onChange={handleInputChange}
              error={validationErrors.lastName}
            />
            <Input
              label='Username'
              value={newUser.username}
              name='username'
              onChange={handleInputChange}
              error={validationErrors.username}
            />
            <Input
              label='Password'
              type={isPasswordVisible ? 'text' : 'password'}
              value={newUser.password}
              name='password'
              onChange={handleInputChange}
              error={validationErrors.password}
              icon={
                isPasswordVisible ? (
                  <EyeIcon
                    onClick={togglePasswordVisibility}
                    className={`${classes['c-registration-page__icon']}`}
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={togglePasswordVisibility}
                    className={`${classes['c-registration-page__icon']}`}
                  />
                )
              }
            />
            <Input
              label='Phone number'
              type='number'
              value={newUser.phoneNumber}
              name='phoneNumber'
              onChange={handleInputChange}
              error={validationErrors.phoneNumber}
            />
            <Button label='Sign Up' />
            <Message
              icon={<ExclamationCircleIcon width={16} height={16} />}
              message={errorMessage}
            />
          </form>
        </Card>
        <Card>
          <div className={`${classes['c-registration-page__link']}`}>
            <span>Already have an account?</span>
            <Link to='/login' className={`${classes['c-registration-page__link-text']}`}>
              Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;
