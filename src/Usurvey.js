import React, { Component } from 'react'

var firebase = require('firebase');
var uuid = require('uuid');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDCdLtYEpZlGdlDB3bLMkp82XAxAoHRaQo",
  authDomain: "usurvey-bb3d7.firebaseapp.com",
  databaseURL: "https://usurvey-bb3d7.firebaseio.com",
  projectId: "usurvey-bb3d7",
  storageBucket: "usurvey-bb3d7.appspot.com",
  messagingSenderId: "470877057048"
};
firebase.initializeApp(config);

class Usurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    }

    this.submit = this.submit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmitted = this.questionSubmitted.bind(this);
  }

  submit(event){

    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, () => {
      console.log(this.state);
    })

  }

  answerSelected(event){
    var answers = this.state.answers;

    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    } else if (event.target.name === 'answer2') {
      answers.answer2 = event.target.value;
    } else if (event.target.name === 'answer3') {
      answers.answer3 = event.target.value;
    }

    this.setState({answers: answers}, () => {
      console.log(this.state);
    })
    
  }

  questionSubmitted(){
    firebase.database().ref('Usurvey/' + this.state.uuid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });

    this.setState({isSubmitted: true});
  }
  
  render() {
    var studentName;
    var questions;


    if(this.state.studentName === '' && this.state.isSubmitted === false)
    {
      studentName = <div>
        <h1>Hey student, please let us know your name</h1>

        <form onSubmit={this.submit}>
          <input className="nami" type="text" placeholder="Enter your name" ref="name" />
        </form>
      </div>;
    }
    else if(this.state.studentName !== '' && this.state.isSubmitted === false)
    {
      studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>;
      questions = (
        <div>
          <h2>Here are some questions for you:</h2>
          <form onSubmit={this.questionSubmitted}>
            <div className="card">
              <label>What type of courses do you prefer best?</label> <br />
              <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology
              <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
              <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing
            </div>

            <div className="card">
              <label>You are:</label> <br />
              <input type="radio" name="answer2" value="student" onChange={this.answerSelected} />Student
              <input type="radio" name="answer2" value="employed" onChange={this.answerSelected} />Employed
              <input type="radio" name="answer2" value="unemployed" onChange={this.answerSelected} />Unemployed
            </div>

            <div className="card">
              <label>Do you find online courses helpful?</label> <br />
              <input type="radio" name="answer3" value="yes" onChange={this.answerSelected} />Yes
              <input type="radio" name="answer3" value="no" onChange={this.answerSelected} />No
              <input type="radio" name="answer3" value="maybe" onChange={this.answerSelected} />Maybe
            </div>

            <input type="submit" className="feedback-button" value="Submit" />
            
          </form>
        </div>
      );
    }
    else if(this.state.studentName !== '' && this.state.isSubmitted === true){
      studentName = <h1>Thanks for taking this survey {this.state.studentName}</h1>;
    }
    
    return (
      <div>
        { studentName }
        ---------------------------------------------------------------------------------------------------------------------------
        { questions }
      </div>
    )
  }
}

export default Usurvey;
