import { toast } from 'react-toastify';

export const checkAdminStatus = (firestore, clear) => {
    return (dispatch, getState, { getFirebase }) => {
        if (clear) {
            dispatch({
                type: 'UPDATE_USER_ADMIN_STATUS',
                data: null
            });
            return false;
        }

        const firebase = getFirebase();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).get().then(doc => {
                    dispatch({
                        type: 'UPDATE_USER_ADMIN_STATUS',
                        data: doc.data().isAdmin
                    });
                }).catch(err => {
                    throw err;
                }) 
            }
        })
    }
}

export const getAppSettings = firestore => {
    return async (dispatch, getState, { getFirebase }) => {
        try {
            const doc = await firestore.collection('settings').doc('functions').get();

            dispatch({
                type: 'UPDATE_SETTINGS',
                data: doc.data()
            });
        } catch (err) {
            throw err;
        }
    }
}

export const updateAppSettings = (firestore, settings) => {
    return dispatch => {
        dispatch({
            type: 'MAIN_LOADER_SHOW'
        });
        firestore.collection('settings').doc('functions').update(settings).then(() => {
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            });
            toast.success('Done!');
        }).catch(err => {
            throw err;
        });
    }
}