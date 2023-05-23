import React from 'react';

export default function Education(props) {
  const { schoolName, titleOfStudy, lengthOfStudy } = props.educationDetails;
  return (
    <>
      <div>{schoolName.text.toUpperCase()}</div>
      <div>{titleOfStudy.text}</div>
      <div>{lengthOfStudy.text} Years</div>
    </>
  );
}
