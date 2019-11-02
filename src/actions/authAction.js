export const signUp = (firestore, nick, email, password1, password2) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		dispatch({
			type: 'AUTH_START',
		});

		dispatch({
			type: 'AUTH_ERROR_CLEAR'
		});

		if (!nick) {
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'nick',
				message: 'Nick is required!'
			});
			return false;
		} else if (nick.length > 15) {
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'nick',
				message: 'Nick is too long! Maximum length is: 15 characters'
			});
			return false;
		}
		if (password1 !== password2) {
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'password',
				message: "Password doesn't match!"
			});
			return false;
		}

		firebase.auth().createUserWithEmailAndPassword(email, password1).then(newUser => {
			firestore.collection('users').doc(newUser.user.uid).set({
				nick: nick,
				email: email,
				exp: 0,
				answers: 0
			}).then(() => {
				dispatch({
					type: 'AUTH_STOP'
				});
				dispatch({
					type: 'AUTH_SUCCESS'
				});
				dispatch({
					type: 'AUTH_ERROR_CLEAR'
				});
			}).catch(err => {
				throw err;
			});
		}).catch(err => {
			if (err.code === 'auth/invalid-email') {
				dispatch({
					type: 'AUTH_SET_ERROR_MESSAGE',
					what: 'email',
					message: err.message
				});
			} else if (err.code === 'auth/weak-password') {
				dispatch({
					type: 'AUTH_SET_ERROR_MESSAGE',
					what: 'password',
					message: err.message
				});
			}
		})
	}
}