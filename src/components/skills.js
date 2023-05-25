import React from 'react';
import trashIcon from '../img/trash.svg';

export function Skills(props) {
  let { skillDetails, theSkill } = props;

  return (
    <ul className="skills">
      {skillDetails.map((skill, index) => {
        return (
          <li className="skill-list" key={skill.id}>
            {`${skill.text} `}
          </li>
        );
      })}
      <div className="skill-list">{theSkill.text}</div>
    </ul>
  );
}

export function SkillsForm(props) {
  let { skillDetails } = props;
  return (
    <div className="skill-list-form-container">
      {skillDetails.map((skill, index) => {
        return (
          <span className="skill-list-form" key={skill.id}>
            {`${skill.text} `}

            <img
              src={trashIcon}
              class="delete-icon"
              alt="delete-icon"
              onClick={() => props.handleSkillDelete(skill.id)}
            />
          </span>
        );
      })}
    </div>
  );
}
