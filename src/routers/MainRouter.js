import React from 'react';
import { Route, Switch,  Router, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainStu from '../components/mainStudents.component/mainStudents.component'
import Login from '../components/login.component/login.component';
import TeachersApp from '../components/teachers.component/teachers.component';
import QuizandtimerWrap from '../components/quizandtimerWrap.component/quizandtimerWrap.component';
import PrivatRoute from './PrivatRoute';
import PublicRoute from './PublicRoute';
 import studentQuizDeshboard from '../components/studentQuizDeshboard.component/studentQuizDeshboard.component';
import Results from '../components/results.component/results.component'



export const history = createBrowserHistory();

const MainRouter = () => (
    <Router history={history}>
        <div className="wrap">
            <Switch>
            <PublicRoute path="/" component={MainStu} exact={true} />
                <Route path="/quiz" exact={true} component={MainStu}  />
                <Route path="/quiz/:quizId" exact={true} component={QuizandtimerWrap}/>} />
                <PrivatRoute path="/teachers" component={TeachersApp}  />
                <PublicRoute path="/login" component={Login}  />
                <Route path="/results" exact={true} component={Results}  />
            </Switch>
        </div>
    </Router>
);


export default MainRouter;


