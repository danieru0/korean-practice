import getRandomNumber from '../utils/getRandomNumber';

export const getTest = (firestore, category) => {
    return dispatch => {
        switch(category) {
            case 'letter':
                return dispatch(getLetter(firestore))
            default: throw new Error('Please set a category!');
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
        } catch (err) {
            throw err;
        }
    }
}