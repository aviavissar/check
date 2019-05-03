import React from 'react';
import { startSetStudentQuizs } from '../../actions/questions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectQuizes from '../../selectors/quizes';

export class StudentQuizDeshboardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.shouldMakeChange = false;
    console.log(this.props.squizes);
    Promise.all([this.props.startSetStudentQuizs()]);
    this.teacherName;
  }

  render() {
    return (
      <div>
        <h1>רשימת הבחנים</h1>
        <div className="bold tableWrapIn">
          <div>כניסה למבחן</div>
          <div className="teachercol">המרצה</div>
          <div>שם המבחן</div>
          <div className="numline">#</div>
        </div>
        <hr className="hrb" />
        <div>
          {
            this.props.squizes.map((av, index) => {
              return (
                <div className="tableWrapIn" key={`/tableWrapIn/${index}`}>
                  <div key={`/ent/${index}`}><Link to={`/quiz/${index}`} key={`/quiz/${index}`}>כניסה למבחן</Link></div>
                  <div className="teachercol" key={`/namet/${index}`}>{av.teachername} </div>
                  <div key={`/quizname/${index}`}>{av.quizname}</div>
                  <div className="numline" key={`/index/${index}`}>{index + 1}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetStudentQuizs: () => dispatch(startSetStudentQuizs())
});

const mapStateToProps = (state, props) => {
  return {
    squizes: state.quizes
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentQuizDeshboardComponent);