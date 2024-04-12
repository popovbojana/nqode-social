import React from 'react';
import classes from './Card.module.scss';

interface CardProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className={`${classes['c-card']}`}>
      {title && <h1 className={`${classes['c-card__title']}`}>{title}</h1>}
      {children}
    </div>
  );
};

export default Card;
