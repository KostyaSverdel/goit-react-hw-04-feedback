import React, { useState, useEffect, useCallback } from 'react';
import Statistics from '../StatisticsFeedback/StatisticsFeedback';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Section from '../SectionFeedback/SectionFeedback';
import Notification from '../Notification/Notification';

const FeedbackWidget = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = feedbackType => {
    setFeedback(prevState => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  const countTotalFeedback = useCallback(() => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  }, [feedback]);

  const countPositiveFeedbackPercentage = useCallback(() => {
    const total = countTotalFeedback();
    const { good } = feedback;

    if (total === 0) {
      return 0;
    }

    return Math.round((good / total) * 100);
  }, [countTotalFeedback, feedback]);

  useEffect(() => {
    const total = countTotalFeedback();
    if (total === 0) {
      document.title = 'There is no feedback';
    } else {
      document.title = `Feedback: ${total}`;
    }
  }, [countTotalFeedback]);

  const options = Object.keys(feedback);

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>

      {countTotalFeedback() ? (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};

export default FeedbackWidget;
