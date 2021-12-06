import {useState, useEffect} from 'react';
import axios from 'axios';

export function useApplicationData() {

  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  
  const updateSpots = (days, id, value) => {

    days.forEach((day) => {
      if(day.appointments.includes(id)) {
        day.spots = parseInt(day.spots) + value;
      }
    })
  };

  const bookInterview = (id, interview) => {
    const prevInterview = state.appointments[id].interview;

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      if(!prevInterview) updateSpots(state.days, id, -1)

      setState({...state,
        appointments})
    });
  };
    
    useEffect(() => {
      const getDays = axios.get(`/api/days`)
      const getAppointments = axios.get(`/api/appointments`)
      const getInterviewers = axios.get(`/api/interviewers`)
      
      Promise.all([getDays, getAppointments, getInterviewers])
      .then(all => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      });
    }, []);
  
  const cancelInterview = (id) => {
    const stateCopy = {...state}
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      updateSpots(state.days, id, 1)
      stateCopy.appointments[id].interview = null
      setState({...stateCopy})
    })
    .catch(err => console.log(err))
  };
  
  return { state, setDay, bookInterview, cancelInterview }
};