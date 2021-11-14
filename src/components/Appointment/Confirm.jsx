import React from 'react';
import {Button} from 'components/Button';

export function Confirm(props) {

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
        <section className="appointment__actions">
          <Button danger onChange={props.onCancel}>Cancel</Button>
          <Button danger onChange={props.onConfirm}>Confirm</Button>
        </section>
    </main>
  )
};