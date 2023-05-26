import React from 'react';

export default function Education(props) {
  const { schoolName, titleOfStudy, lengthOfStudy, eduCity } =
    props.educationDetails;
  return (
    <div className="education-container secondary-fs">
      <div className="small">{titleOfStudy.text}</div>
      <div className="school-info greyed">
        <div>{schoolName.text}</div>
        <div>{eduCity.text ? `, ${eduCity.text}` : ''}</div>
      </div>
      <div>{lengthOfStudy.text ? `${lengthOfStudy.text} Years` : ''}</div>
    </div>
  );
}
