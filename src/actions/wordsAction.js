export const getNounsCategories = (firestore) => {
	return async dispatch => {
		try {

			const doc = await firestore.collection('nouns').doc('categories').get();

			dispatch({
				type: 'UPDATE_NOUNS_CATEGORIES',
				data: doc.data()
			});
		} catch (err) {
			throw err;
		}
	}
}

export const getNouns = (firestore, category) => {
	return async dispatch => {
		try {

			const doc = await firestore.collection('nouns').where("type", "==", category).orderBy('__name__').startAt('01').get();
			let nouns = [];
			doc.forEach(snapshot => {
				nouns.push(snapshot.data());
			});

			dispatch({
				type: 'UPDATE_NOUNS',
				data: nouns
			});
		} catch (err) {
			throw err;
		}
	}
}