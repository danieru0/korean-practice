import getRandomNumber from '../utils/getRandomNumber';

export const clearTest = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_TEST_ONE'
        });
    }
}

export const getTest = (firestore, category) => {
    return dispatch => {
        dispatch({
            type: 'REMOVE_TEST_ONE_DATA'
        });
        dispatch({
            type: 'LOADING_TEST_ONE',
            data: true
        });

        switch(category) {
            case 'letter':
                return dispatch(getLetter(firestore))
            default: window.location.href = '/404';
        }
    }
}

export const getLetter = (firestore) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('letters').doc(getRandomNumber(40)).get();

            dispatch({
                type: 'UPDATE_TEST_ONE_DATA',
                data: doc.data()
            });
            dispatch({
                type: 'LOADING_TEST_ONE',
                data: false
            });
        } catch (err) {
            throw err;
        }
    }
}