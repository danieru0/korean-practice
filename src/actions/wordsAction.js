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

export const getWords = (firestore, type, startAt, category) => {
	return async dispatch => {
		try {
			const doc = type === 'nouns' ? (
					await firestore.collection(type).where("type", "==", category).orderBy('__name__').startAt(startAt).get()
				) : (
					await firestore.collection(type).orderBy('__name__').startAt(startAt).get()
				);

			let words = [];
			doc.forEach(snapshot => {
				words.push(snapshot.data());
			});

			if (words.length === 0) throw new Error('404');

			dispatch({
				type: `UPDATE_WORDS`,
				data: words
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
						firestore.collection('users').doc(user.uid).collection(category).doc(item.id).set({ english: item.english, korean: item.korean }).then(() => {
							firestore.collection('users').doc(user.uid).update({
								[`saved.${category}`]: firebase.firestore.FieldValue.increment(1)
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

export const getSavedWords = (firestore, type, startAt) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				let words = [];
				firestore.collection('users').doc(user.uid).collection(type).orderBy('__name__').startAt(startAt).get().then(snapshot => {
					snapshot.forEach(item => {
						words.push({...item.data(), id: item.id});
					});

					dispatch({
						type: 'UPDATE_SAVED_WORDS',
						data: words
					});
				}).catch(err => {
					throw err;
				});
			}
		})
	}
}

export const removeSavedWord = (firestore, type, id) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch({
					type: 'DELETING_WORD_STATE',
					data: true
				});
				firestore.collection('users').doc(user.uid).collection(type).doc(id).delete().then(() => {
					firestore.collection('users').doc(user.uid).update({
						[`saved.${type}`]: firebase.firestore.FieldValue.increment(-1)
					}).then(() => {
						dispatch({
							type: 'REMOVE_DELETED_WORD_FROM_STATE',
							data: id
						});
						dispatch({
							type: 'DELETING_WORD_STATE',
							data: false
						});
						toast.success('Word deleted!');
					}).catch(err => {
						dispatch({
							type: 'DELETING_WORD_STATE',
							data: false
						});
						throw err;
					})
				}).catch(err => {
					dispatch({
						type: 'DELETING_WORD_STATE',
						data: false
					});
					throw err;
				});
			}
		})
	}
}

export const clearWords = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_WORDS'
		});
	}
}