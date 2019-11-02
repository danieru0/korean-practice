export const signUp = (firestore, nick, email, password1, password2) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		dispatch({
			type: 'AUTH_START',
		});
		dispatch({
			type: 'MAIN_LOADER_SHOW'
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
			dispatch({
				type: 'AUTH_STOP'
			});
			dispatch({
				type: 'MAIN_LOADER_HIDE'
			});
			return false;
		} else if (nick.length > 15) {
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'nick',
				message: 'Nick is too long! Maximum length is: 15 characters'
			});
			dispatch({
				type: 'AUTH_STOP'
			});
			dispatch({
				type: 'MAIN_LOADER_HIDE'
			});
			return false;
		}
		if (!email) {
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'email',
				message: 'Email is required!'
			});
			dispatch({
				type: 'AUTH_STOP'
			});
			dispatch({
				type: 'MAIN_LOADER_HIDE'
			});
			return false;
		}
		if (!password1 && !password2) {
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'password',
				message: "Password is required!"
			});
			dispatch({
				type: 'AUTH_STOP'
			});
			dispatch({
				type: 'MAIN_LOADER_HIDE'
			});
			return false;
		} else if (password1 !== password2) {
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'password',
				message: "Password doesn't match!"
			});
			dispatch({
				type: 'AUTH_STOP'
			});
			dispatch({
				type: 'MAIN_LOADER_HIDE'
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
					type: 'MAIN_LOADER_HIDE'
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
				dispatch({
					type: 'MAIN_LOADER_HIDE'
				});
				dispatch({
					type: 'AUTH_STOP'
				});
			} else if (err.code === 'auth/weak-password') {
				dispatch({
					type: 'AUTH_SET_ERROR_MESSAGE',
					what: 'password',
					message: err.message
				});
				dispatch({
					type: 'MAIN_LOADER_HIDE'
				});
				dispatch({
					type: 'AUTH_STOP'
				});
			} else if (err.code === 'auth/email-already-in-use') {
				dispatch({
					type: 'AUTH_SET_ERROR_MESSAGE',
					what: 'email',
					message: err.message
				});
				dispatch({
					type: 'MAIN_LOADER_HIDE'
				});
				dispatch({
					type: 'AUTH_STOP'
				});
			}
			throw err;
		})
	}
}