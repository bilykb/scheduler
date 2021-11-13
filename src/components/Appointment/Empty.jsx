import React from 'react';

export function Empty(props) {

  return(
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onChange}
      />
    </main>
  );
};

export default Empty;