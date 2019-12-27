import getRandomNumber from '../utils/getRandomNumber';
import * as hangul from 'hangul-js';
import { handleErrors } from './errorsAction';

export const getExplanation = (firestore, category) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection(category).doc('explanation').get();
            if (!doc.exists) {
                throw new Error('404');
            }
            dispatch({
                type: 'UPDATE_EXPLANATION',
                data: doc.data()
            });
        } catch (err) {
            dispatch(handleErrors(err, 'conjugation-explanation'));
        }
    }
}

export const getRandomConjugatedWord = (firestore, category) => {
    return async (dispatch, getState) => {
        const {counters} = getState().settingsReducer;

        dispatch({
            type: 'UPDATE_LOADING_WORD',
            data: true
        });

        try {
            const doc = await firestore.collection(category).doc(getRandomNumber(counters[category])).get();
            
            if (!doc.exists) {
                switch(category) {
                    case (category.match(/ida/) || {}).input:
                        return dispatch(getIda(firestore, category, counters));
                    default: window.location.href = '/404';
                }
                return;
            }

            const word = await doc.data().word.get();

            dispatch({
                type: 'UPDATE_CONJUGATED_WORD',
                data: doc.data()
            });
            dispatch({
                type: 'UPDATE_WORD',
                data: word.data()
            });
            dispatch({
                type: 'UPDATE_LOADING_WORD',
                data: false
            });

        } catch (err) {
            dispatch({
                type: 'UPDATE_LOADING_WORD',
                data: true
            });
            dispatch(handleErrors(err));
        }
    }
}

export const clearConjugation = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_ALL_CONJUGATIONS'
        })
    }
}

export const getIda = (firestore, category, counters) => {
    return async dispatch => {
        try {

            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();
            const conjugation = await firestore.collection(category).doc('conjugation').get();
            
            let nounArray = hangul.disassemble(randomNoun.data().korean);
            let isVowel = hangul.isConsonant(nounArray[nounArray.length - 1]) ? false : true

            const conjugatedWords = {
                1: `${randomNoun.data().korean}${isVowel ? conjugation.data()[5] : conjugation.data()[1]}`,
                2: `${randomNoun.data().korean}${isVowel ? conjugation.data()[6] : conjugation.data()[2]}`,
                3: `${randomNoun.data().korean}${isVowel ? conjugation.data()[7] : conjugation.data()[3]}`,
                4: `${randomNoun.data().korean}${isVowel ? conjugation.data()[8] : conjugation.data()[4]}`,
                info: {
                    irregular: 0,
                    breakpoint: randomNoun.data().korean.length
                }
            }

            dispatch({
                type: 'UPDATE_CONJUGATED_WORD',
                data: conjugatedWords
            });
            dispatch({
                type: 'UPDATE_WORD',
                data: {...randomNoun.data(), stem: randomNoun.data().korean}
            });
            dispatch({
                type: 'UPDATE_LOADING_WORD',
                data: false
            });
        } catch (err) {
            throw err;
        }
    }
}