import { toast } from 'react-toastify';

export const clearAuthState = () => {
	return dispatch => {
		dispatch({
			type: 'AUTH_ERROR_CLEAR'
		});
		dispatch({
			type: 'AUTH_STATUS_CLEAR'
		});
	}
}

export const signUp = (firestore, nick, email, password1, password2) => {
	return async (dispatch, getState, { getFirebase }) => {
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
		} else if (nick.length > 16) {
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'nick',
				message: 'Nick is too long! Maximum length is: 16 characters'
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
		
		let isUserAlreadyExists = false;
		
		const users = await firestore.collection("users").where("nick", "==", nick).get();
		users.forEach(doc => {
			if (doc.data().nick === nick) {
				isUserAlreadyExists = true;
			}
		});

		if (isUserAlreadyExists) { 
			dispatch({
				type: 'AUTH_SET_ERROR_MESSAGE',
				what: 'nick',
				message: "Nick is already in use!"
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
				nick: nick.trim(),
				email: email,
				exp: 0,
				answers: 0,
				avatar: 'https://i.pravatar.cc/',
				saved: {}
			}).then(() => {
				toast.success("You have successfully registred! Have fun <3");
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
				toast.error("Something went wrong!");
				dispatch({
					type: 'MAIN_LOADER_HIDE'
				});
				dispatch({
					type: 'AUTH_STOP'
				});
				console.log('when making user: ' + err);
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
			} else {
				toast.error("Something went wrong!");
				dispatch({
					type: 'MAIN_LOADER_HIDE'
				});
				dispatch({
					type: 'AUTH_STOP'
				});
				console.log('when registering: ' + err);
			}
		});
	}
}

export const logIn = (email, password) => {
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

		firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
			toast.success("You have logged in! (ง ͠° ͟ل͜ ͡°)ง");
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
			} else if (err.code === 'auth/user-not-found') {
				dispatch({
					type: 'AUTH_SET_ERROR_MESSAGE',
					what: 'email',
					message: 'Incorrect email or password.'
				});
				dispatch({
					type: 'AUTH_SET_ERROR_MESSAGE',
					what: 'password',
					message: 'Incorrect email or password.'
				});
				dispatch({
					type: 'MAIN_LOADER_HIDE'
				});
				dispatch({
					type: 'AUTH_STOP'
				});
			} else if (err.code === 'auth/wrong-password') {
				dispatch({
					type: 'AUTH_SET_ERROR_MESSAGE',
					what: 'email',
					message: 'Incorrect email or password.'
				});
				dispatch({
					type: 'AUTH_SET_ERROR_MESSAGE',
					what: 'password',
					message: 'Incorrect email or password.'
				});
				dispatch({
					type: 'MAIN_LOADER_HIDE'
				});
				dispatch({
					type: 'AUTH_STOP'
				});
			} else {
				toast.error("Something went wrong!");
				dispatch({
					type: 'MAIN_LOADER_HIDE'
				});
				dispatch({
					type: 'AUTH_STOP'
				});
				console.log('when logging in: ' + err);
			}
		});
	}
}

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().signOut().then(() => {
			window.location.reload();
		});
	}
}