import React from 'react';
import { startRemoveQuiz, startEditQuiz, setQuizId } from '../../actions/questions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectQuizes from '../../selectors/quizes';
import AlertModal from '../alertModal.component/alertModal.component'

export class teacherQuizesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.ins;
    this.shouldMakeChange = true;
    this.removeQuiz = this.removeQuiz.bind(this);
    this.state = {
      "quizIdedit": "-LZkjiVxsKQGFElebH14",
      Alertmodal: false,
      isOpen: false,
      remove: false
    }

    this.props.setQuizId(this.state.quizIdedit);

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.shouldMakeChange) {
      this.shouldMakeChange = false;

      this.setState({
        ableBt: this.props.ableBt
      }, () => {
        this.shouldMakeChange = true;
      });
    }
  }
  handleClearSelectedOption = () => {
    this.setState({ isOpen: false });

  }
  handleRemove = (idr) => {
    this.setState({ isOpen: false })
    this.props.startRemoveQuiz({ "id": idr });
  }
  removeQuiz = (idr) => {
    this.setState({
      Alertmodal: true,
      isOpen: true,
      textalert: 'אתה עומד למחוק בוחן מהמערכת התהליך בלתי הפיך האם אתה בטוח?'
    });
  }

  editQuiz = (qid) => {
    const quizToedit = this.props.quizes.find((quiz) => quiz.id === qid);
    this.props.onEdit(quizToedit);
  }

  render() {
    return (

      <div className="teacherQuizes">
        <h2>הבחנים שלי</h2>
        {
          (this.state.QuizsArray === "0") ? (
            <div>אין בחנים</div>
          ) : (

              this.props.quizes.map((qu, index) => {
                return <article key={index}>
                  <div>
                    <h3>{qu.quizname}</h3>
                  </div>
                  <div className="wrapbutton">
                    <button className="button red" key={qu.id} onClick={() => this.removeQuiz()} >מחק בוחן</button>
                    <button disabled={this.state.ableBt} className="button" key={index + "edit"} onClick={() => { this.editQuiz(qu.id) }}>ערוך בוחן</button>
                    <Link className="button" to={`/quiz/${index}`} key={`/quiz/${index}`}>צפה בבוחן </Link>
                  </div>
                  {
                    this.state.Alertmodal ? <AlertModal isOpen={this.state.isOpen} what={false} colortext="textred" handleRemove={() => { this.handleRemove(qu.id) }} handleClearSelectedOption={this.handleClearSelectedOption} textalert={this.state.textalert}></AlertModal> : null
                  }

                </article>
              })

            )
        }
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({

  dispatch: action => action,
  setQuizId: (qid) => dispatch(setQuizId(qid)),
  startEditQuiz: (quizToeditId, quizToedit) => dispatch(startEditQuiz(quizToeditId, quizToedit)),
  startRemoveQuiz: (obj) => dispatch(startRemoveQuiz(obj))
});

const mapStateToProps = (state, props) => {
  return {
    quizes: selectQuizes(state.quizes)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(teacherQuizesComponent);
