// this component will just be reponsible for rendering the 'general' section
import React from 'react';

export default function Personal(props) {
  const { emailInput, nameInput, phoneInput } = props.personalDetails;
  return (
    <>
      <div className="title">{nameInput.text.toUpperCase()}</div>
      <div className="top-right">
        <div className="contact">Cont</div>
        <div>@{emailInput.text}</div>
        <div>phone{phoneInput.text}</div>
      </div>
    </>
  );
}
