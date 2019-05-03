import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/MainRouter';
import { startSetTeachersQuizs } from './actions/questions';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import './styles/styles.scss';
import LoadingPage from '../src/components/LoadingPage.component/LoadingPage'


const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};


ReactDOM.render(<LoadingPage/>, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    
    store.dispatch(startSetTeachersQuizs()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/teachers');
      }
    });
  } else {
    history.push('/quiz');
    store.dispatch(logout());
   renderApp();
   
  }
});
