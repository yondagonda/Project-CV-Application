// this component will just be reponsible for rendering the 'general' section
import React from 'react';
import mailIcon from '../img/mail.svg';
import phoneIcon from '../img/phone.svg';
import addressIcon from '../img/address.svg';

export default function Personal(props) {
  const { emailInput, nameInput, phoneInput, addressInput } =
    props.personalDetails;
  return (
    <>
      <div className="title">{nameInput.text}</div>
      <div className="top-right largestFS">
        <div className="email-container">
          <img src={mailIcon} className="mail-icon" alt="mail icon" />
          <div>{emailInput.text}</div>
        </div>
        <div className="phone-container">
          <img src={phoneIcon} className="phone-icon" alt="phone icon" />
          <div>{phoneInput.text}</div>
        </div>
        <div className="address-container">
          <img src={addressIcon} className="address-icon" alt="adress icon" />
          <div>{addressInput.text}</div>
        </div>
      </div>
    </>
  );
}
