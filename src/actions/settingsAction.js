import { toast } from 'react-toastify';

export const updateAvatar = (firestore, file) => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch({
					type: 'MAIN_LOADER_SHOW'
				});
				dispatch({
					type: 'UPDATE_SETTINGS_STATE',
					data: true
				});

				firebase.storage().ref().child(`avatars/${user.uid}`).put(file).then(snapshot => {
					snapshot.ref.getDownloadURL().then(url => {
						firestore.collection('users').doc(user.uid).update({
							avatar: url
						}).then(() => {
							dispatch({
								type: 'MAIN_LOADER_HIDE'
							});
							dispatch({
								type: 'UPDATE_SETTINGS_STATE',
								data: false
							});
							toast.success('Avatar has been updated! ♡( ◡‿◡ )');
						});
					});
				}).catch(err => {
					console.log('while uploading: ' + err);
					dispatch({
						type: 'MAIN_LOADER_HIDE'
					});
					dispatch({
						type: 'UPDATE_SETTINGS_STATE',
						data: false
					});
					toast.error('Something went wrong!');
				});
			}
		})
	}
}

export const changePassword = (oldPassword, newPassword) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch({
					type: 'MAIN_LOADER_SHOW'
				});
				dispatch({
					type: 'UPDATE_SETTINGS_STATE',
					data: true
				});

				const credential = firebase.auth.EmailAuthProvider.credential(
					user.email,
					oldPassword
				)
				
				firebase.auth().currentUser.reauthenticateWithCredential(credential).then(() => {
					 firebase.auth().currentUser.updatePassword(newPassword).then(() => {
						dispatch({
							type: 'MAIN_LOADER_HIDE'
						});
						dispatch({
							type: 'UPDATE_SETTINGS_STATE',
							data: false
						});
						toast.success('Password has been changed! |･ω･)');
					 }).catch(err => {
						if (err.code === 'auth/weak-password') {
							alert('New password should be at least 6 characters!');
							dispatch({
								type: 'MAIN_LOADER_HIDE'
							});
							dispatch({
								type: 'UPDATE_SETTINGS_STATE',
								data: false
							});
						}
					 })
				}).catch(err => {
					if (err.code === 'auth/wrong-password') {
						alert('Current password is wrong!');
						dispatch({
							type: 'MAIN_LOADER_HIDE'
						});
						dispatch({
							type: 'UPDATE_SETTINGS_STATE',
							data: false
						});
					}
				});
			}
		});
	}
}

export const deleteAccount = (firestore, currentPassword) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch({
					type: 'MAIN_LOADER_SHOW'
				});
				dispatch({
					type: 'UPDATE_SETTINGS_STATE',
					data: true
				});
				const credential = firebase.auth.EmailAuthProvider.credential(
					user.email,
					currentPassword
				)

				firebase.auth().currentUser.reauthenticateWithCredential(credential).then(() => {
					firestore.collection('users').doc(user.uid).delete().then(() => {
						firebase.auth().currentUser.delete().then(() => {
							window.location.reload();
						}).catch(err => {
							console.log(err);
							dispatch({
								type: 'MAIN_LOADER_HIDE'
							});
							dispatch({
								type: 'UPDATE_SETTINGS_STATE',
								data: false
							});
							toast.error('Something went wrong!');
						});
					}).catch(err => {
						if (err.message === 'resource-exhausted') {
							dispatch({
								type: 'TOGGLE_MODAL',
								boolean: true,
								modalType: 'limit'
							})
						} else {
							throw err;
						}
						dispatch({
							type: 'MAIN_LOADER_HIDE'
						});
						dispatch({
							type: 'UPDATE_SETTINGS_STATE',
							data: false
						});
						toast.error('Something went wrong!');
					});
				}).catch(err => {
					if (err.code === 'auth/wrong-password') {
						dispatch({
							type: 'MAIN_LOADER_HIDE'
						});
						dispatch({
							type: 'UPDATE_SETTINGS_STATE',
							data: false
						});
						alert('Wrong password!');
					} else {
						throw err;
					}
				});
			}
		})
	}
}