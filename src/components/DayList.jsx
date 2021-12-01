import React from "react";
import DayListItem from "./DayListItem";
import PropTypes from "prop-types";

export default function DayList(props) {

  const dayArray = props.days.map(day => {
    return(<DayListItem 
      key={day.id} 
      name={day.name} 
      onChange={() => props.onChange(day.name)} 
      spots={day.spots} 
      selected={day.name === props.value} 
      />);
    });
    
  return dayArray;
};

DayList.propTypes = {
  days: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
};