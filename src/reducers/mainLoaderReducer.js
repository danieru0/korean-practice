const initState = {
	mainLoaderVisible: false
}

const mainLoaderReducer = (state = initState, action) => {
	switch(action.type) {
		case 'MAIN_LOADER_SHOW':
			return {
				...state,
				mainLoaderVisible: true
			}
		case 'MAIN_LOADER_HIDE':
			return {
				...state,
				mainLoaderVisible: false
			}
		default: return state
	}
}

export default mainLoaderReducer;