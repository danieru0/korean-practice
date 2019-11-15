const initState = {
	nounsCategories: null,
	nouns: null
}

const wordsReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_NOUNS_CATEGORIES':
			return {
				...state,
				nounsCategories: action.data
			}
		case 'UPDATE_NOUNS':
			return {
				...state,
				nouns: action.data
			}
		default: return state;
	}
}

export default wordsReducer;