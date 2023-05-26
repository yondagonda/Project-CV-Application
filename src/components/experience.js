import React from 'react';
import format from 'date-fns/format';
import trashIcon from '../img/trash.svg';
import pencilIcon from '../img/pencil.svg';

export function Experience(props) {
  const {
    companyName,
    cityName,
    positionTitle,
    taskDescription,
    startDate,
    endDate,
    presentChecked,
  } = props.theExperience;

  const { experienceDetails } = props;

  return (
    <ul className="list-of-experience">
      {experienceDetails.map((experience, index) => {
        if (experience.editItem === false) {
          return (
            <li className="no-dot-point" key={experience.id}>
              <div className="employment">
                <div className="employment-info">
                  <div className="small">
                    {' '}
                    {`${experience.positionTitle.text} `}
                  </div>
                  <div className="company-info greyed">
                    {`${experience.companyName.text}, `}
                    {`${experience.cityName.text} `}
                  </div>
                  <div className="text-area">
                    {experience.taskDescription.text}
                  </div>
                </div>

                <div className="employment-dates">
                  <div>
                    {experience.startDate.text
                      ? format(new Date(experience.startDate.text), 'MMM yyyy')
                      : ''}{' '}
                    -{' '}
                    {experience.endDate.text
                      ? format(new Date(experience.endDate.text), 'MMM yyyy')
                      : experience.presentChecked
                      ? 'Present'
                      : ''}
                  </div>
                </div>
              </div>
            </li>
          );
        }
      })}
      <li className="no-dot-point">
        <div className="employment">
          <div className="employment-info">
            <div className="small"> {`${positionTitle.text} `}</div>
            <div className="company-info greyed">
              {`${companyName.text} `}
              {`${cityName.text} `}
            </div>
            <div className="text-area">{taskDescription.text}</div>
          </div>

          <div className="employment-dates">
            <div>
              {startDate.text
                ? format(new Date(startDate.text), 'MMM yyyy')
                : ''}{' '}
              {endDate.text
                ? format(new Date(endDate.text), 'MMM yyyy')
                : presentChecked
                ? ' - Present'
                : ''}
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export function AddExperienceToForm(props) {
  const { experienceDetails } = props;

  return (
    <ul className="existing-experiences">
      {experienceDetails.map((experience, index) => {
        return (
          <div className="experiences" key={experience.id}>
            <div className="grey">
              {experience.positionTitle.text} at {experience.companyName.text}
              <img
                src={trashIcon}
                className="delete-icon"
                alt="delete-icon"
                onClick={() => props.handleExperienceDelete(experience.id)}
              />
              <img
                src={pencilIcon}
                className="button-disable"
                alt="pencil-icon"
                onClick={() => props.handleExperienceEdit(experience.id)}
              />
            </div>
          </div>
        );
      })}
    </ul>
  );
}
