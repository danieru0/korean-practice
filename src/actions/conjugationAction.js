import getRandomNumber from '../utils/getRandomNumber';

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
            if (err.message === '404') {
                window.location.href = '/404';
            } else if (err.message === 'resource-exhausted') {
				dispatch({
					type: 'TOGGLE_MODAL',
					boolean: true,
					modalType: 'limit'
				})
			} else {
                throw err;
            }
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
            const counters = await firestore.collection('settings').doc('counters').get();
            const doc = await firestore.collection(category).doc(getRandomNumber(counters.data()[category])).get();
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
            if (err.message === 'resource-exhausted') {
				dispatch({
					type: 'TOGGLE_MODAL',
					boolean: true,
					modalType: 'limit'
				})
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