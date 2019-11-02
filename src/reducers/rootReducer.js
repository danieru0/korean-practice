import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import mainLoaderReducer from './mainLoaderReducer'

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	authReducer: authReducer,
	mainLoaderReducer: mainLoaderReducer
});

export default rootReducer;