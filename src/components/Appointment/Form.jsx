import React, {useState} from 'react';
import PropTypes from 'prop-types';
import InterviewerList from '../InterviewerList';
import { Button } from '../Button';

export function Form(props) {
  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const resetInterviewForm = () => {
    setStudent("")
    setInterviewer(null);
  };

  const cancelInterviewForm = () => {
    resetInterviewForm();
    return props.onCancel();
  };

  return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={student}
              onChange={event => setStudent(event.target.value)}
            />
          </form>
          <InterviewerList 
            interviewers={props.interviewers}
            onChange={setInterviewer}
            selectedInterviewer={interviewer}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancelInterviewForm}>Cancel</Button>
            {(student && interviewer) && <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>}
            {(!student || !interviewer)&& <Button disabled onClick={() => props.onSave(student, interviewer)}>Save</Button>}
          </section>
        </section>
      </main>
  );
};

Form.propTypes = {
  interviewers: PropTypes.array,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  student: PropTypes.string
}