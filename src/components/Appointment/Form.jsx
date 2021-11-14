import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import { Button } from '../Button';

export function Form(props) {
  const [student, setStudent] = useState(props.student || "")
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null);

  return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={student}
              onChange={(event) => setStudent(event.target.value)}
            />
          </form>
          <InterviewerList 
            interviewers={props.interviewers}
            onChange={setInterviewerId}
            selectedInterviewerId={interviewerId}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onChange={props.onCancel}>Cancel</Button>
            <Button confirm onChange={props.onSave}>Save</Button>
          </section>
        </section>
      </main>
  )
};