//eslint-disable-next-line
import getRandomNumber from '../utils/getRandomNumber';
import { handleErrors } from './errorsAction';

export const getIrregularData = (firestore, type) => {
    return dispatch => {
        dispatch({
            type: 'MAIN_LOADER_SHOW'
        });

        switch(type) {
            case '1':
                dispatch(getIrregularOne(firestore));
                break;
            case '2':
                dispatch(getIrregularTwo(firestore));
                break;
            default: window.location.href = '/404';
        }
    }
}

export const clearIrregularData = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_IRREGULARS_DATA'
        });
    }
}

export const getIrregularOne = firestore => {
    return async dispatch => {

    }
}

export const getIrregularTwo = firestore => {
    return async dispatch => {
        try {
            const wordsBase = {
                1: 'past-tense'
            }

            const irregularData = await firestore.collection('irregulars').doc('2').get();
            const irregularWordsData = await firestore.collection(wordsBase[Math.floor(Math.random() * 1) + 1]).where("info.irregular", "==", "2").get();
            let irregularWords = [], selectedWord;

            const processData = new Promise((resolve, reject) => {
                let counter = 0;
                irregularWordsData.forEach(item => {
                    item.data().word.get().then(elem => {
                        irregularWords.push({...item.data(), word: elem.data()})
                        counter++;
                        if (counter === irregularWordsData.docs.length) {
                            resolve();
                        }
                    })
                })
            })

            processData.then(() => {
                selectedWord = irregularWords[Math.floor(Math.random() * irregularWords.length)];
                dispatch({
                    type: 'UPDATE_IRREGULARS_DATA',
                    info: irregularData.data(),
                    word: selectedWord,
                    conjugationNumber: 3
                });
                dispatch({
                    type: 'MAIN_LOADER_HIDE'
                });
            });

        } catch (err) {
            dispatch(handleErrors(err))
        }   
    }
}