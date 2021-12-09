import React from 'react';
import PropTypes from 'prop-types';

export function Empty(props) {

  return(
    <main className="appointment__add" data-testid='add'>
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
        
      />
    </main>
  );
};

export default Empty;

Empty.propTypes = {
  onAdd: PropTypes.func
};