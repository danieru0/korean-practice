export const toggleModal = (boolean, type) => {
    return dispatch => {
        dispatch({
            type: 'TOGGLE_MODAL',
            boolean: boolean,
            modalType: type
        });
    }
}