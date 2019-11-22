import getRandomNumber from '../utils/getRandomNumber';

export const getExplanation = (firestore, category) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection(category).doc('explanation').get();

            dispatch({
                type: 'UPDATE_EXPLANATION',
                data: doc.data()
            });
        } catch (err) {
            throw err;
        }
    }
}

export const getRandomConjugatedWord = (firestore, category) => {
    return async dispatch => {

        dispatch({
            type: 'UPDATE_LOADING_WORD',
            data: true
        });

        try {
            const doc = await firestore.collection(category).doc(getRandomNumber(2)).get();
            if (!doc.exists) {
                throw new Error('404');
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
            if (err.message === '404') {
                window.location.href = '/404';
            } else {
                throw err;
            }
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