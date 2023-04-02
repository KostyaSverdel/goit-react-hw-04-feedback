import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import css from '../FeedbackOptions/FeedbackOptions.module.css';

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  const handleClick = useCallback(
    option => {
      onLeaveFeedback(option);
    },
    [onLeaveFeedback]
  );

  return (
    <div className={css.buttonsHero}>
      {options.map(option => (
        <button
          className={css.buttons}
          key={option}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};

export default FeedbackOptions;
