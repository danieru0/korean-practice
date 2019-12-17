import getRandomNumber from '../utils/getRandomNumber';
import { handleErrors } from './errorsAction';

export const clearTest = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_TEST_TWO'
        });
    }
}

export const getTest = (firestore, category, numberOfWords) => {
    return async dispatch => {
        dispatch({
            type: 'REMOVE_TEST_TWO_DATA'
        });
        dispatch({
            type: 'LOADING_TEST_TWO',
            data: true
        });

        let number = numberOfWords;

        if (!numberOfWords) {
            const numberFromFirestore = await firestore.collection('settings').doc('counters').get();
            dispatch({
                type: 'SET_NUMBER_OF_WORDS_TEST_TWO',
                data: numberFromFirestore.data()[category]
            });
            number = numberFromFirestore.data()[category]
        }

        switch(category) {
            case (category.match(/tense/) || {}).input:
                return dispatch(getTense(category, firestore, number));
            default: window.location.href ='/404';
        }
    }
}

export const getTense = (category, firestore, numberOfWords) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection(category).doc(getRandomNumber(numberOfWords)).get();
            const word = await doc.data().word.get();

            dispatch({
                type: 'UPDATE_TEST_TWO_DATA',
                data: [doc.data(), word.data()]
            });
            dispatch({
                type: 'SET_EXP_TEST_TWO',
                data: 5
            });
            dispatch({
                type: 'LOADING_TEST_TWO',
                data: false
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}