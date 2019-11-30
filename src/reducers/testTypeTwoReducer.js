const initState = {
    testTypeTwoData: null,
    loadingTestTypeTwo: false,
    exp: 0,
    numberOfWords: null
}


const testTypeTwoReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_TEST_TWO_DATA':
            return {
                ...state,
                testTypeTwoData: action.data
            }
        case 'SET_EXP_TEST_TWO':
            return {
                ...state,
                exp: action.data
            }
        case 'SET_NUMBER_OF_WORDS_TEST_TWO':
            return {
                ...state,
                numberOfWords: action.data
            }
        case 'REMOVE_TEST_TWO_DATA':
            return {
                ...state,
                testTypeTwoData: true
            }
        case 'CLEAR_TEST_TWO':
            return {
                ...state,
                testTypeTwoData: null,
                loadingTestTypeTwo: false,
                exp: 0,
                numberOfWords: null
            }
        case 'LOADING_TEST_TWO':
            return {
                ...state,
                loadingTestTypeTwo: action.data
            }
        default: return state;
    }
}

export default testTypeTwoReducer;