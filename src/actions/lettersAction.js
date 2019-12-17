import { handleErrors } from "./errorsAction";

export const getLetter = (firestore, id) => {
	return async (dispatch, getState, { getFirebase }) => {
		try {

			dispatch({
				type: 'CLEAR_LETTER'
			});
			dispatch({
				type: 'LOADING_LETTER',
				data: true
			});

			const doc = await firestore.collection('letters').doc(id).get();
			if (!doc.exists) {
				throw new Error('404')
			}

			dispatch({
				type: 'UPDATE_LETTER',
				data: doc.data()
			});

			dispatch({
				type: 'LOADING_LETTER',
				data: false
			});			
		} catch (err) {
			dispatch({
				type: 'LOADING_LETTER',
				data: false
			});
			dispatch(handleErrors(err));
		}
	}
}