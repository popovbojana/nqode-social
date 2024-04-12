import React, { useState } from 'react';
import Card from 'components/Card/Card';
import Button from 'components/core/Button/Button';
import Input from 'components/core/Input/Input';
import { authenticate } from 'services/AuthService';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import classes from './LoginPage.module.scss';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
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
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authenticate(authenticationRequest);

    setAuthenticationRequest({ username: '', password: '' });
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
            />
            <Button label='Sign In' />
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
