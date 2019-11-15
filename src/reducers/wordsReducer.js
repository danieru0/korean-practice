const initState = {
	nounsCategories: null
}

const wordsReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_NOUNS_CATEGORIES':
			return {
				...state,
				nounsCategories: action.data
			}
		default: return state;
	}
}

export default wordsReducer;