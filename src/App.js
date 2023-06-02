import React, { Component, useEffect, useState } from 'react';
import app from './styles/app.css';
import Personal from './components/personal';
import Education from './components/education';
import { Experience, AddExperienceToForm } from './components/experience';
import { Skills, SkillsForm } from './components/skills';
import uniqid from 'uniqid';
import githubIcon from './img/github.svg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App = () => {
  const [nameInput, setNameInput] = useState({ text: '' });
  const [headlineInput, setHeadlineInput] = useState({ text: '' });
  const [emailInput, setEmailInput] = useState({ text: '' });
  const [phoneInput, setPhoneInput] = useState({ text: '' });
  const [addressInput, setAddressInput] = useState({ text: '' });
  const [schoolName, setSchoolName] = useState({ text: '' });
  const [titleOfStudy, setTitleOfStudy] = useState({ text: '' });
  const [lengthOfStudy, setLengthOfStudy] = useState({ text: '' });
  const [eduCity, setEduCity] = useState({ text: '' });
  const [experienceInput, setExperienceInput] = useState({
    positionTitle: { text: '' },
    companyName: { text: '' },
    cityName: { text: '' },
    taskDescription: { text: '' },
    startDate: { text: '' },
    endDate: { text: '' },
    id: uniqid(),
    editItem: false,
    presentChecked: false,
  });
  const [addExperience, setAddExperience] = useState(false);
  const [allExperiences, setAllExperiences] = useState([]);
  const [skillInput, setSkillInput] = useState({ text: '', id: uniqid() });
  const [allSkills, setAllSkills] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'nameInput':
        setNameInput({ text: value });
        break;
      case 'headlineInput':
        setHeadlineInput({ text: value });
        break;
      case 'emailInput':
        setEmailInput({ text: value });
        break;
      case 'phoneInput':
        setPhoneInput({ text: value });
        break;
      case 'addressInput':
        setAddressInput({ text: value });
        break;
      case 'schoolName':
        setSchoolName({ text: value });
        break;
      case 'titleOfStudy':
        setTitleOfStudy({ text: value });
        break;
      case 'lengthOfStudy':
        setLengthOfStudy({ text: value });
        break;
      case 'eduCity':
        setEduCity({ text: value });
        break;
      case 'skillInput':
        setSkillInput({ text: value, id: skillInput.id });
        break;

      default:
        break;
    }
  };

  const handleExperienceChange = (e) => {
    const { id, value } = e.target;
    setExperienceInput((prevState) => ({
      ...prevState,
      [id]: { text: value },
    }));
  };

  const onAddExperience = () => {
    setAddExperience(true);
  };

  const handleExperienceDelete = (id) => {
    setAllExperiences(
      allExperiences.filter((experienceInput) => experienceInput.id !== id)
    );
  };

  const handleExperienceEdit = (id) => {
    document.querySelector('.add-experience').style.display = 'none';
    document.querySelector('.confirm-edits').style.display = 'block';
    const disableButtons = document.querySelectorAll('.button-disable');
    disableButtons.forEach((editButton) => {
      editButton.style.pointerEvents = 'none';
    });
    let editThis = allExperiences.find(
      (experienceInput) => experienceInput.id === id
    );
    editThis.editItem = true;

    setExperienceInput(editThis);
  };

  const handleExperienceEditConfirm = () => {
    document.querySelector('.add-experience').style.display = 'block';
    document.querySelector('.confirm-edits').style.display = 'none';
    const disableButtons = document.querySelectorAll('.button-disable');
    disableButtons.forEach((editButton) => {
      editButton.style.pointerEvents = 'auto';
    });

    setExperienceInput((prevState) => ({
      ...prevState,
      editItem: false,
    }));

    handleExperienceDelete(experienceInput.id);
    setAddExperience(true);
  };

  useEffect(() => {
    if (addExperience === true) {
      setAllExperiences(allExperiences.concat(experienceInput));
      setExperienceInput({
        positionTitle: { text: '' },
        companyName: { text: '' },
        cityName: { text: '' },
        taskDescription: { text: '' },
        startDate: { text: '' },
        endDate: { text: '' },
        id: uniqid(),
        editItem: false,
        presentChecked: false,
      });
    }
    setAddExperience(false);
  }, [addExperience]);

  const handlePresentChange = () => {
    setExperienceInput((prevState) => ({
      ...prevState,
      endDate: {
        text: !prevState.presentChecked ? '' : prevState.endDate.text,
      },
      presentChecked: !prevState.presentChecked,
    }));
  };

  const onAddSkill = (e) => {
    e.preventDefault();
    setAllSkills(allSkills.concat(skillInput));
    setSkillInput({ text: '', id: uniqid() });
  };

  const handleSkillDelete = (id) => {
    setAllSkills(allSkills.filter((skillInput) => skillInput.id !== id));
  };

  const handleDownloadPDF = () => {
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

  const handleExample = () => {
    setNameInput({ text: 'Albert Einstein' });
    setHeadlineInput({ text: 'Theoretical Physicist' });
    setEmailInput({ text: 'albert@einstein.com' });
    setPhoneInput({ text: '1234 123 123' });
    setAddressInput({ text: '112 Mercer Street, Princeton, New Jersey' });
    setSchoolName({ text: 'University of Zurich' });
    setTitleOfStudy({ text: 'Mathematics and Natural Sciences Degree' });
    setLengthOfStudy({ text: '4' });
    setEduCity({ text: 'Switzerland' });
    setAllSkills([
      { text: 'Mathematical Physics', id: uniqid() },
      { text: 'General Relativity', id: uniqid() },
      { text: 'Quantum Mechanics', id: uniqid() },
      { text: 'Theoretical Modelling', id: uniqid() },
      { text: 'Electromagnetism', id: uniqid() },
      { text: 'Particle Physics', id: uniqid() },
      { text: 'Statistical Physics', id: uniqid() },
      { text: 'Violinist', id: uniqid() },
    ]);
    setAllExperiences([
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
    ]);
    setExperienceInput({
      positionTitle: { text: '' },
      companyName: { text: '' },
      cityName: { text: '' },
      taskDescription: { text: '' },
      startDate: { text: '' },
      endDate: { text: '' },
      id: uniqid(),
      editItem: false,
      presentChecked: false,
    });
    setSkillInput({ text: '', id: uniqid() });
  };

  const handleClearExample = () => {
    setNameInput({ text: '' });
    setHeadlineInput({ text: '' });
    setEmailInput({ text: '' });
    setPhoneInput({ text: '' });
    setAddressInput({ text: '' });
    setSchoolName({ text: '' });
    setTitleOfStudy({ text: '' });
    setLengthOfStudy({ text: '' });
    setEduCity({ text: '' });
    setAllSkills([]);
    setAllExperiences([]);
    setExperienceInput({
      positionTitle: { text: '' },
      companyName: { text: '' },
      cityName: { text: '' },
      taskDescription: { text: '' },
      startDate: { text: '' },
      endDate: { text: '' },
      id: uniqid(),
      editItem: false,
      presentChecked: false,
    });
    setSkillInput({ text: '', id: uniqid() });
  };

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
              <img src={githubIcon} className="github-icon" alt="github icon" />
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
                  onClick={handleExample}
                >
                  See Example
                </button>
                <button
                  type="button"
                  className="clear-example-btn"
                  onClick={handleClearExample}
                >
                  Clear All
                </button>
              </div>
              <label htmlFor="nameInput">Name </label>
              <input
                type="text"
                id="nameInput"
                onChange={handleChange}
                value={nameInput.text}
                maxLength={57}
              ></input>
              <label htmlFor="headlineInput">Headline </label>
              <input
                type="text"
                id="headlineInput"
                onChange={handleChange}
                value={headlineInput.text}
                maxLength={57}
              ></input>
              <div className="emailPhone">
                <div className="emailPhoneContainer">
                  <label htmlFor="emailInput">Email </label>
                  <input
                    type="email"
                    id="emailInput"
                    onChange={handleChange}
                    value={emailInput.text}
                    maxLength={50}
                  ></input>
                </div>
                <div className="emailPhoneContainer">
                  <label htmlFor="phoneInput">Phone </label>
                  <input
                    type="text"
                    id="phoneInput"
                    onChange={handleChange}
                    value={phoneInput.text}
                    maxLength={22}
                  ></input>
                </div>
              </div>

              <label htmlFor="addessInput">Address </label>
              <input
                type="text"
                id="addressInput"
                onChange={handleChange}
                value={addressInput.text}
                maxLength={64}
              ></input>
            </section>

            <section>
              <h3>Education</h3>
              <label htmlFor="titleOfStudy"> Title of Study </label>
              <input
                type="text"
                id="titleOfStudy"
                onChange={handleChange}
                value={titleOfStudy.text}
                maxLength={80}
              ></input>
              <label htmlFor="schoolName">Name of School </label>
              <input
                type="text"
                id="schoolName"
                onChange={handleChange}
                value={schoolName.text}
                maxLength={46}
              ></input>
              <div className="study-info">
                <div className="study-container">
                  <label htmlFor="lengthOfStudy">Years of Study</label>
                  <input
                    type="text"
                    id="lengthOfStudy"
                    onChange={handleChange}
                    value={lengthOfStudy.text}
                    maxLength={2}
                  ></input>
                </div>
                <div className="study-container">
                  <label htmlFor="eduCity">Location</label>
                  <input
                    type="text"
                    id="eduCity"
                    onChange={handleChange}
                    value={eduCity.text}
                    maxLength={20}
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
                  onChange={handleChange}
                  value={skillInput.text}
                  maxLength={18}
                ></input>
                <button
                  className="add-skill"
                  type="submit"
                  onClick={onAddSkill}
                >
                  + Add skill
                </button>
              </div>
              <SkillsForm
                skillDetails={allSkills}
                handleSkillDelete={handleSkillDelete}
              />
            </section>

            <section>
              <div className="experience-add">
                <h3>Experience</h3>
              </div>
              <AddExperienceToForm
                experienceDetails={allExperiences}
                handleExperienceChange={handleExperienceChange}
                handleExperienceDelete={handleExperienceDelete}
                handleExperienceEdit={handleExperienceEdit}
              />
              <label htmlFor="positionTitle">Position Title</label>
              <input
                type="text"
                id="positionTitle"
                onChange={handleExperienceChange}
                value={experienceInput.positionTitle.text}
                maxLength={40}
              ></input>
              <div className="company-info">
                <div className="company-divs">
                  <label htmlFor="companyName">Company</label>
                  <input
                    type="text"
                    id="companyName"
                    onChange={handleExperienceChange}
                    value={experienceInput.companyName.text}
                    maxLength={22}
                  ></input>
                </div>
                <div className="company-divs">
                  <label htmlFor="cityName">City</label>
                  <input
                    type="text"
                    id="cityName"
                    onChange={handleExperienceChange}
                    value={experienceInput.cityName.text}
                    maxLength={22}
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
                onChange={handleExperienceChange}
                maxLength={260}
                value={experienceInput.taskDescription.text}
              ></textarea>
              <div className="dates">
                <label htmlFor="startDate">Start</label>
                <input
                  className="date"
                  type="month"
                  id="startDate"
                  onChange={handleExperienceChange}
                  value={experienceInput.startDate.text}
                ></input>
                <label htmlFor="endDate">End</label>
                <input
                  className="date"
                  type="month"
                  id="endDate"
                  onChange={handleExperienceChange}
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
                    onChange={handlePresentChange}
                  ></input>
                </div>
              </div>
              <button
                className="add-experience"
                type="button"
                onClick={onAddExperience}
              >
                + Add Experience
              </button>
              <button
                className="confirm-edits"
                type="button"
                onClick={handleExperienceEditConfirm}
              >
                Confirm
              </button>
            </section>

            <button
              className="submit-button"
              type="button"
              onClick={handleDownloadPDF}
            >
              Download as PDF
            </button>
          </form>
        </main>

        <div className="preview-area">
          <div className="top-level">
            <Personal
              nameInput={nameInput}
              headlineInput={headlineInput}
              emailInput={emailInput}
              phoneInput={phoneInput}
              addressInput={addressInput}
            />
          </div>
          <div className="preview-main">
            <div>
              <div className="education-section">
                <div className="title-education small main-header">
                  Education
                </div>
                <Education
                  schoolName={schoolName}
                  titleOfStudy={titleOfStudy}
                  lengthOfStudy={lengthOfStudy}
                  eduCity={eduCity}
                />
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
};

export default App;
