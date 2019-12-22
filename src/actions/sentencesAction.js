import getRandomNumber from '../utils/getRandomNumber';
import * as hangul from 'hangul-js';
import { handleErrors } from './errorsAction';

export const getSentenceData = (firestore, category, counters) => {
    return async dispatch => {
        dispatch({
            type: 'MAIN_LOADER_SHOW'
        });

        if (!counters) {
            try {
                const countersData = await firestore.collection('settings').doc('counters').get();
                dispatch({
                    type: 'UPDATE_SENTENCES_COUNTERS',
                    data: countersData.data()
                })
                counters = countersData.data();
            } catch (err) {
                dispatch(handleErrors(err));
            }
        }
        switch(category) {
            case 'to-have':
                dispatch(getToHave(firestore, counters));
                break;
            case 'describe-nouns':
                dispatch(getDescribeNouns(firestore, counters));
                break;
            case 'to-be-at-location':
                dispatch(getToBeAtLocation(firestore, counters));
                break;
            default: throw new Error('404');
        }
    }
}

export const clearSentenceData = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_SENTENCE_DATA'
        });
    }
}

export const getToHave = (firestore, counters) => {
    return async dispatch => {
        try {
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();
            const conjugation = await firestore.collection('to-have').doc('conjugation').get();
            const explanation = await firestore.collection('to-have').doc('explanation').get();

            let nounArray = hangul.disassemble(randomNoun.data().korean);

            if (hangul.isConsonant(nounArray[nounArray.length - 1])) {
                nounArray.push('이')
            } else {
                nounArray.push('가');
            }
            let nounWithParticle = hangul.assemble(nounArray);
            
            const sentence = Object.keys(conjugation.data()).map(key => `${nounWithParticle} ${conjugation.data()[key]}`);

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: explanation.data(),
                sentence: sentence,
                translation: [randomNoun.data()]
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getDescribeNouns = (firestore, counters) => {
    return async dispatch => {
        try {
            const randomAdjective = await firestore.collection('adjectives').doc(getRandomNumber(counters.adjective)).get();
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();
            const explanation = await firestore.collection('describe-nouns').doc('explanation').get();

            let adjectiveArray = hangul.disassemble(randomAdjective.data().korean);
            let isIrregular = 0;
            adjectiveArray.splice(adjectiveArray.length - 2, adjectiveArray.length);

            if (adjectiveArray[adjectiveArray.length - 1] === 'ㅂ') {
                adjectiveArray.splice(adjectiveArray.length - 1, adjectiveArray.length);
                adjectiveArray.push('운')
                isIrregular = '3';
            } else {
                if (hangul.isConsonant(adjectiveArray[adjectiveArray.length - 1])) {
                    adjectiveArray.push('은');
                } else {
                    adjectiveArray.push('ㄴ');
                }
            }

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: explanation.data(),
                sentence: `${hangul.assemble(adjectiveArray)} ${randomNoun.data().korean}`,
                translation: [randomAdjective.data(), randomNoun.data()],
                irregular: isIrregular
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getToBeAtLocation = (firestore, counters) => {
    return async dispatch => {
        try {
            const explanation = await firestore.collection('to-be-at-location').doc('explanation').get();
            const conjugation = await firestore.collection('to-be-at-location').doc('conjugation').get();
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();
    
            let nounArray = hangul.disassemble(randomNoun.data().korean);
            nounArray.push('에');
            nounArray = hangul.assemble(nounArray);
    
            const sentence = Object.keys(conjugation.data()).map(key => `${nounArray} ${conjugation.data()[key]}`);
    
            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: explanation.data(),
                sentence: sentence,
                translation: [randomNoun.data()]
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }

    }
}