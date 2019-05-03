import React from 'react';
import HeaderComponent from "../header.component/header.component"
import CreateQuiz from '../createQuiz.component/createQuiz.component'
import TeacherQuizes from '../teacherQuizes.component/teacherQuizes.component';



export class TeachersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
           "quizToEdit":{}
        }
    }

   
    render(){
        return <div   key="teacher">
           
          <HeaderComponent></HeaderComponent>
             <div className="teachers">
             <div className="create-quiz"><CreateQuiz onQuizOperationDone={this.onQuizOperationDone} quizToEdit={this.state.quizToEdit} newquiz={true} ableBt={this.disableBt}></CreateQuiz></div>
             <div className="my-quizs"> <TeacherQuizes onEdit={this.onEdit} ableBt={this.state.ableBtaa} history={this.props.history}></TeacherQuizes></div>
             </div>
           
             
          </div>
    }

    onEdit = (quiz) => {
      
        this.setState({quizToEdit:quiz});
      
    }

    onQuizOperationDone = () => {
       
        this.setState({quizToEdit:{}}); 
    }
    disableBt = (bool) => {
   
        this.setState({ableBtaa:bool});
      
    }
    
}
 
  export default TeachersComponent;
  