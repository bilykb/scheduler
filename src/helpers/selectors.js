
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