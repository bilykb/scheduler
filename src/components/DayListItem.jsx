import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
import PropTypes from "prop-types";


export default function DayListItem(props) {

  let dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": !props.spots})

  return (
    <li className={dayClass} onClick={props.onChange}>
      <h2 className="text--regular">{props.name}</h2>
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      {!props.spots && <h3 className="text--light">no spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
    </li>
  );
};

DayListItem.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  spots: PropTypes.number
};