import { toast } from 'react-toastify';

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

export const clearNouns = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_NOUNS'
		});
	}
}

export const saveWord = (firestore, category, item) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch({
					type: 'SAVING_WORD_STATE',
					data: true
				});

				firestore.collection('users').doc(user.uid).collection(category).where("english", "==", item.english).limit(1).get().then(snapshot => {
					if (snapshot.empty) {
						firestore.collection('users').doc(user.uid).collection(category).doc().set(JSON.parse(JSON.stringify(item))).then(() => {
							firestore.collection('users').doc(user.uid).update({
								"saved.nouns": firebase.firestore.FieldValue.increment(1)
							}).then(() => {
								dispatch({
									type: 'SAVING_WORD_STATE',
									data: false
								});
								toast.success('Word saved!');
							}).catch(err => {
								throw err;
							})

						}).catch(err => {
							dispatch({
								type: 'SAVING_WORD_STATE',
								data: false
							});
							throw err;
						});
					} else {
						toast.error('Word already saved!');
						dispatch({
							type: 'SAVING_WORD_STATE',
							data: false
						});
					}
				}).catch(err => {
					dispatch({
						type: 'SAVING_WORD_STATE',
						data: false
					});
					throw err;
				});
			}
		})
	}
}