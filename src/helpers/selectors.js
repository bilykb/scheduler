
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

export function getInterviewersForDay(state, day) {
  const currentDay = state.days.find(dayObject => dayObject.name.toLowerCase() === day.toLowerCase())

  if(state.days.length === 0 || currentDay === undefined) return [];
  
  const interviewers = currentDay.interviewers.map(id => state.interviewers[id])

  return interviewers
}