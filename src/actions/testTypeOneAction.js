import getRandomNumber from '../utils/getRandomNumber';
import { handleErrors } from './errorsAction';

export const clearTest = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_TEST_ONE'
        });
    }
}

export const getTest = (firestore, category) => {
    return async (dispatch, getState) => {
        dispatch({
            type: 'REMOVE_TEST_ONE_DATA'
        });
        dispatch({
            type: 'LOADING_TEST_ONE',
            data: true
        });

        const {counters} = getState().settingsReducer;

        switch(category) {
            case 'letter':
                return dispatch(getLetter(firestore));
            case 'verb':
                return dispatch(getVerb(firestore, counters[category]));
            case 'adjective':
                return dispatch(getAdjective(firestore, counters[category]));
            case 'nouns':
                return dispatch(getNouns(firestore, counters[category]));
            case (category.match(/saved/) || {}).input:
                return dispatch(getSaved(firestore, category.split('=')[1]));
            case 'adverbs':
                return dispatch(getAdverbs(firestore, counters[category]));
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

export const getNouns = (firestore, numberOfWords) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('nouns').doc(getRandomNumber(numberOfWords)).get();

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

export const getAdverbs = (firestore, numberOfWords) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('adverbs').doc(getRandomNumber(numberOfWords)).get();

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