import React from 'react';

export default function Education(props) {
  const { schoolName, titleOfStudy, lengthOfStudy, eduCity } = props;
  return (
    <div className="education-container secondary-fs">
      <div className="small">{titleOfStudy.text}</div>
      <div className="school-info greyed">
        <div>{schoolName.text}</div>
        <div className="edu">{eduCity.text ? `, ${eduCity.text}` : ''}</div>
      </div>
      <div>{lengthOfStudy.text ? `${lengthOfStudy.text} Years` : ''}</div>
    </div>
  );
}
