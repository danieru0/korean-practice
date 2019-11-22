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

        const randomNumber = () => {
            let number = Math.floor(Math.random() * 2) + 1;
            if (number < 10) {
                number = `0${number}`
            }

            return number;
        }

        dispatch({
            type: 'UPDATE_LOADING_WORD',
            data: true
        });

        try {
            const doc = await firestore.collection(category).doc(randomNumber()).get();
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
            throw err;
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