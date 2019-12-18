import { toast } from 'react-toastify';
import { handleErrors } from './errorsAction';

export const getNounsCategories = (firestore) => {
	return async dispatch => {
		try {

			const doc = await firestore.collection('nouns').doc('categories').get();

			dispatch({
				type: 'UPDATE_NOUNS_CATEGORIES',
				data: doc.data()
			});
		} catch (err) {
			dispatch(handleErrors(err));
		}
	}
}

export const getWords = (firestore, type, lastWord, category) => {
	return async dispatch => {
		try {
			if (lastWord === '01') {
				console.log('01');
				const doc = type === 'nouns' ? (
					await firestore.collection(type).where("type", "==", category).orderBy('__name__').startAt(lastWord).limit(24).get()
				) : (
					await firestore.collection(type).orderBy('__name__').startAt(lastWord).limit(24).get()
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
				dispatch({
					type: `UPDATE_LAST_WORD`,
					data: doc.docs[doc.docs.length-1]
				});
			} else if (lastWord !== undefined) {
				const doc = type === 'nouns' ? (
					await firestore.collection(type).where("type", "==", category).orderBy('__name__').startAfter(lastWord).limit(24).get()
				) : (
					await firestore.collection(type).orderBy('__name__').startAfter(lastWord).limit(24).get()
				);

				let words = [];
				doc.forEach(snapshot => {
					words.push(snapshot.data());
				});

				dispatch({
					type: `UPDATE_WORDS`,
					data: words
				});
				dispatch({
					type: `UPDATE_LAST_WORD`,
					data: doc.docs[doc.docs.length-1]
				});
			}
		} catch (err) {
			dispatch(handleErrors(err))
		}
	}
}

export const saveWord = (firestore, category, item) => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		const functions = await firestore.collection('settings').doc('functions').get();
		if (functions.data().save === false) {
			dispatch(handleErrors({message: 'Save blocked'}));
			return;
		}

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
								dispatch(handleErrors(err));
							})

						}).catch(err => {
							dispatch({
								type: 'SAVING_WORD_STATE',
								data: false
							});
							dispatch(handleErrors(err));
						});
					} else {
						toast.error('Word already saved!');
						dispatch({
							type: 'SAVING_WORD_STATE',
							data: false
						});
					}
				}).catch(err => {
					console.log(err);
					dispatch({
						type: 'SAVING_WORD_STATE',
						data: false
					});
					dispatch(handleErrors(err));
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
					dispatch(handleErrors(err));
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
						dispatch(handleErrors(err));
					})
				}).catch(err => {
					dispatch({
						type: 'DELETING_WORD_STATE',
						data: false
					});
					dispatch(handleErrors(err));
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
		dispatch({
			type: 'CLEAR_LAST_WORD'
		})
	}
}