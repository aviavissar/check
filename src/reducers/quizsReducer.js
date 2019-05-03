// Expenses Reducer

const quizesReducer = [];

export default (state = quizesReducer, action) => {
  switch (action.type) {
    case 'ADD_QUIZ':
      return [
        ...state,
        action.quizes
      ];
    
    case 'REMOVE_QUIZ':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_QUIZ':
      return state.map((quiz) => {
        if (quiz.id === action.id) {
          return {
            ...quiz,
            ...action.updates,
          }

        } else {
          return quiz;
        };
      });
    case 'SET_QUIZES':
      return action.quizes;
     
    case 'SET_ST_QUIZES':
   
      return action.quizes;
    default:
      return state;
  }
};
