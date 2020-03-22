const initState = {
	nounsCategories: null,
	words: [],
	saved: [],
	wordSaving: false,
	wordDeleting: false,
	lastWord: '01',
	searchNotFound: false,
	oneWord: null,
	loadingOneWord: false
}

const wordsReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_NOUNS_CATEGORIES':
			return {
				...state,
				nounsCategories: action.data
			}
		case 'UPDATE_SEARCH_NOT_FOUND':
			return {
				...state,
				searchNotFound: action.data
			}
		case 'UPDATE_WORDS':
			return {
				...state,
				words: [...state.words, ...action.data]
			}
		case 'UPDATE_SAVED_WORDS':
			return {
				...state,
				saved: [...state.saved, action.data]
			}
		case 'UPDATE_LAST_WORD':
			return {
				...state,
				lastWord: action.data
			}
		case 'CLEAR_LAST_WORD':
			return {
				...state,
				lastWord: '01'
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
		case 'UPDATE_ONE_WORD':
			return {
				...state,
				oneWord: action.data
			}
		case 'SET_LOADING_ONE_WORD':
			return {
				...state,
				loadingOneWord: action.data
			}
		case 'CLEAR_ONE_WORD':
			return {
				...state,
				oneWord: action.data
			}
		default: return state;
	}
}

export default wordsReducer;