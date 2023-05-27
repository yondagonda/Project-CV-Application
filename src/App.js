import React, { Component } from 'react';
import app from './styles/app.css';
import Personal from './components/personal';
import Education from './components/education';
import { Experience, AddExperienceToForm } from './components/experience';
import { Skills, SkillsForm } from './components/skills';
import uniqid from 'uniqid';
import githubIcon from './img/github.svg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  handleDownloadPDF = () => {
    const cv = document.querySelector('.preview-area');

    html2canvas(cv, { scale: 4, quality: 5 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth + 1, pdfHeight);
      pdf.save('cv.pdf');
    });
  };

  handleExample = () => {
    this.setState({
      nameInput: { text: 'Albert Einstein' },
      headlineInput: { text: 'Theoretical Physicist' },
      emailInput: { text: 'albert@einstein.com' },
      phoneInput: { text: '1234 123 123' },
      addressInput: { text: '112 Mercer Street, Princeton, New Jersey' },
      schoolName: { text: 'University of Zurich' },
      titleOfStudy: { text: 'Mathematics and Natural Sciences Degree' },
      lengthOfStudy: { text: '4' },
      eduCity: { text: 'Switzerland' },
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
      allExperiences: [
        {
          companyName: { text: 'Institute of Advanced Study' },
          cityName: { text: 'Princeton University' },
          positionTitle: { text: 'Professor' },
          taskDescription: {
            text: 'Continued research, collaborated with other scientists and became a prominent figure in the scientific community',
          },
          startDate: { text: '1933-03' },
          endDate: { text: '1955-07' },
          id: uniqid(),
          editItem: false,
          presentChecked: false,
        },
        {
          companyName: { text: 'Humboldt University' },
          cityName: { text: 'Berlin' },
          positionTitle: { text: 'Director and Professor' },
          taskDescription: {
            text: 'Made significant contributions in advancing theoretical physics with general theory of relativity',
          },
          startDate: { text: '1914-10' },
          endDate: { text: '1933-03' },
          id: uniqid(),
          editItem: false,
          presentChecked: false,
        },
        {
          companyName: { text: 'Swiss Federal Institute of Technology' },
          cityName: { text: 'Zurich' },
          positionTitle: { text: 'Professor of Theoretical Physics' },
          taskDescription: { text: 'Conducted research, taught students' },
          startDate: { text: '1912-03' },
          endDate: { text: '1914-09' },
          id: uniqid(),
          editItem: false,
          presentChecked: false,
        },
      ],
      skillInput: { text: '', id: uniqid() },
      allSkills: [
        { text: 'Mathematical Physics', id: uniqid() },
        { text: 'General Relativity', id: uniqid() },
        { text: 'Quantum Mechanics', id: uniqid() },
        { text: 'Theoretical Modelling', id: uniqid() },
        { text: 'Electromagnetism', id: uniqid() },
        { text: 'Particle Physics', id: uniqid() },
        { text: 'Statistical Physics', id: uniqid() },
        { text: 'Violinist', id: uniqid() },
      ],
    });
  };

  handleClearExample = () => {
    this.setState({
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
    });
  };

  render() {
    const {
      nameInput,
      headlineInput,
      emailInput,
      phoneInput,
      addressInput,
      schoolName,
      titleOfStudy,
      lengthOfStudy,
      eduCity,
      experienceInput,
      allExperiences,
      skillInput,
      allSkills,
    } = this.state;
    return (
      <>
        <footer>
          <div className="main-title">CV Builder</div>
          <div className="creator">
            An application by
            <button
              className="github"
              onClick={() => {
                window.open('https://github.com/yondagonda');
              }}
            >
              <span>
                <img
                  src={githubIcon}
                  className="github-icon"
                  alt="github icon"
                />
                yondagonda
              </span>
            </button>
          </div>
        </footer>
        <div className="app">
          <main>
            <form>
              <section>
                <div className="autofill-area">
                  <h3>Personal</h3>
                  <button
                    type="button"
                    className="autofill-btn"
                    onClick={this.handleExample}
                  >
                    See Example
                  </button>
                  <button
                    type="button"
                    className="clear-example-btn"
                    onClick={this.handleClearExample}
                  >
                    Clear All
                  </button>
                </div>
                <label htmlFor="nameInput">Name </label>
                <input
                  type="text"
                  id="nameInput"
                  onChange={this.handleChange}
                  value={nameInput.text}
                  maxLength={57}
                ></input>
                <label htmlFor="headlineInput">Headline </label>
                <input
                  type="text"
                  id="headlineInput"
                  onChange={this.handleChange}
                  value={headlineInput.text}
                ></input>
                <div className="emailPhone">
                  <div className="emailPhoneContainer">
                    <label htmlFor="emailInput">Email </label>
                    <input
                      type="email"
                      id="emailInput"
                      onChange={this.handleChange}
                      value={emailInput.text}
                    ></input>
                  </div>
                  <div className="emailPhoneContainer">
                    <label htmlFor="phoneInput">Phone </label>
                    <input
                      type="text"
                      id="phoneInput"
                      onChange={this.handleChange}
                      value={phoneInput.text}
                      maxLength={18}
                    ></input>
                  </div>
                </div>

                <label htmlFor="addessInput">Address </label>
                <input
                  type="text"
                  id="addressInput"
                  onChange={this.handleChange}
                  value={addressInput.text}
                ></input>
              </section>

              <section>
                <h3>Education</h3>
                <label htmlFor="titleOfStudy"> Title of Study </label>
                <input
                  type="text"
                  id="titleOfStudy"
                  onChange={this.handleChange}
                  value={titleOfStudy.text}
                ></input>
                <label htmlFor="schoolName">Name of School </label>
                <input
                  type="text"
                  id="schoolName"
                  onChange={this.handleChange}
                  value={schoolName.text}
                ></input>
                <div className="study-info">
                  <div className="study-container">
                    <label htmlFor="lengthOfStudy">Years of Study</label>
                    <input
                      type="text"
                      id="lengthOfStudy"
                      onChange={this.handleChange}
                      value={lengthOfStudy.text}
                      maxLength={2}
                    ></input>
                  </div>
                  <div className="study-container">
                    <label htmlFor="eduCity">Location</label>
                    <input
                      type="text"
                      id="eduCity"
                      onChange={this.handleChange}
                      value={eduCity.text}
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
                    value={skillInput.text}
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
                  skillDetails={allSkills}
                  handleSkillDelete={this.handleSkillDelete}
                />
              </section>

              <section>
                <div className="experience-add">
                  <h3>Experience</h3>
                </div>
                <AddExperienceToForm
                  experienceDetails={allExperiences}
                  handleExperienceChange={this.handleExperienceChange}
                  handleExperienceDelete={this.handleExperienceDelete}
                  handleExperienceEdit={this.handleExperienceEdit}
                />
                <label htmlFor="positionTitle">Position Title</label>
                <input
                  type="text"
                  id="positionTitle"
                  onChange={this.handleExperienceChange}
                  value={experienceInput.positionTitle.text}
                ></input>
                <div className="company-info">
                  <div className="company-divs">
                    <label htmlFor="companyName">Company</label>
                    <input
                      type="text"
                      id="companyName"
                      onChange={this.handleExperienceChange}
                      value={experienceInput.companyName.text}
                    ></input>
                  </div>
                  <div className="company-divs">
                    <label htmlFor="cityName">City</label>
                    <input
                      type="text"
                      id="cityName"
                      onChange={this.handleExperienceChange}
                      value={experienceInput.cityName.text}
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
                  value={experienceInput.taskDescription.text}
                ></textarea>
                <div className="dates">
                  <label htmlFor="startDate">Start</label>
                  <input
                    className="date"
                    type="month"
                    id="startDate"
                    onChange={this.handleExperienceChange}
                    value={experienceInput.startDate.text}
                  ></input>
                  <label htmlFor="endDate">End</label>
                  <input
                    className="date"
                    type="month"
                    id="endDate"
                    onChange={this.handleExperienceChange}
                    value={experienceInput.endDate.text}
                    disabled={experienceInput.presentChecked}
                  ></input>
                  <div className="present-checkbox">
                    <label htmlFor="present">Present</label>
                    <input
                      type="checkbox"
                      id="present"
                      name="present"
                      checked={experienceInput.presentChecked}
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

              <button
                className="submit-button"
                type="button"
                onClick={this.handleDownloadPDF}
              >
                Download as PDF
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
                    theExperience={experienceInput}
                    experienceDetails={allExperiences}
                  />
                </div>
              </div>

              <div className="skills-section">
                <div className="title-skills small main-header"> Skills</div>
                <Skills skillDetails={allSkills} theSkill={skillInput} />
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
