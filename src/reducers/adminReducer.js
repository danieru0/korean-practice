const initState = {
    adminStatus: null,
    appSettings: null
}

const adminReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_USER_ADMIN_STATUS':
            return {
                ...state,
                adminStatus: action.data
            }
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                appSettings: action.data
            }
        default: return state;
    }
}

export default adminReducer;