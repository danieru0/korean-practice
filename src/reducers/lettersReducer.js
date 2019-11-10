const initState = {
	letter: null
}

const lettersReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_LETTER':
			return {
				...state,
				letter: action.data
			}
		case 'CLEAR_LETTER':
			return {
				...state,
				letter: null
			}
		default: return state
	}
}

export default lettersReducer;