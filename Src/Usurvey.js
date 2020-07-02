import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var firebaseConfig = {
    apiKey: "AIzaSyBh-8i0OEUv_TWA4PhdDOcOJPStw2X2tm8",
    authDomain: "usurvey-22a0e.firebaseapp.com",
    databaseURL: "https://usurvey-22a0e.firebaseio.com",
    projectId: "usurvey-22a0e",
    storageBucket: "usurvey-22a0e.appspot.com",
    messagingSenderId: "569496551562",
    appId: "1:569496551562:web:fed2733ca05a474f9aad73",
    measurementId: "G-FGSYL3SJ4V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

class Usurvey extends React.Component {
nameSubmit(event){
  var studentName = this.refs.name.value;
  this.setState({studentName : studentName}, function(){
    console.log(this.state);
  });
}

answerSelected(event){
var answers = this.state.answers;
if (event.target.name==='answer1'){
answers.answer1 = event.target.value;
}else if (event.target.name==='answer2'){
answers.answer2 = event.target.value;
}else if (event.target.name==='answer3'){
answers.answer3 = event.target.value;
}
this.setState({answers:answers},function(){
            console.log(this.state);
});
}

questionSubmit(){
  firebase.database().ref('uSurvey/' + this.state.uid).set({
    studentName: this.state.studentName,
    answers :this.state.answers
  });
  this.setState({isSubmitted: true});
}

  constructor(props){
    super(props);
    this.state = {
      uid: uuid.v1(),
      studentName:'',
      answers : {
        answer1:'',
        answer2:'',
        answer3:''
      },
      isSubmitted:false
    };
    this.nameSubmit =this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit =this.questionSubmit.bind(this);
  }
  render(){
    var studentName;
    var questions;
    if (this.state.studentName ==='' && this.state.isSubmitted === false) {
      studentName = <div>
        <h1>Hey Students, please let us know your names</h1>
        <form onSubmit={this.nameSubmit}>
          <input className="namy" type ="text" placeholder="Enter your name" ref = "name" />
        </form>
      </div>;

    questions = ''
  } else if (this.state.studentName !== '' && this.state.isSubmitted===false) {
    studentName =  <h1>Welcome to usurvey,{this.state.studentName}</h1>
    questions = <div><h2>Here are some questions:</h2>
    <form onSubmit={this.questionSubmit}>
    <div className="card">
    <lable>What do you like the most to eat !!</lable><br />
    <input type = "radio" name = "answer1" value= "Pizza" onChange={this.answerSelected} />Pizza<br/>
    <input type = "radio" name = "answer1" value= "Burger" onChange={this.answerSelected} />Burger<br/>
    <input type = "radio" name = "answer1" value= "Moms" onChange={this.answerSelected} />Moms<br/>
    </div>

    <div className="card">
    <lable>What do you like the most !!</lable><br />
    <input type = "radio" name = "answer2" value= "Explore The World With Friends" onChange={this.answerSelected} />Explore The World With Friends<br/>
    <input type = "radio" name = "answer2" value= "Stay At Home And Watch Movies" onChange={this.answerSelected} />Stay At Home And Watch Movies<br/>
    <input type = "radio" name = "answer2" value= "Go On A Long Drive With Friends" onChange={this.answerSelected} />Go On A Long Drive With Friends<br/>
    </div>

    <div className="card">
    <lable>What Type Of Movies do you like the most !!</lable><br />
    <input type = "radio" name = "answer3" value= "Comedy" onChange={this.answerSelected} />Comedy<br/>
    <input type = "radio" name = "answer3" value= "Action" onChange={this.answerSelected} />Action<br/>
    <input type = "radio" name = "answer3" value= "Ghost " onChange={this.answerSelected} />Ghost<br/>
    </div>
    <input className="feedback-button" type="submit" value = "submit" />
    </form>
    </div>

  }else if (this.state.isSubmitted === true && this.state.studentName !== '') {
    studentName = <h1>Thanks,{this.state.studentName}</h1>
  }

    return(
      <div>
        {studentName}
        -----------------------------------------------------------------
        {questions}

      </div>
    );
  }
}

export default Usurvey;
