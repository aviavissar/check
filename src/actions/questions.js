import database from '../firebase/firebase';


// ADD_QUIZ
export const addQuiz = (quizes) => ({
  type: 'ADD_QUIZ',
  quizes
});

export const startAddQuiz = (quizData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //const uid = "a1a2b3";
    database.ref(`users/${uid}/quizes`).push(quizData).then((ref) => {
      dispatch(addQuiz({
        id: ref.key,
        ...quizData
      }));
    })
  };
};

// REMOVE_QUIZ
export const removeQuiz = ({ id } = {}) => ({
  type: 'REMOVE_QUIZ',
  id
});

export const startRemoveQuiz = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // const uid = "a1a2b3";
    console.log("sssdssds " + uid + "  " + id);
    database.ref(`users/${uid}/quizes/${id}`).remove().then(() => {
      dispatch(removeQuiz({ id }));
    });
  };
};


export const setQuizes = (quizes) => ({
  type: 'SET_QUIZES',
  quizes
})


export const startSetTeachersQuizs = () => {
  return (dispatch, getState) => {
    //const uid = "a1a2b3";
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/quizes`).once('value').then((snapshot) => {
      const quizes = [];
      snapshot.forEach((ch) => {
        quizes.push({
          id: ch.key,
          ...ch.val()
        });
      });
      // console.log(quizes)
      dispatch(setQuizes(quizes));
    });
  };
};

export const setStQuizes = (quizes) => ({
  type: 'SET_ST_QUIZES',
  quizes
})


export const startSetStudentQuizs = () => {

  return (dispatch) => {
    return database.ref(`users/`).once('value').then(users => {
      let allQuizes = []

      users.forEach((ids) => {
        ids.forEach(quiz => {
          allQuizes = allQuizes.concat(Object.values(quiz.val()))
        })
      })

      //  console.log(allQuizes);
      dispatch(setStQuizes(allQuizes));
    })
  };
};


export const setQuizId = (qid) => {
  return {
    type: 'SET_QUIZ_ID',
    qid
  };
}


// EDIT_QUIZ
export const editQuiz = (id, updates) => ({
  type: 'EDIT_QUIZ',
  id,
  updates
});

export const startEditQuiz = (id, updates) => {

  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // const uid = "a1a2b3";
    database.ref(`users/${uid}/quizes/${id}`).update(updates).then(() => {
      dispatch(editQuiz(id, updates));
    });
  };
};