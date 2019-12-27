import getRandomNumber from '../utils/getRandomNumber';
import { handleErrors } from './errorsAction';

export const clearTest = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_TEST_TWO'
        });
    }
}

export const getTest = (firestore, category) => {
    return async (dispatch, getState) => {
        dispatch({
            type: 'REMOVE_TEST_TWO_DATA'
        });
        dispatch({
            type: 'LOADING_TEST_TWO',
            data: true
        });

        const {counters} = getState().settingsReducer;

        switch(category) {
            case (category.match(/tense/) || {}).input:
                return dispatch(getTense(category, firestore, counters[category]));
            default: window.location.href ='/404';
        }
    }
}

export const getTense = (category, firestore, counters) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection(category).doc(getRandomNumber(counters)).get();
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