const initState = {
	nounsCategories: null,
	nouns: [],
	verbs: [],
	adjectives: [],
	saved: [],
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
		case 'UPDATE_VERBS':
			return {
				...state,
				verbs: [...state.verbs, action.data]
			}
		case 'UPDATE_ADJECTIVES':
			return {
				...state,
				adjectives: [...state.adjectives, action.data]
			}
		case 'UPDATE_SAVED_WORDS':
			return {
				...state,
				saved: [...state.saved, action.data]
			}
		case 'CLEAR_WORDS':
			return {
				...state,
				nouns: [],
				verbs: [],
				adjectives: [],
				saved: []
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