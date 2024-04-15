import React from 'react';
import classes from './Message.module.scss';

interface MessageProps {
  icon?: JSX.Element;
  message: string;
}

const Message: React.FC<MessageProps> = ({ icon, message }) => {
  return (
    <div>
      {message !== '' && (
        <div className={`${classes['c-message']}`}>
          {icon && <div className={`${classes['c-message__icon']}`}>{icon}</div>}
          <span className={`${classes['c-message__text']}`}>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
