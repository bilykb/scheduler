
export function getAppointmentsForDay(state, day) {
  const appointmentArray = [];

  for(let oneDay of state.days) {
    if (oneDay.name === day) {
      oneDay.appointments.forEach(appointmentId => {
        appointmentArray.push(state.appointments[appointmentId]);
      })
    }
  }
  return appointmentArray
}

export function getInterview(state, interview) {
  
  for (let appointId in state.appointments) {
    const appointment = state.appointments[appointId].interview;
    
    if(!interview) {
      return null;
    }
    if(appointment && appointment.interviewer === interview.interviewer) {
      return {student: interview.student, interviewer: {...state.interviewers[interview.interviewer]}};
    }

  }
}