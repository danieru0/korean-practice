import getRandomNumber from '../utils/getRandomNumber';
import * as hangul from 'hangul-js';
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
            case 'past-tense':
                return dispatch(getTense(category, firestore, counters[category]));
            case 'present-tense':
                return dispatch(getTense(category, firestore, counters[category]));
            case 'future-tense-1':
                return dispatch(getTense(category, firestore, counters[category]));
            case 'future-tense-2':
                return dispatch(getFutureTenseTwo(category, firestore, counters));
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

export const getFutureTenseTwo = (category, firestore, counters) => {
    return async dispatch => {
        try {
            const randomVerb = await firestore.collection('verbs').doc(getRandomNumber(counters.verb)).get();
            const conjugation = await firestore.collection(category).doc('conjugation').get();

            let verbArray = hangul.disassemble(randomVerb.data().korean);
            let irregular = 0;
            verbArray.splice(verbArray.length - 2, verbArray.length);

            switch(verbArray[verbArray.length - 1]) {
                case 'ㅅ':
                    verbArray.pop();
                    verbArray.push('을');
                    irregular = 1;
                    break;
                case 'ㄷ':
                    verbArray[verbArray.length - 1] = 'ㄹ';
                    verbArray.push('을');
                    irregular = 2;
                    break;
                case 'ㅂ':
                    verbArray[verbArray.length - 1] = '울';
                    irregular = 3;
                    break;
                case 'ㄹ':
                    irregular = 6;
                    break;
                default: break;
            }


            const isVowel = hangul.isConsonant(verbArray[verbArray.length - 1]) ? false : true
            if (irregular === 0) {
                if (isVowel) {
                    verbArray.push('ㄹ');
                } else {
                    verbArray.push('을');
                }
            }

            verbArray = hangul.assemble(verbArray);

            const conjugatedWords = {
                1: `${verbArray} ${conjugation.data()[1]}`,
                2: `${verbArray} ${conjugation.data()[2]}`,
                3: `${verbArray} ${conjugation.data()[3]}`,
                4: `${verbArray} ${conjugation.data()[4]}`,
                info: {
                    breakpoint: randomVerb.data().korean.length - 2,
                    irregular: irregular,
                }
            }

            dispatch({
                type: 'UPDATE_TEST_TWO_DATA',
                data: [conjugatedWords, randomVerb.data()]
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