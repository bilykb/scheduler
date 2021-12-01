import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "components/Button.scss";

export function Button(props) {
   
   const {children, confirm, danger, disabled, onClick} = props;
   let buttonClass = classNames("button", {"button--confirm": confirm, "button--danger": danger});

   return (
      <button className={buttonClass} onClick={onClick} disabled={disabled}>
         {children}
      </button>
   );
};

Button.propTypes = {
   children: PropTypes.string
 };