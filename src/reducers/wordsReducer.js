const initState = {
	nounsCategories: null,
	words: [],
	saved: [],
	wordSaving: false,
	wordDeleting: false
}

const wordsReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_NOUNS_CATEGORIES':
			return {
				...state,
				nounsCategories: action.data
			}
		case 'UPDATE_WORDS':
			return {
				...state,
				words: [...state.words, action.data]
			}
		case 'UPDATE_SAVED_WORDS':
			return {
				...state,
				saved: [...state.saved, action.data]
			}
		case 'CLEAR_WORDS':
			return {
				...state,
				saved: [],
				words: []
			}
		case 'SAVING_WORD_STATE':
			return {
				...state,
				wordSaving: action.data
			}
		case 'DELETING_WORD_STATE':
			return {
				...state,
				wordDeleting: action.data
			}
		case 'REMOVE_DELETED_WORD_FROM_STATE':
			return {
				...state, 
				saved: [state.saved[0].filter(item => item.id !== action.data)]
			}
		default: return state;
	}
}

export default wordsReducer;