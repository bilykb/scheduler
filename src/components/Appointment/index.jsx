import React from "react";
import {Header, Show, Empty} from "./";
import "./styles.scss"
export {Empty} from "./Empty";
export {Header} from "./Header";
export {Show} from './Show';
export {Confirm} from './Confirm';
export {Status} from './Status';
export {Error} from './Error';
export {Form} from './Form';

export function Appointment(props) {

  const appointmentYesNo = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />
  return (
    <article className="appointment">
      <Header time={props.time} />
      {appointmentYesNo}
    </article>
  )
}

export default Appointment;