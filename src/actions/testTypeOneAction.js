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
                return dispatch(getData(firestore, 'letters', 40, 'Letter', 'Translate this letter', 0.5));
            case 'verb':
                return dispatch(getData(firestore, 'verbs', counters[category], 'Verb', 'Translate this verb'));
            case 'adjective':
                return dispatch(getData(firestore, 'adjectives', counters[category], 'Adjective', 'Translate this adjective'));
            case 'nouns':
                return dispatch(getData(firestore, 'nouns', counters[category], 'Noun', 'Translate this noun'));
            case (category.match(/saved/) || {}).input:
                return dispatch(getSaved(firestore, category.split('=')[1]));
            case 'adverbs':
                return dispatch(getData(firestore, 'adverbs', counters[category], 'Adverb', 'Translate this adverb'));
            case (category.match(/numbers/) || {}).input:
                return dispatch(getData(firestore, category.split('=')[1], counters[category.split('=')[1]], 'Number', 'Translate this number', 1));
            default: window.location.href = '/404';
        }
    }
}

export const getData = (firestore, type, counter, title, task, exp) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection(type).doc(getRandomNumber(counter)).get();

            dispatch({
                type: 'UPDATE_TEST_ONE_DATA',
                data: doc.data(),
                title: title,
                task: task
            });
            dispatch({
                type: 'SET_EXP_TEST_ONE',
                data: exp || 5
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
                                data: doc.data(),
                                title: `${type}`,
                                task: `Translate this ${type}`
                            });
                            dispatch({
                                type: 'SET_EXP_TEST_ONE',
                                data: 0.5
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