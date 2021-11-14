import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export function Button(props) {
   
   const {children, confirm, danger, disabled, onChange} = props
   let buttonClass = classNames("button", {"button--confirm": confirm, "button--danger": danger})

   return (
      <button className={buttonClass} onClick={onChange} disabled={disabled}>
         {children}
      </button>
   )
}
