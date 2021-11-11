import React from "react";
import DayListItem from "./DayListItem"

export default function DayList(props) {

  const dayArray = props.days.map(day => {
    return(<DayListItem key={day.id} name={day.name} setDay={props.setDay} spots={day.spots} selected={day.name === props.day} />)
    });
    
  return dayArray;
}