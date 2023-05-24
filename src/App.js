import React, { Component } from 'react';
import app from './styles/app.css';
import Personal from './components/personal';
import Education from './components/education';
import Experience from './components/experience';
import { Skills, SkillsForm } from './components/skills';
import uniqid from 'uniqid';

class App extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: { text: '' },
      emailInput: { text: '' },
      phoneInput: { text: '' },
      addressInput: { text: '' },
      schoolName: { text: '' },
      titleOfStudy: { text: '' },
      lengthOfStudy: { text: '' },
      eduCity: { text: '' },
      companyName: { text: '' },
      cityName: { text: '' },
      positionTitle: { text: '' },
      taskDescription: { text: '' },
      startDate: { text: '' },
      endDate: { text: '' },
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

  handleCheckbox = (e) => {
    console.log(e.target.value);
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
        <footer>CV Builder</footer>
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
                <input
                  type="text"
                  id="skillInput"
                  onChange={this.handleSkillChange}
                  value={this.state.skillInput.text}
                ></input>
                <SkillsForm
                  skillDetails={this.state.allSkills}
                  handleSkillDelete={this.handleSkillDelete}
                />
                <button
                  className="add-skill"
                  type="submit"
                  onClick={this.onAddSkill}
                >
                  + New
                </button>
              </section>

              <section>
                <div className="experience-add">
                  <h3>Experience</h3>
                </div>
                <label htmlFor="positionTitle">Position Title</label>
                <input
                  type="text"
                  id="positionTitle"
                  onChange={this.handleChange}
                  value={this.state.positionTitle.text}
                ></input>
                <div className="company-info">
                  <div className="company-divs">
                    <label htmlFor="companyName">Company</label>
                    <input
                      type="text"
                      id="companyName"
                      onChange={this.handleChange}
                      value={this.state.companyName.text}
                    ></input>
                  </div>
                  <div className="company-divs">
                    <label htmlFor="cityName">City</label>
                    <input
                      type="text"
                      id="cityName"
                      onChange={this.handleChange}
                      value={this.state.cityName.text}
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
                  onChange={this.handleChange}
                  value={this.state.taskDescription.text}
                ></textarea>
                <div className="dates">
                  <label htmlFor="startDate">Start</label>
                  <input
                    className="date"
                    type="month"
                    id="startDate"
                    onChange={this.handleChange}
                    value={this.state.startDate.text}
                  ></input>
                  <label htmlFor="endDate">End</label>
                  <input
                    className="date"
                    type="month"
                    id="endDate"
                    onChange={this.handleChange}
                    value={this.state.endDate.text}
                  ></input>
                </div>
              </section>

              <button className="submit-button" type="submit">
                Submit/Download as PDF
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
                  <div className="title-education small">Education</div>
                  <Education educationDetails={this.state} />
                </div>

                <hr className="line"></hr>

                <div className="experience-section">
                  <div className="title-experience small">Employment</div>
                  <Experience experienceDetails={this.state} />
                </div>
              </div>

              <div className="skills-section">
                <div className="title-skills small"> Skills</div>
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
