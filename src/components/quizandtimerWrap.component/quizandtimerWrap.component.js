import React, { Component } from 'react'
import StudentQuiz from '../studentsQuiz.component/studentsQuiz.component'

import ms from 'pretty-ms';
import Header from '../header.component/header.component'


export class QuizandtimerWrapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      "quizNumber": props.match.params.quizId
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)

  }
  componentDidMount() {
    this.state.time == 0 ? this.startTimer() : null
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1000);
  }
  stopTimer() {
    this.setState({ isOn: false })
   // this.props.addStudentResults(ms(this.state.time));
    clearInterval(this.timer)

  }
  resetTimer() {
    this.setState({ time: 0, isOn: false })
  }
  componentWillUnmount() {
    this.stopTimer();
  }
  render() {

    return (
      <div >
        <Header></Header>
        <h3 className="clock">{ms(this.state.time)}</h3>

        <StudentQuiz mytime={ms(this.state.time)} quizNumber={this.state.quizNumber} ></StudentQuiz>
      </div>
    )
  }
}

export default QuizandtimerWrapComponent;
