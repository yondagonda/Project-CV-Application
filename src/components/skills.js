import React from 'react';

export function Skills(props) {
  let { skillDetails, theSkill } = props;

  return (
    <ul>
      {skillDetails.map((skill, index) => {
        return (
          <li className="skill-list" key={skill.id}>
            {`${skill.text} `}
          </li>
        );
      })}
      <li className="skill-list">{theSkill.text}</li>
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
            <button onClick={() => props.handleSkillDelete(skill.id)}>
              Del
            </button>
          </span>
        );
      })}
    </div>
  );
}
