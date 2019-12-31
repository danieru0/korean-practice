const initState = {
    testTypeOneData: null,
    loadingTestTypeOne: false,
    exp: 0,
    title: 'Loading...',
    task: 'Loading...',
}

const testTypeOneReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_TEST_ONE_DATA':
            return {
                ...state,
                testTypeOneData: action.data,
                title: action.title,
                task: action.task
            }
        case 'SET_EXP_TEST_ONE':
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
                exp: 0,
                title: 'Loading...',
                task: 'Loading...'
            }
        case 'LOADING_TEST_ONE':
            return {
                ...state,
                loadingTestTypeOne: action.data
            }
        default: return state;
    }
}

export default testTypeOneReducer;
