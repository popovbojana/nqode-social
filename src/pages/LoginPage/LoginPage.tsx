import React, { useState } from 'react';
import Card from 'components/Card/Card';
import Button from 'components/core/Button/Button';
import Input from 'components/core/Input/Input';
import { authenticate } from 'services/AuthService';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import classes from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationRequest from 'src/models/AuthenticationRequest';
import Message from 'components/Message/Message';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    username: false,
    password: false
  });
  const [authenticationRequest, setAuthenticationRequest] = useState({
    username: '',
    password: ''
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthenticationRequest({ ...authenticationRequest, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: false });
  };

  const validateInput = () => {
    let isValid = true;

    Object.keys(authenticationRequest).forEach((key) => {
      const fieldName = key as keyof AuthenticationRequest;
      const isFieldValid = authenticationRequest[fieldName].trim() !== '';

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
      authenticate(authenticationRequest)
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem('token', JSON.stringify(response.data.token));
            navigate('/home');
            toast.success('Successfully logged in!');
          }
        })
        .catch((error) => {
          if (error.response.status == 403) {
            setErrorMessage('Wrong credentials!');
          }
          if (error.response.status == 404) {
            setErrorMessage(error.response.data.message);
          }
        });
    }
  };

  return (
    <div className={`${classes['c-login-page']}`}>
      <div className={`${classes['c-login-page__container']}`}>
        <Card title='nQode Social Network'>
          <form className={`${classes['c-login-page__form']}`} onSubmit={handleSubmit}>
            <Input
              label='Username'
              value={authenticationRequest.username}
              name='username'
              onChange={handleInputChange}
              error={validationErrors.username}
            />
            <Input
              label='Password'
              type={isPasswordVisible ? 'text' : 'password'}
              value={authenticationRequest.password}
              name='password'
              onChange={handleInputChange}
              icon={
                isPasswordVisible ? (
                  <EyeIcon
                    onClick={togglePasswordVisibility}
                    className={`${classes['c-login-page__icon']}`}
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={togglePasswordVisibility}
                    className={`${classes['c-login-page__icon']}`}
                  />
                )
              }
              error={validationErrors.password}
            />
            <Button label='Sign In' />
            <Message
              icon={<ExclamationCircleIcon width={16} height={16} />}
              message={errorMessage}
            />
          </form>
        </Card>
        <Card>
          <div className={`${classes['c-login-page__link']}`}>
            <p>Don't have an account?</p>
            <Link to='/registration' className={`${classes['c-login-page__link-text']}`}>
              Registration
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
