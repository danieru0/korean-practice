const initState = {
	settingsState: false
}

const settingsReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_SETTINGS_STATE':
			return {
				...state,
				settingsState: action.data
			}
		default: return state;
	}
}

export default settingsReducer;