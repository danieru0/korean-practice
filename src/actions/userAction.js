import { toast } from 'react-toastify';

export const giveExpAndAnswers = (firestore, expAmount) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        
        dispatch({
            type: 'UPDATE_USER_EXP_ANSWER',
            data: 'loading'
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).update({
                    'exp': firebase.firestore.FieldValue.increment(expAmount),
                    'answers': firebase.firestore.FieldValue.increment(1)
                }).then(() => {
                    dispatch({
                        type: 'UPDATE_USER_EXP_ANSWER',
                        data: true
                    });
                    toast.success(`Good job! <3 You got: ${expAmount}exp`);
                }).catch(err => {
                    throw err;
                })
            } else {
                dispatch({
                    type: 'UPDATE_USER_EXP_ANSWER',
                    data: true
                });
                toast.success('Good job! <3');
            }
        })
    }
}

export const clearUserExpAnswerStatus = () => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_USER_EXP_ANSWER',
            data: false
        });
    }
}