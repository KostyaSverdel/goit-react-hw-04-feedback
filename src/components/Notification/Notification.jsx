import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Feedback/Feedback.module.css';

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={css.notification}>
      {isVisible && <p className={css.messageTitle}>{message}</p>}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
