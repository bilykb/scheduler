import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "./styles.scss";
import {Header} from './Header';
import {Show} from './Show';
import {Empty} from './Empty';
import {Form} from './Form';
import {Confirm} from './Confirm';
import {Status} from './Status';
import {Error} from './Error';

const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    .catch((error) => {
      transition(ERROR_SAVE, true)
    });
  };

  const deleting = () => {
    transition(DELETE, true)
    props.onDelete(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch((error) => {
      transition(ERROR_DELETE, true)
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
          onCancel={back} 
          onSave={save} 
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETE && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={back} 
          onConfirm={deleting} 
          message="Are you sure you would like to Delete?"
        />
      )}
      {mode === EDIT && (
        <Form 
          onCancel={back} 
          onSave={save} 
          student={props.interview.student} 
          interviewers={props.interviewers} 
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Error saving appointment. Please try again."
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Error deleting appointment. Please try again."
          onClose={back}
        />
      )}
    </article>
  );
};

export default Appointment;