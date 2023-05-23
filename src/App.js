import React, { Component } from 'react';
import app from './styles/app.css';
import Personal from './components/personal';
import Education from './components/education';

class App extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: { text: '' },
      emailInput: { text: '' },
      phoneInput: { text: '' },
      schoolName: { text: '' },
      titleOfStudy: { text: '' },
      lengthOfStudy: { text: '' },
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: {
        text: e.target.value,
      },
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
                <label htmlFor="emailInput">Email </label>
                <input
                  type="email"
                  id="emailInput"
                  onChange={this.handleChange}
                  value={this.state.emailInput.text}
                ></input>
                <label htmlFor="phoneInput">Phone Number </label>
                <input
                  type="number"
                  id="phoneInput"
                  onChange={this.handleChange}
                  value={this.state.phoneInput.text}
                ></input>
              </section>

              <section>
                <h3>Education</h3>
                <label htmlFor="schoolName">Name of School </label>
                <input
                  type="text"
                  id="schoolName"
                  onChange={this.handleChange}
                  value={this.state.schoolName.text}
                ></input>
                <label htmlFor="titleOfStudy"> Title of Study </label>
                <input
                  type="text"
                  id="titleOfStudy"
                  onChange={this.handleChange}
                  value={this.state.titleOfStudy.text}
                ></input>
                <label htmlFor="lengthOfStudy"> Length of Study </label>
                <input
                  type="number"
                  id="lengthOfStudy"
                  onChange={this.handleChange}
                  value={this.state.lengthOfStudy.text}
                ></input>
              </section>

              <button type="submit">Submit/Download as PDF</button>
            </form>
          </main>

          <div className="preview-area">
            <div className="top-level">
              <Personal personalDetails={this.state} />
            </div>
            <div className="preview-main">
              <div className="education-section">
                <div className="title-education small">Education</div>
                <Education educationDetails={this.state} />
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
