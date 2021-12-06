import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
import PropTypes from "prop-types";


export default function DayListItem(props) {

  let dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": !props.spots})

  const formatSpots = number => {
    if(number === 0) return "no spots remaining"
    if(number === 1) return "1 spot remaining"
    if(number > 1) return `${number} spots remaining`
  }

  return (
    <li className={dayClass} onClick={props.onChange} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};

DayListItem.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  spots: PropTypes.number
};