import React, {useState} from 'react';
import PropTypes from 'prop-types';
import InterviewerList from '../InterviewerList';
import { Button } from '../Button';

export function Form(props) {
  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")
  
  const resetInterviewForm = () => {
    setError("")
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
              data-testid="student-name-input"
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={student}
              onChange={event => setStudent(event.target.value)}
            />
            <section className="appointment__validation">{error}</section>
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
            <Button confirm onClick={() => {
              if (!student || !interviewer) {
                setError("Please enter all applicable information");
                return;
              }
                setError("");
                props.onSave(student, interviewer);
              }}
              >Save</Button>
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