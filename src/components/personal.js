// this component will just be reponsible for rendering the 'general' section
import React, { Component } from 'react';

export default function Personal(props) {
  const { emailInput, nameInput, phoneInput } = props.personalDetails;
  return (
    <>
      <div>Name: {nameInput.text}</div>
      <div>Email: {emailInput.text}</div>
      <div>Phone: {phoneInput.text}</div>
    </>
  );
}
