import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import mainLoaderReducer from './mainLoaderReducer'
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	authReducer: authReducer,
	mainLoaderReducer: mainLoaderReducer,
	settingsReducer: settingsReducer
});

export default rootReducer;