import { handleErrors } from './errorsAction';

export const getIrregularData = (firestore, type) => {
    return dispatch => {
        dispatch({
            type: 'MAIN_LOADER_SHOW'
        });

        switch(type) {
            case '1':
                dispatch(getIrregular(firestore, { 1: 'past-tense' }, type, 2));
                break;
            case '2':
                dispatch(getIrregular(firestore, { 1: 'past-tense', 2: 'present-tense' }, type, 3));
                break;
            case '4':
                dispatch(getIrregular(firestore, { 1: 'past-tense' }, type, 3));
                break;
            case '6':
                dispatch(getIrregular(firestore, { 1: 'present-tense' }, type, [1, 4]));
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

export const getIrregular = (firestore, wordsBase, type, conjugationNumber) => {
    return async dispatch => {
        try {
            const irregularData = await firestore.collection('irregulars').doc(type).get();
            const irregularWordsData = await firestore.collection(wordsBase[Math.floor(Math.random() * Object.keys(wordsBase).length) + 1]).where("info.irregular", "==", type).get();
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
                    conjugationNumber: conjugationNumber
                });
                dispatch({
                    type: 'MAIN_LOADER_HIDE'
                });
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}