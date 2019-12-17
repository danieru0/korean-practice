import { toast } from 'react-toastify';

export const handleErrors = (err, component) => {
    return dispatch => {
        console.log(err.message);
        if (err.code) {
            switch(err.code) {
                case 'auth/invalid-email':
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
                    break;
                case 'auth/weak-password':
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
                    break;
                case 'auth/email-already-in-use':
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
                    break;
                case 'auth/user-not-found':
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
                    break;
                case 'auth/wrong-password':
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
                    break;
                case 'resource-exhausted':
                    dispatch({
                        type: 'TOGGLE_MODAL',
                        boolean: true,
                        modalType: 'limit'
                    });
                    break;
                case 'permission-denied':
                    if (component === 'conjugation-explanation') {
                        window.location.href = '/404';
                    }
                    break;
                default:                     
                    toast.error("Something went wrong!");
                    if (component === 'auth-register') {
                        dispatch({
                            type: 'MAIN_LOADER_HIDE'
                        });
                        dispatch({
                            type: 'AUTH_STOP'
                        });
                        console.log('when registering: ' + err);
                    } else if (component === 'auth-userCreate') {
                        dispatch({
                            type: 'MAIN_LOADER_HIDE'
                        });
                        dispatch({
                            type: 'AUTH_STOP'
                        });
                        console.log('when making a user ' + err);
                    } else if (component === 'auth-login') {
                        dispatch({
                            type: 'MAIN_LOADER_HIDE'
                        });
                        dispatch({
                            type: 'AUTH_STOP'
                        });
                        console.log('when logging in: ' + err);
                    } else if (component === 'settings-avatarUpload') {
                        console.log('while uploading: ' + err);
                        dispatch({
                            type: 'MAIN_LOADER_HIDE'
                        });
                        dispatch({
                            type: 'UPDATE_SETTINGS_STATE',
                            data: false
                        });
                    } else {
                        dispatch({
							type: 'MAIN_LOADER_HIDE'
						});
                        throw err;
                    }
            }
        }
        if (err.message && !err.code) {
            switch(err.message) {
                case '404':
                    window.location.href = '/404';
                    break;
                case 'Register disabled':
                    dispatch({
                        type: 'AUTH_STOP'
                    });
                    dispatch({
                        type: 'MAIN_LOADER_HIDE'
                    })
                    dispatch({
                        type: 'TOGGLE_MODAL',
                        boolean: true,
                        modalType: 'blocked'
                    });
                    break;
                case 'Save blocked':
                    console.log('xd');
                    dispatch({
                        type: 'SAVING_WORD_STATE',
                        data: false
                    });
                    dispatch({
                        type: 'TOGGLE_MODAL',
                        boolean: true,
                        modalType: 'blocked'
                    });
                    break;
                default: 
                    dispatch({
                        type: 'MAIN_LOADER_HIDE'
                    });
                    throw new Error(err.message);
            }
        }
    }
}