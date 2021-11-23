import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "./styles.scss"
import {Header} from './Header'
import {Show} from './Show'
import {Empty} from './Empty'
import {Form} from './Form'
import {Confirm} from './Confirm';
import {Status} from './Status';
import {Error} from './Error';

const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";

export function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && 
        <Empty 
          onAdd={(EMPTY) => transition(CREATE)} />}
      {mode === CREATE && 
        <Form student="" 
          interviewers={props.interviewers} 
          onCancel={CREATE => back()} 
          onSave={save} 
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === SAVING && (
        <Status />
      )}
    </article>
  )
}

export default Appointment;