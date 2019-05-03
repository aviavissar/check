import React from 'react';
import { connect } from 'react-redux';
import { startAddQuiz, startEditQuiz } from '../../actions/questions';
import AlertModal from '../alertModal.component/alertModal.component'


export class CreateQuizComponent extends React.Component {
    constructor(props) {
        super(props);
        this.flg = false;
        this.shouldMakeChange = true;
        this.state = {
            value: '',
            quizname: '',
            buttonTag: 'צור בוחן',
            Alertmodal: false,
            isOpen: false,
            click: false,
            inputs: {}
            
        };
        this.questionsArry = [];
        this.initializeQuiz(5);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.shouldResetInputsToDefaultValues = false;
        this.flff=true;
    }

    initializeQuiz = (qu = 16, e) => {

        for (var i = 1; i <= qu; i++) {
            this.questionsArry.push({
                'questionNumber': i,
                'questionText': "",
                'questionOptions': [{
                    'optionText': "",
                    'optionScore': 0
                }, {
                    'optionText': "",
                    'optionScore': 0
                }, {
                    'optionText': "",
                    'optionScore': 0
                }, {
                    'optionText': "",
                    'optionScore': 0
                }
                ]
            });
        }
        return this.questionsArry;
    }

    ableBt = (bool) => {
        this.props.ableBt(bool);
    }


    componentDidUpdate = (prevProps, prevState) => {
        const doesQuizExist = !!Object.keys(this.props.quizToEdit).length;
        const prevPropsId = prevProps && prevProps.quizToEdit && prevProps.quizToEdit.id;
        const currentPropsId = this.props.quizToEdit.id;
        let didTestChange = false;
        if ((currentPropsId !== prevPropsId)) {
            didTestChange = true;
          
        }
        if (this.shouldMakeChange && doesQuizExist && didTestChange) {
            this.shouldMakeChange = false;
           
            this.setState({
                quizname: this.props.quizToEdit.quizname,
                quizid: this.props.quizToEdit.id,
                quizQuestions: this.props.quizToEdit.quizcontent.questions,
                buttonTag: 'ערוך בוחן',
            }, () => {
                this.shouldMakeChange = true;
               
            });
        }

    }

    handleInputChange = (event) => {
        this.ableBt(true)
        this.setState({
            inputs: {
                ...this.state.inputs,
                [event.target.id]: event.target.value
            }
        });
    }

    handleClearSelectedOption = () => {
        this.setState({ isOpen: false })
    }

    craeteQuiz = (e) => {
        e.preventDefault();
        this.state.click = true
        this.newQuizObj = {
            'quizname': document.getElementById("inputQuizName").value,
            'quizcontent': {
                "questions": this.questionsArry.map((qu, inx) => {
                    if (true) {
                        return {
                            'questionNumber': inx,
                            'questionText': document.getElementById("qu" + inx).value,
                            'questionOptions': qu.questionOptions.map((an, index) =>
                                (
                                    {
                                        'optionText': document.getElementById(inx + "answer" + index).value,
                                        'optionScore': document.getElementById(inx + "score" + index).value
                                    }
                                )
                            )
                        }
                    }
                }),

                "results": [
                    {
                        "startFrom": 0,
                        "endAt": this.questionsArry.length * 1,
                        "text": " חייב להשתפר :("
                    },
                    {
                        "startFrom": this.questionsArry.length * 1 + 1,
                        "endAt": this.questionsArry.length * 2,
                        "text": "לא רע אבל יש עוד מה ללמוד  :|"
                    },
                    {
                        "startFrom": this.questionsArry.length * 2 + 1,
                        "endAt": this.questionsArry.length * 3,
                        "text": "טוב מאוד אבל יש עוד מה ללמוד  :)"
                    },
                    {
                        "startFrom": this.questionsArry.length * 3 + 1,
                        "endAt": this.questionsArry.length * 4,
                        "text": "מצויין נראה שהבנת את החומר  :-)"
                    }
                ]
            },
            teachername:'מאקטיב דירקטורי'

        };

        let textalert;
        if(this.isNewQuiz) {
            this.props.startAddQuiz(this.newQuizObj)
            textalert = 'הבוחן נוצר בהצלחה';
        }
        else {
            this.props.startEditQuiz(this.props.quizToEdit.id, this.newQuizObj);
            this.props.onQuizOperationDone();
            textalert = 'הבוחן נערך ונשמר בהצלחה';
        }
        this.ableBt(false)
        this.setState({
            Alertmodal: true,
            isOpen: true,
            textalert,
            inputs: {},
            quizQuestions: [],
            quizid: "",
            quizname: "",
        });
    }

    get isNewQuiz() {
        return !Object.keys(this.props.quizToEdit).length;
    }

    isString = (value) => {
        return typeof value === "string";
    }

    getquizQuestions = (inx, ident, index) => {
        const { inputs } = this.state;
        let value;
        let stateInput;
        if (this.state.quizQuestions == undefined) {
            return;
        }

        else {
            switch (ident) {
                case 'quizname':
              
                    value = this.isString(inputs.inputQuizName) ? inputs.inputQuizName :  this.state.quizname;
                    return value;
                case 'qu':
                    const questionText = this.state.quizQuestions[inx] && this.state.quizQuestions[inx].questionText
                    stateInput = this.state.inputs[ident + inx];
                    value = this.isString(stateInput) ? stateInput : (questionText || "");
                    return value;
                case 'score':
                    const optionScore = this.state.quizQuestions[inx] && this.state.quizQuestions[inx].questionOptions[index].optionScore;
                    stateInput = this.state.inputs[inx + ident + index];
                    value = this.isString(stateInput) ? stateInput : (optionScore || "");
                    return value;
                case 'answer':
                    const optionText = this.state.quizQuestions[inx] && this.state.quizQuestions[inx].questionOptions[index].optionText
                    stateInput = this.state.inputs[inx + ident + index];
                    value = this.isString(stateInput) ? stateInput : (optionText || "");
                    return value;
            }
        }
    }

    render() {
        return (<div className="wrapQ " key="sdsg">
            <form key="form" name="frm" onSubmit={this.craeteQuiz}>
                <h2>טופס יצירת / עידכון בוחן</h2>
                <div id="quizname">
                    <input id="inputQuizName" name="quizname" type='text' placeholder="שם הבוחן" required
                        value={this.getquizQuestions(0, "quizname", 0)}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="name">
                    {
                        this.questionsArry.map((qu, inx) => {
                            return <div style={{ paddingTop: 10 + 'px' }} key={"2div" + inx}>
                                <input type='text'
                                    className="qus"
                                    required
                                    id={"qu" + inx}
                                    name={"qu" + inx}
                                    key={"qu" + inx}
                                    placeholder="הקלד שאלה"
                                    value={this.getquizQuestions(inx, "qu", inx)}
                                    onChange={this.handleInputChange}
                                />
                                <span>.{inx + 1}</span>
                                {
                                    qu.questionOptions.map((an, index) => {
                                        return <div key={index + an.optionText + an.optionScore} className="answer">
                                            <input type="number" max="4" min="0" className="points" required
                                                id={inx + "score" + index}
                                                name={inx + "score" + index}
                                                key={qu.questionNumber + "score" + index}
                                                value={this.getquizQuestions(inx, "score", index)}
                                                placeholder="0-4"
                                                onChange={this.handleInputChange}
                                            />
                                            <input type="text" id={inx + "answer" + index} key={inx + "answer" + index}
                                                viv="answer" name={inx + "answer" + index} className="ans" placeholder="הקלד תשובה" required
                                                value={this.getquizQuestions(inx, "answer", index)}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <button name="creatBt" className="button creatBt">{this.isNewQuiz ? "צור בוחן" : "ערוך בוחן"}</button>
                {
                    this.state.Alertmodal ? <AlertModal isOpen={this.state.isOpen} what={true} handleClearSelectedOption={this.handleClearSelectedOption} textalert={this.state.textalert}></AlertModal> : console.log(this.state.isOpen)
                }

            </form>
        </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({

    startAddQuiz: (quiz) => dispatch(startAddQuiz(quiz)),
    startEditQuiz: (quid, qu) => dispatch(startEditQuiz(quid, qu))
});

export default connect(undefined, mapDispatchToProps)(CreateQuizComponent);