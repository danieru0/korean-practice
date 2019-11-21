const initState = {
    explanation: null,
    conjugatedWord: null,
    word: null
}

const conjugationReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_EXPLANATION':
            return {
                ...state,
                explanation: action.data
            }
        case 'UPDATE_CONJUGATED_WORD':
            return {
                ...state,
                conjugatedWord: action.data
            }
        case 'UPDATE_WORD':
            return {
                ...state,
                word: action.data
            }
        case 'CLEAR_ALL_CONJUGATIONS':
            return {
                ...state,
                explanation: null,
                conjugatedWord: null,
                word: null
            }
        default: return state;
    }
}

export default conjugationReducer;