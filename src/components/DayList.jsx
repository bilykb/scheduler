import React from "react";
import DayListItem from "./DayListItem"

export default function DayList(props) {

  const dayArray = props.days.map(day => {
    return(<DayListItem 
      key={day.id} 
      name={day.name} 
      onChange={() => props.onChange(day.name)} 
      spots={day.spots} 
      selected={day.name === props.value} 
      />)
    });
    
  return dayArray;
}