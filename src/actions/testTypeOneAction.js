import getRandomNumber from '../utils/getRandomNumber';

export const clearTest = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_TEST_ONE'
        });
    }
}

export const getTest = (firestore, category, numberOfWords) => {
    return async dispatch => {
        dispatch({
            type: 'REMOVE_TEST_ONE_DATA'
        });
        dispatch({
            type: 'LOADING_TEST_ONE',
            data: true
        });

        let number = numberOfWords;

        if (!numberOfWords) {
            const numberFromFirestore = await firestore.collection('settings').doc('counters').get();
            dispatch({
                type: 'SET_NUMBER_OF_WORDS',
                data: numberFromFirestore.data()[category]
            });
            number = numberFromFirestore.data()[category]
        }

        switch(category) {
            case 'letter':
                return dispatch(getLetter(firestore));
            case 'verb':
                return dispatch(getVerb(firestore, number));
            case 'adjective':
                return dispatch(getAdjective(firestore, number));
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
                type: 'SET_EXP',
                data: 1
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

export const getVerb = (firestore, numberOfWords) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('verbs').doc(getRandomNumber(numberOfWords)).get();

            dispatch({
                type: 'UPDATE_TEST_ONE_DATA',
                data: doc.data()
            });
            dispatch({
                type: 'SET_EXP',
                data: 5
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

export const getAdjective = (firestore, numberOfWords) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('adjectives').doc(getRandomNumber(numberOfWords)).get();

            dispatch({
                type: 'UPDATE_TEST_ONE_DATA',
                data: doc.data()
            });
            dispatch({
                type: 'SET_EXP',
                data: 5
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