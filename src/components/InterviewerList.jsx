import React from 'react';
import PropTypes from 'prop-types';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";

export default function InterviewList(props) {

  const interviewerArray = props.interviewers.map(interviewer => {
    
    return(<InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      selected={interviewer.id === props.selectedInterviewer} 
      onChange={() => props.onChange(interviewer.id)}
      />);
  });

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviewerArray}
    </ul>
  </section>
  );
};

InterviewList.propTypes = {
  interviewers: PropTypes.array.isRequired
}