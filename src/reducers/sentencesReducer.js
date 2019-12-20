const initState = {
    explanation: null,
    sentence: null,
    translation: null,
    counters: null
}

const sentencesReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_SENTENCE_COUNTERS':
            return {
                ...state,
                counters: action.data
            }
        case 'UPDATE_SENTENCE_DATA':
            return {
                ...state,
                explanation: action.explanation,
                sentence: action.sentence,
                translation: action.translation
            }
        case 'CLEAR_SENTENCE_DATA':
            return {
                ...state,
                explanation: null,
                sentence: null,
                translation: null
            }
        default: return state;
    }
}

export default sentencesReducer;