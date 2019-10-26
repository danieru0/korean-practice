export const test123 = (firestore) => {
	return async dispatch => {
		try {
			const doc = await firestore.collection('letters').doc('01').get();
			console.log(doc.data());
		} catch (err) {
			throw err;
		}
	}
}