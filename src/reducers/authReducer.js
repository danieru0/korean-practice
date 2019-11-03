const initState = {
	authStart: false,
	authSuccess: false,
	authError: {
		nick: '',
		email: '',
		password: ''
	}
}

const authReducer = (state = initState, action) => {
	switch(action.type) {
		case 'AUTH_START':
			return {
				...state,
				authStart: true
			}
		case 'AUTH_STOP':
			return {
				...state,
				authStart: false
			}
		case 'AUTH_SUCCESS':
			return {
				...state,
				authSuccess: true
			}
		case 'AUTH_SET_ERROR_MESSAGE':
			return {
				...state,
				authError: {
					...state.authError,
					[action.what]: action.message
				}
			}
		case 'AUTH_ERROR_CLEAR':
			return {
				...state,
				authError: {
					...state.authError,
					nick: '',
					email: '',
					password: ''
				}
			}
		case 'AUTH_STATUS_CLEAR':
			return {
				...state,
				authSuccess: false
			}
		default: return state;
	}
}

export default authReducer;