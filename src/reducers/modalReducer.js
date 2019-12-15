const initState = {
    modalActive: false,
    modalType: null
}

const modalReducer = (state = initState, action) => {
    switch(action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...state,
                modalActive: action.boolean,
                modalType: action.modalType
            }
        default: return state;
    }
}

export default modalReducer;