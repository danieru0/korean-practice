const initState = {
	nounsCategories: null,
	nouns: [],
	wordSaving: false
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
				nouns: [...state.nouns, action.data]
			}
		case 'CLEAR_NOUNS':
			return {
				...state,
				nouns: []
			}
		case 'SAVING_WORD_STATE':
			return {
				...state,
				wordSaving: action.data
			}
		default: return state;
	}
}

export default wordsReducer;