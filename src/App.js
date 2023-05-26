import React, { Component } from 'react';
import app from './styles/app.css';
import Personal from './components/personal';
import Education from './components/education';
import { Experience, AddExperienceToForm } from './components/experience';
import { Skills, SkillsForm } from './components/skills';
import uniqid from 'uniqid';
import githubIcon from './img/github.svg';

class App extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: { text: '' },
      headlineInput: { text: ' ' },
      emailInput: { text: '' },
      phoneInput: { text: '' },
      addressInput: { text: '' },
      schoolName: { text: '' },
      titleOfStudy: { text: '' },
      lengthOfStudy: { text: '' },
      eduCity: { text: '' },
      experienceInput: {
        companyName: { text: '' },
        cityName: { text: '' },
        positionTitle: { text: '' },
        taskDescription: { text: '' },
        startDate: { text: '' },
        endDate: { text: '' },
        id: uniqid(),
        editItem: false,
        presentChecked: false,
      },
      allExperiences: [],
      skillInput: { text: '', id: uniqid() },
      allSkills: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: {
        text: e.target.value,
      },
    });
  };

  handlePresentChange = () => {
    this.setState((prevState) => ({
      experienceInput: {
        ...prevState.experienceInput,
        endDate: {
          text: !prevState.experienceInput.presentChecked
            ? ''
            : prevState.experienceInput.endDate.text,
        },
        presentChecked: !prevState.experienceInput.presentChecked,
      },
    }));
  };

  handleExperienceChange = (e) => {
    this.setState((prevState) => ({
      experienceInput: {
        ...prevState.experienceInput,
        [e.target.id]: {
          ...prevState.experienceInput[e.target.id],
          text: e.target.value,
        },
        id: this.state.experienceInput.id,
      },
    }));
  };

  onAddExperience = () => {
    this.setState({
      allExperiences: this.state.allExperiences.concat(
        this.state.experienceInput
      ),
      experienceInput: {
        companyName: { text: '' },
        cityName: { text: '' },
        positionTitle: { text: '' },
        taskDescription: { text: '' },
        startDate: { text: '' },
        endDate: { text: '' },
        id: uniqid(),
        editItem: false,
        presentChecked: false,
      },
    });
  };

  handleExperienceDelete = (id) => {
    this.setState({
      allExperiences: this.state.allExperiences.filter(
        (experienceInput) => experienceInput.id !== id
      ),
    });
  };

  handleExperienceEdit = (id) => {
    document.querySelector('.add-experience').style.display = 'none';
    document.querySelector('.confirm-edits').style.display = 'block';
    const disableButtons = document.querySelectorAll('.button-disable');
    disableButtons.forEach((editButton) => {
      editButton.style.pointerEvents = 'none';
    });

    let editThis = this.state.allExperiences.find(
      (experienceInput) => experienceInput.id === id
    );
    editThis.editItem = true;

    this.setState({
      experienceInput: editThis,
    });
  };

  handleExperienceEditConfirm = () => {
    document.querySelector('.add-experience').style.display = 'block';
    document.querySelector('.confirm-edits').style.display = 'none';
    const disableButtons = document.querySelectorAll('.button-disable');
    disableButtons.forEach((editButton) => {
      editButton.style.pointerEvents = 'auto';
    });

    this.setState((prevState) => ({
      experienceInput: {
        ...prevState.experienceInput,
        editItem: false,
      },
    }));

    this.setState(
      {
        allExperiences: this.state.allExperiences.filter(
          (experienceInput) =>
            experienceInput.id !== this.state.experienceInput.id
        ),
      },
      () => {
        this.onAddExperience();
      }
    );
  };

  handleSkillChange = (e) => {
    this.setState({
      skillInput: {
        text: e.target.value,
        id: this.state.skillInput.id,
      },
    });
  };

  onAddSkill = (e) => {
    e.preventDefault();
    this.setState({
      allSkills: this.state.allSkills.concat(this.state.skillInput),
      skillInput: { text: '', id: uniqid() },
    });
  };

  handleSkillDelete = (id) => {
    this.setState({
      allSkills: this.state.allSkills.filter(
        (skillInput) => skillInput.id !== id
      ),
    });
  };

  render() {
    return (
      <>
        <footer>
          <div className="main-title">CV Builder</div>
          <div className="creator">
            An application by
            <a href="https://github.com/yondagonda" alt="link to Github">
              <button className="github" spellCheck="false" data-gramm="false">
                <img
                  src={githubIcon}
                  className="github-icon"
                  alt="github icon"
                />
                <div className="github-name">yondagonda</div>
              </button>
            </a>
          </div>
        </footer>
        <div className="app">
          <main>
            <form>
              <section>
                <h3>Personal</h3>
                <label htmlFor="nameInput">Name </label>
                <input
                  type="text"
                  id="nameInput"
                  onChange={this.handleChange}
                  value={this.state.nameInput.text}
                ></input>
                <label htmlFor="headlineInput">Headline </label>
                <input
                  type="text"
                  id="headlineInput"
                  onChange={this.handleChange}
                  value={this.state.headlineInput.text}
                ></input>
                <div className="emailPhone">
                  <div className="emailPhoneContainer">
                    <label htmlFor="emailInput">Email </label>
                    <input
                      type="email"
                      id="emailInput"
                      onChange={this.handleChange}
                      value={this.state.emailInput.text}
                    ></input>
                  </div>
                  <div className="emailPhoneContainer">
                    <label htmlFor="phoneInput">Phone </label>
                    <input
                      type="number"
                      id="phoneInput"
                      onChange={this.handleChange}
                      value={this.state.phoneInput.text}
                    ></input>
                  </div>
                </div>

                <label htmlFor="addessInput">Address </label>
                <input
                  type="text"
                  id="addressInput"
                  onChange={this.handleChange}
                  value={this.state.addressInput.text}
                ></input>
              </section>

              <section>
                <h3>Education</h3>
                <label htmlFor="titleOfStudy"> Title of Study </label>
                <input
                  type="text"
                  id="titleOfStudy"
                  onChange={this.handleChange}
                  value={this.state.titleOfStudy.text}
                ></input>
                <label htmlFor="schoolName">Name of School </label>
                <input
                  type="text"
                  id="schoolName"
                  onChange={this.handleChange}
                  value={this.state.schoolName.text}
                ></input>
                <div className="study-info">
                  <div className="study-container">
                    <label htmlFor="lengthOfStudy">Years of Study</label>
                    <input
                      type="number"
                      id="lengthOfStudy"
                      onChange={this.handleChange}
                      value={this.state.lengthOfStudy.text}
                    ></input>
                  </div>
                  <div className="study-container">
                    <label htmlFor="eduCity">Location</label>
                    <input
                      type="text"
                      id="eduCity"
                      onChange={this.handleChange}
                      value={this.state.eduCity.text}
                    ></input>
                  </div>
                </div>
              </section>

              <section className="skills-sect">
                <h3>Skills & Technologies</h3>
                <label htmlFor="skillInput"></label>
                <div className="skill-content">
                  <input
                    type="text"
                    id="skillInput"
                    onChange={this.handleSkillChange}
                    value={this.state.skillInput.text}
                  ></input>
                  <button
                    className="add-skill"
                    type="submit"
                    onClick={this.onAddSkill}
                  >
                    + Add skill
                  </button>
                </div>
                <SkillsForm
                  skillDetails={this.state.allSkills}
                  handleSkillDelete={this.handleSkillDelete}
                />
              </section>

              <section>
                <div className="experience-add">
                  <h3>Experience</h3>
                </div>
                <AddExperienceToForm
                  experienceDetails={this.state.allExperiences}
                  handleExperienceChange={this.handleExperienceChange}
                  handleExperienceDelete={this.handleExperienceDelete}
                  handleExperienceEdit={this.handleExperienceEdit}
                />
                <label htmlFor="positionTitle">Position Title</label>
                <input
                  type="text"
                  id="positionTitle"
                  onChange={this.handleExperienceChange}
                  value={this.state.experienceInput.positionTitle.text}
                ></input>
                <div className="company-info">
                  <div className="company-divs">
                    <label htmlFor="companyName">Company</label>
                    <input
                      type="text"
                      id="companyName"
                      onChange={this.handleExperienceChange}
                      value={this.state.experienceInput.companyName.text}
                    ></input>
                  </div>
                  <div className="company-divs">
                    <label htmlFor="cityName">City</label>
                    <input
                      type="text"
                      id="cityName"
                      onChange={this.handleExperienceChange}
                      value={this.state.experienceInput.cityName.text}
                    ></input>
                  </div>
                </div>
                <label htmlFor="taskDescription">
                  Description of your role and responsibilities
                </label>
                <textarea
                  type="text"
                  rows="4"
                  cols="50"
                  id="taskDescription"
                  onChange={this.handleExperienceChange}
                  value={this.state.experienceInput.taskDescription.text}
                ></textarea>
                <div className="dates">
                  <label htmlFor="startDate">Start</label>
                  <input
                    className="date"
                    type="month"
                    id="startDate"
                    onChange={this.handleExperienceChange}
                    value={this.state.experienceInput.startDate.text}
                  ></input>
                  <label htmlFor="endDate">End</label>
                  <input
                    className="date"
                    type="month"
                    id="endDate"
                    onChange={this.handleExperienceChange}
                    value={this.state.experienceInput.endDate.text}
                    disabled={this.state.experienceInput.presentChecked}
                  ></input>
                  <div className="present-checkbox">
                    <label htmlFor="present">Present</label>
                    <input
                      type="checkbox"
                      id="present"
                      name="present"
                      checked={this.state.experienceInput.presentChecked}
                      onChange={this.handlePresentChange}
                    ></input>
                  </div>
                </div>
                <button
                  className="add-experience"
                  type="button"
                  onClick={this.onAddExperience}
                >
                  + Add Experience
                </button>
                <button
                  className="confirm-edits"
                  type="button"
                  onClick={this.handleExperienceEditConfirm}
                >
                  Confirm
                </button>
              </section>

              <button className="submit-button" type="button">
                Submit/Download as PDF
                {/* change button type to 'submit', later when implementing the PDF download feature */}
              </button>
            </form>
          </main>

          <div className="preview-area">
            <div className="top-level">
              <Personal personalDetails={this.state} />
            </div>
            <div className="preview-main">
              <div>
                <div className="education-section">
                  <div className="title-education small main-header">
                    Education
                  </div>
                  <Education educationDetails={this.state} />
                </div>

                <hr className="line"></hr>

                <div className="experience-section">
                  <div className="title-experience small main-header">
                    Employment
                  </div>
                  <Experience
                    theExperience={this.state.experienceInput}
                    experienceDetails={this.state.allExperiences}
                  />
                </div>
              </div>

              <div className="skills-section">
                <div className="title-skills small main-header"> Skills</div>
                <Skills
                  skillDetails={this.state.allSkills}
                  theSkill={this.state.skillInput}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

//

export default App;
