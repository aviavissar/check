import React from 'react';
import { startSetStudentQuizs, startResults, studentsReduser } from '../../actions/questions'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";


export class StudentsQuizComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "quizname": "",
            "quizQuestions": [],
            "quizNumber": this.props.quizNumber,
            "QuizsArray": this.props.startSetStudentQuizs()
        };
        this.score = 0;
        this.index = 0;
        this.currentAnswerIndex = 0;
        this.createQuizArray();
        this.indx = 0;
    }

    createQuizArray = () => {
        Promise.all([this.props.startSetStudentQuizs()]).then((values) => {

            this.QuizsArray = this.props.quizes;
            this.setState({ "quizQuestions": this.QuizsArray[this.state.quizNumber].quizcontent.questions });
            this.setState({ "quizResults": this.QuizsArray[this.state.quizNumber].quizcontent.results });
            this.setState({ quizname: this.QuizsArray[this.state.quizNumber].quizname });
        });
    }

    onAnswerChoose = () => {
        if ($('input[viv=answer]:checked').length === 0) {
            alert("You must choose an answer");
            return;
        }
        this.currentAnswerIndex++;
        if (this.currentAnswerIndex > this.state.quizQuestions[0].questionOptions.length) {
            this.checkeWhatChoose();
            this.doCalcu();
            return;
        }
        this.checkeWhatChoose();
        if (this.currentAnswerIndex < 5) {
            this.arrangeData();
        }
    }

    doCalcu = () => {
        if (this.score >= 0 && this.score <= this.state.quizQuestions.length * 1) {
            this.results = this.state.quizResults[0].text;
        }
        else if (this.score >= this.state.quizQuestions.length * 1 + 1 && this.score <= this.state.quizQuestions.length * 2) {
            this.results = this.state.quizResults[1].text;
        }
        else if (this.score >= this.state.quizQuestions.length * 2 + 1 && this.score <= this.state.quizQuestions.length * 3) {
            this.results = this.state.quizResults[2].text;
        }
        else if (this.score >= this.state.quizQuestions.length * 3 + 1 && this.score <= this.state.quizQuestions.length * 4) {
            this.results = this.state.quizResults[3].text;
        }

        this.setState({ "stoptimer": true })
        this.setState({ "results": this.results });
        this.props.history.push({
            pathname: '/results',
            state: { detail: this.results, score: this.score, numqus: this.state.quizQuestions.length ,mytime:this.props.mytime }
        })
    }

    checkeWhatChoose = () => {
        console.log("aaa")
        if (document.getElementById('answer0').checked) {
            this.scorePoints('answer0');
        } else if (document.getElementById('answer1').checked) {
            this.scorePoints('answer1');
        }
        else if (document.getElementById('answer2').checked) {
            this.scorePoints('answer2');
        }
        else if (document.getElementById('answer3').checked) {
            this.scorePoints('answer3');
        }
    }
    scorePoints = (id) => {
        this.score += parseInt(document.getElementById(id).value);
    }

    arrangeData = () => {
        this.currentQuestion = this.state.quizQuestions[this.currentAnswerIndex];
        this.setState({ "questionOptions": this.shuffle(this.currentQuestion.questionOptions) });
        this.questionText = this.currentQuestion.questionText;
        this.onAnswerChoose()

    }
    shuffle = (arra1) => {
        var ctr = arra1.length, temp, index;
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }


    render() {
        return (
            <div className="quiz" >
                <h2>{this.state.quizname}</h2>
                <div className="question">
                    {
                        this.state.quizQuestions.map((qu) => {
                            return <div className="qusBlock" key={qu.questionNumber + qu.questionText}>
                                {qu.questionNumber + 1 + " .  " + qu.questionText}
                                {
                                    qu.questionOptions.map((an, index) => {
                                        return <div key={an.optionText + an.optionScore} className="answer">
                                            <input type="radio" id={'answer' + index} key={an.optionText + an.optionScore} viv="answer" name={qu.questionText} value={an.optionScore} /> {an.optionText}
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <div className="quiz_bt" ><button className="button" onClick={this.onAnswerChoose}>OK</button></div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    startSetStudentQuizs: () => dispatch(startSetStudentQuizs())
});

const mapStateToProps = (state) => {
    return {
        quizes: state.quizes
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentsQuizComponent));
