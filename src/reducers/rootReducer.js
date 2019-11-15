import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import mainLoaderReducer from './mainLoaderReducer'
import settingsReducer from './settingsReducer';
import lettersReducer from './lettersReducer';
import wordsReducer from './wordsReducer';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	authReducer: authReducer,
	mainLoaderReducer: mainLoaderReducer,
	settingsReducer: settingsReducer,
	lettersReducer: lettersReducer,
	wordsReducer: wordsReducer
});

export default rootReducer;