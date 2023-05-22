import logo from './logo.svg';
import React, { Component } from 'react';
import app from './styles/app.css';
import Personal from './components/personal';

class App extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: { text: '' },
      emailInput: { text: '' },
      phoneInput: { text: '' },
    };
  }

  handleChange = (e) => {
    // console.log(e.target.id);
    this.setState({
      [e.target.id]: {
        text: e.target.value,
        // id: this.state.task.id,
      },
    });
    console.log(this.state);
  };

  render() {
    return (
      <div className="app">
        <main>
          <h1>CV Builder</h1>
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
              <input type="text" id="schoolName"></input>
              <label htmlFor="titleOfStudy"> Title of Study </label>
              <input type="text" id="titleOfStudy"></input>
              <label htmlFor="dateOfStudy"> Date of Study </label>
              <input type="number" id="dateOfStudy"></input>
            </section>

            <button type="submit">Submit/Download as PDF</button>
          </form>
        </main>

        <div className="preview-area">
          <div className="contact-section">
            <div className="title">Contact</div>
            <Personal personalDetails={this.state} />
          </div>
          <div className="education-section">
            <div className="title">Education</div>
          </div>
        </div>
      </div>
    );
  }
}

//

export default App;
