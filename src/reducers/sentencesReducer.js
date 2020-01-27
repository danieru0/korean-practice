const initState = {
    explanation: null,
    sentence: null,
    translation: null,
    irregular: 0,
    nextButton: true,
    links: null
}

const sentencesReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_SENTENCE_LINKS':
            return {
                ...state,
                links: action.data
            }
        case 'UPDATE_SENTENCE_DATA':
            return {
                ...state,
                explanation: action.explanation || null,
                sentence: action.sentence || null,
                translation: action.translation || null,
                irregular: action.irregular || 0,
                nextButton: action.nextButton === undefined ? true : false
            }
        case 'CLEAR_SENTENCE_DATA':
            return {
                ...state,
                explanation: null,
                sentence: null,
                translation: null,
                nextButton: true,
                irregular: 0,
            }
        default: return state;
    }
}

export default sentencesReducer;