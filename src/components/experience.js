import React from 'react';
import format from 'date-fns/format';

export default function Experience(props) {
  const {
    companyName,
    cityName,
    positionTitle,
    taskDescription,
    startDate,
    endDate,
  } = props.experienceDetails;
  return (
    <div className="employment">
      <div className="employment-info">
        <div className="small">{positionTitle.text}</div>
        <div className="company-info greyed">
          <div>{companyName.text}</div>
          <div>, {cityName.text}</div>
        </div>
        <div className="text-area">{taskDescription.text}</div>
      </div>
      <div className="employment-dates">
        <div>
          {startDate.text ? format(new Date(startDate.text), 'MMM yyyy') : ''} -{' '}
          {endDate.text
            ? format(new Date(endDate.text), 'MMM yyyy')
            : 'Present'}
        </div>
      </div>
    </div>
  );
}
