const initState = {
	infiniteScrollLoaderVisible: false
}

const InfiniteScrollLoader = (state = initState, action) => {
	switch(action.type) {
		case 'INFINITE_LOADER_SHOW':
			return {
				...state,
				infiniteScrollLoaderVisible: true
			}
		case 'INFINITE_LOADER_HIDE':
			return {
				...state,
				infiniteScrollLoaderVisible: false
			}
		default: return state
	}
}

export default InfiniteScrollLoader;