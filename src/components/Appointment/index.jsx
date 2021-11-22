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
const CREATE = "CREATE"

export function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={(EMPTY) => transition(CREATE)} />}
      {mode === CREATE && <Form student="" interviewers={props.interviewers} onCancel={(CREATE) => back()} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
    </article>
  )
}

export default Appointment;