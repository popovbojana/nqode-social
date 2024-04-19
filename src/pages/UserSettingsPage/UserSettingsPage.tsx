import Layout from 'src/components/Layout/Layout';
import classes from './UserSettingsPage.module.scss';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Message from 'src/components/Message/Message';
import Button from 'src/components/core/Button/Button';
import Input from 'src/components/core/Input/Input';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUser, updateUser } from 'src/services/UserService';
import UpdateUser from 'src/models/UpdateUser';
import Card from 'src/components/Card/Card';
import { getUserIdFromToken } from 'src/services/AuthService';

const UserSettinsPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    email: false,
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    phoneNumber: false
  });
  const [updatedUser, setUpdatedUser] = useState<UpdateUser>({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: ''
  });

  const id = getUserIdFromToken();

  useEffect(() => {
    getUser(Number.parseInt(id ?? ''))
      .then((response) => {
        if (response.status == 200) {
          const { email, firstName, lastName, username, phoneNumber } = response.data;
          setUpdatedUser({ email, firstName, lastName, username, phoneNumber });
        }
      })
      .catch((error) => {
        if (error.response.status == 404) {
          console.log(error);
        }
      });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: false });
  };

  const validateInput = () => {
    let isValid = true;

    Object.keys(updatedUser).forEach((key) => {
      const fieldName = key as keyof UpdateUser;
      const isFieldValid = updatedUser[fieldName].trim() !== '';

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
      console.log(updatedUser);
      updateUser(id, updatedUser)
        .then((response) => {
          if (response.status == 200) {
            toast.success('Successfully updated profile!');
            setErrorMessage('');
          }
        })
        .catch((error) => {
          if (error.response.status == 403) {
            setErrorMessage('Forbidden access!');
          }
          if (error.response.status == 400) {
            setErrorMessage(error.response.data.message);
          }
        });
    }
  };

  return (
    <Layout
      children={
        <div className={`${classes['c-settings-page']}`}>
          <Card title='Update profile'>
            <form className={`${classes['c-settings-page__form']}`} onSubmit={handleSubmit}>
              <Input
                value={updatedUser.email}
                name='email'
                onChange={handleInputChange}
                error={validationErrors.email}
              />
              <Input
                value={updatedUser.firstName}
                name='firstName'
                onChange={handleInputChange}
                error={validationErrors.firstName}
              />
              <Input
                value={updatedUser.lastName}
                name='lastName'
                onChange={handleInputChange}
                error={validationErrors.lastName}
              />
              <Input
                value={updatedUser.username}
                name='username'
                onChange={handleInputChange}
                error={validationErrors.username}
              />

              <Input
                type='number'
                value={updatedUser.phoneNumber}
                name='phoneNumber'
                onChange={handleInputChange}
                error={validationErrors.phoneNumber}
              />
              <Button label='Save changes' />
              <Message
                icon={<ExclamationCircleIcon width={16} height={16} />}
                message={errorMessage}
              />
            </form>
          </Card>
        </div>
      }
    />
  );
};

export default UserSettinsPage;
