import getRandomNumber from '../utils/getRandomNumber';
import { handleErrors } from './errorsAction';

export const clearTest = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_TEST_ONE'
        });
    }
}

export const getTest = (firestore, category, numberOfWords) => {
    return async dispatch => {
        dispatch({
            type: 'REMOVE_TEST_ONE_DATA'
        });
        dispatch({
            type: 'LOADING_TEST_ONE',
            data: true
        });

        let number = numberOfWords;

        if (!numberOfWords && category.split('?')[0] !== 'saved') {
            const numberFromFirestore = await firestore.collection('settings').doc('counters').get();
            dispatch({
                type: 'SET_NUMBER_OF_WORDS_TEST_ONE',
                data: numberFromFirestore.data()[category]
            });
            number = numberFromFirestore.data()[category]
        }

        switch(category) {
            case 'letter':
                return dispatch(getLetter(firestore));
            case 'verb':
                return dispatch(getVerb(firestore, number));
            case 'adjective':
                return dispatch(getAdjective(firestore, number));
            case (category.match(/saved/) || {}).input:
                return dispatch(getSaved(firestore, category.split('=')[1]));
            default: window.location.href = '/404';
        }
    }
}

export const getLetter = (firestore) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('letters').doc(getRandomNumber(40)).get();

            dispatch({
                type: 'UPDATE_TEST_ONE_DATA',
                data: doc.data()
            });
            dispatch({
                type: 'SET_EXP_TEST_ONE',
                data: 1
            });
            dispatch({
                type: 'LOADING_TEST_ONE',
                data: false
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getVerb = (firestore, numberOfWords) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('verbs').doc(getRandomNumber(numberOfWords)).get();

            dispatch({
                type: 'UPDATE_TEST_ONE_DATA',
                data: doc.data()
            });
            dispatch({
                type: 'SET_EXP_TEST_ONE',
                data: 5
            });
            dispatch({
                type: 'LOADING_TEST_ONE',
                data: false
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getAdjective = (firestore, numberOfWords) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('adjectives').doc(getRandomNumber(numberOfWords)).get();

            dispatch({
                type: 'UPDATE_TEST_ONE_DATA',
                data: doc.data()
            });
            dispatch({
                type: 'SET_EXP_TEST_ONE',
                data: 5
            });
            dispatch({
                type: 'LOADING_TEST_ONE',
                data: false
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getSaved = (firestore, type) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).get().then(doc => {
                    const savedInfo = doc.data().saved;
                    firestore.collection('users').doc(user.uid).collection(type).doc(getRandomNumber(savedInfo[type])).get().then(doc => {
                        if (doc.exists) {
                            dispatch({
                                type: 'UPDATE_TEST_ONE_DATA',
                                data: doc.data()
                            });
                            dispatch({
                                type: 'SET_EXP_TEST_ONE',
                                data: 5
                            });
                            dispatch({
                                type: 'LOADING_TEST_ONE',
                                data: false
                            });
                        } else {
                            window.location.href = '/404';
                        }
                    })
                }).catch(err => {
                    dispatch(handleErrors(err));
                })
            } else {
                window.location.href = '/';
            }
        });
    }
}