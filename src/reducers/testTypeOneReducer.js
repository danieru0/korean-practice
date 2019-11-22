const initState = {
    testTypeOneData: null
}

const testTypeOneData = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_TEST_ONE_DATA':
            return {
                ...state,
                testTypeOneData: action.data
            }
        default: return state;
    }
}

export default testTypeOneData;