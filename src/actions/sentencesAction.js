import getRandomNumber from '../utils/getRandomNumber';
import * as hangul from 'hangul-js';
import { handleErrors } from './errorsAction';

export const getSentenceData = (firestore, category, explanation) => {
    return async (dispatch, getState) => {
        dispatch({
            type: 'MAIN_LOADER_SHOW'
        });

        const {counters} = getState().settingsReducer;
        let data;

        if (!explanation) {
            data = await firestore.collection('sentences').doc(category).get();
            data = data.data();
        } else {
            data = explanation;
        }

        switch(category) {
            case 'ida':
                return dispatch(getIda(firestore, counters, data));
            case 'to-have':
                return dispatch(getToHave(firestore, counters, data));
            case 'describe-nouns':
                return dispatch(getDescribeNouns(firestore, counters, data.data()));
            case 'possessive':
                return dispatch(getPossessive(firestore, counters, data));
            case 'to-be-at-location':
                return dispatch(getToBeAtLocation(firestore, counters, data));
            case 'negative-sentence-1':
                return dispatch(getNegativeSentence1(firestore, counters, data));
            case 'negative-sentence-2':
                return dispatch(getNegativeSentence2(firestore, counters, data));
            case 'to-not-have':
                return dispatch(getToNotHave(firestore, counters, data));
            case 'to-not-be':
                return dispatch(getToNotBe(firestore, counters, data));
            case 'telling-time':
                return dispatch(getTellingTime(firestore, counters, data));
            case 'for-amount':
                return dispatch(getForAmount(firestore, counters, data));
            default: dispatch(handleErrors('404'));
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

export const getIda = (firestore, counters, data) => {
    return async dispatch => {
        try {;
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();

            let nounArray = hangul.disassemble(randomNoun.data().korean);
            nounArray.push('이다');
            
            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `나는 ${hangul.assemble(nounArray)}`,
                translation: [randomNoun.data()]
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });
        } catch (err) {
            throw err;
        }
    }
}

export const getToHave = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();
            let nounArray = hangul.disassemble(randomNoun.data().korean);

            if (hangul.isConsonant(nounArray[nounArray.length - 1])) {
                nounArray.push('이')
            } else {
                nounArray.push('가');
            }
            let nounWithParticle = hangul.assemble(nounArray);
            
            const sentence = Object.keys(data.conjugation).map(key => `${nounWithParticle} ${data.conjugation[key]}`);    

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
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

export const getDescribeNouns = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const randomAdjective = await firestore.collection('adjectives').doc(getRandomNumber(counters.adjective)).get();
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();

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
                explanation: data,
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

export const getPossessive = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const randomNoun1 = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();
            const randomNoun2 = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();

            let randomNoun1Array = hangul.disassemble(randomNoun1.data().korean);
            randomNoun1Array.push('의');

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `${hangul.assemble(randomNoun1Array)} ${randomNoun2.data().korean}`,
                translation: [randomNoun1.data(), randomNoun2.data()]
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getToBeAtLocation = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();
    
            let nounArray = hangul.disassemble(randomNoun.data().korean);
            nounArray.push('에');
            nounArray = hangul.assemble(nounArray);
    
            const sentence = Object.keys(data.conjugation).map(key => `${nounArray} ${data.conjugation[key]}`);
    
            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
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

export const getNegativeSentence1 = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const wordsBase = {
                1: 'past-tense',
                2: 'present-tense',
                3: 'future-tense-1'
            }

            const randomBase = wordsBase[Math.floor(Math.random() * Object.keys(wordsBase).length) + 1];

            const conjugatedWord = await firestore.collection(randomBase).doc(getRandomNumber(counters[randomBase])).get();
            const wordTranslation = await conjugatedWord.data().word.get();

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `안 ${conjugatedWord.data()[2]}`,
                translation: [wordTranslation.data()]
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getNegativeSentence2 = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const wordsBase = {
                1: 'verbs',
                2: 'adjectives',
            }
            const countersNameBase = {
                1: 'verb',
                2: 'adjective'
            }

            const randomBase = Math.floor(Math.random() * Object.keys(wordsBase).length) + 1;

            const word = await firestore.collection(wordsBase[randomBase]).doc(getRandomNumber(counters[countersNameBase[randomBase]])).get();
            const wordArray = hangul.disassemble(word.data().korean);
            wordArray.splice(wordArray.length - 2, wordArray.length);
            wordArray.push('지');

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `${hangul.assemble(wordArray)} 않아요`,
                translation: [word.data()]
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getToNotHave = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();

            let nounArray = hangul.disassemble(randomNoun.data().korean);

            if (hangul.isConsonant(nounArray[nounArray.length - 1])) {
                nounArray.push('이')
            } else {
                nounArray.push('가');
            }
            let nounWithParticle = hangul.assemble(nounArray);

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `${nounWithParticle} 없어요`,
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

export const getToNotBe = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const randomNoun = await firestore.collection('nouns').doc(getRandomNumber(counters.nouns)).get();

            let nounArray = hangul.disassemble(randomNoun.data().korean);
            if (hangul.isConsonant(nounArray[nounArray.length - 1])) {
                nounArray.push('이')
            } else {
                nounArray.push('가');
            }

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `${hangul.assemble(nounArray)} 아니다`,
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

export const getTellingTime = (firestore, counters, data) => {
    return async dispatch => {
        try {
            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `2시 30분`,
                translation: [{korean: '도 시 삼십 분', english: '2:30'}],
                nextButton: false
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });  
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getForAmount = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const randomPastTense = await firestore.collection('past-tense').doc(getRandomNumber(counters['past-tense'])).get();
            const word = await randomPastTense.data().word.get();
            const randomCounter = await firestore.collection('counters').doc(getRandomNumber(counters.counters)).get();
            const randomNumber = await firestore.collection(randomCounter.data().numbers).doc(getRandomNumber(counters[randomCounter.data().numbers] - 4)).get();

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `${randomNumber.data()[randomCounter.data().type]}${randomCounter.data().numbers === 'sino-numbers' ? '' : ' '}${randomCounter.data().korean} 동안 ${randomPastTense.data()[2]}`,
                translation: [randomNumber.data(), randomCounter.data(), word.data()]
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            }); 
        } catch (err) {
           dispatch(handleErrors(err));
        }
    }
}