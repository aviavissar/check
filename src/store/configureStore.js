import { createStore, combineReducers ,applyMiddleware, compose} from 'redux';
import quizesReducer from '../reducers/quizsReducer';
//import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';
import authReducr from '../reducers/auth'

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export default () => {
    const store = createStore(
      combineReducers({
      quizes: quizesReducer,
      //  filters: filtersReducer,
        auth:authReducr
      }),
      composeEnhancers(applyMiddleware(thunk))
    );
  
    return store;
  };
  