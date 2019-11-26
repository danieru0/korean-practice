const initState = {
    userExpAndAnswerUpdated: false
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_USER_EXP_ANSWER':
            return {
                ...state,
                userExpAndAnswerUpdated: action.data
            }
        default: return state;
    }
}

export default userReducer;