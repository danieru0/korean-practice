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