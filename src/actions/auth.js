import database from '../firebase/firebase';

import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return (dispatch) => {
        firebase.auth().signOut();
        dispatch(logout())
        return dispatch(logout())
    };

};


export const setTeacherName = (name) => ({
    type: 'SET_NAME',
    name:name[0].teachername
})

export const startSetTeacherName = () => {
   
    return (dispatch, getState) => {

        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/quizes`).once('value').then((snapshot) => {
           
            const quizes = [];
            snapshot.forEach((ch) => {
                quizes.push({
                    id: ch.key,
                    ...ch.val()
                });
            });
           // snapshot[0].teachername
        //   console.log("hi "+quizes[0].teachername)
     //    const name=quizes[0].teachername;
          dispatch(setTeacherName(quizes));
           
        })
    };
};