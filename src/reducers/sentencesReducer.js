const initState = {
    explanation: null,
    sentence: null,
    translation: null,
    irregular: 0
}

const sentencesReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_SENTENCE_DATA':
            return {
                ...state,
                explanation: action.explanation || null,
                sentence: action.sentence || null,
                translation: action.translation || null,
                irregular: action.irregular || 0
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