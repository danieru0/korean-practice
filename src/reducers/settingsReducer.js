const initState = {
	settingsState: false,
	counters: null
}

const settingsReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_SETTINGS_STATE':
			return {
				...state,
				settingsState: action.data
			}
		case 'UPDATE_COUNTERS':
			return {
				...state,
				counters: action.data
			}
		default: return state;
	}
}

export default settingsReducer;