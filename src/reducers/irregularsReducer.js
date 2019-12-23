const initState = {
    info: null,
    word: null,
    conjugationNumber: null
}

const irregularsReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_IRREGULARS_DATA':
            return {
                ...state,
                info: action.info,
                word: action.word,
                conjugationNumber: action.conjugationNumber
            }
        case 'CLEAR_IRREGULARS_DATA':
            return {
                ...state,
                info: null,
                word: null,
                conjugationNumber: null
            }
        default: return state;
    }
}

export default irregularsReducer;