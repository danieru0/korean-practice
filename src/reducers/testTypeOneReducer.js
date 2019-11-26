const initState = {
    testTypeOneData: null,
    loadingTestTypeOne: false,
    exp: 0
}

const testTypeOneData = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_TEST_ONE_DATA':
            return {
                ...state,
                testTypeOneData: action.data
            }
        case 'SET_EXP':
            return {
                ...state,
                exp: action.data
            }
        case 'REMOVE_TEST_ONE_DATA':
            return {
                ...state,
                testTypeOneData: true
            }
        case 'CLEAR_TEST_ONE':
            return {
                ...state,
                testTypeOneData: null,
                loadingTestTypeOne: false,
                exp: 0
            }
        case 'LOADING_TEST_ONE':
            return {
                ...state,
                loadingTestTypeOne: action.data
            }
        default: return state;
    }
}

export default testTypeOneData;