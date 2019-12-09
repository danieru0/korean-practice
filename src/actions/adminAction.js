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

export const getSpecificUser = (firestore, uid) => {
    return async dispatch => {
        try {
            const doc = await firestore.collection('users').doc(uid).get();

            if (doc.empty) throw new Error('Empty');

            dispatch({
                type: 'UPDATE_SPECIFIC_USER',
                data: {...doc.data(), createdAt: doc.data().createdAt.toDate()}
            });
        } catch (err) {
            throw err;
        }
    }
}

export const clearSpecificUser = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_SPECIFIC_USER'
        })
    }
}

export const setUserAdmin = (firestore, uid, boolean) => {
    return dispatch => {
        firestore.collection('users').doc(uid).update({
            isAdmin: boolean
        }).then(() => {
            toast.success('Updated!');
            window.location.reload();
        }).catch(err => {
            throw err;
        });
    }
}

export const removeUserAvatar = (firestore, uid) => {
    return dispatch => {
        firestore.collection('users').doc(uid).update({
            avatar: 'https://i.pravatar.cc/'
        }).then(() => {
            toast.success('Updated!');
            window.location.reload();
        }).catch(err => {
            throw err;
        })
    }
}

export const getUsers = (firestore, searchValue, searchType, sortBy, sortType, lastUser) => {
    return dispatch => {
        if (!searchValue) {
            if (!lastUser) {
                dispatch({
                    type: 'CLEAR_LAST_USER'
                });

                firestore.collection('users').orderBy(sortBy, sortType).limit(15).get().then(doc => {
                    let users = [];
                    doc.forEach(item => users.push({...item.data(), createdAt: item.data().createdAt.toDate()}));
            
                    dispatch({
                        type: 'UPDATE_USERS',
                        data: users,
                        init: true
                    });
                    dispatch({
                        type: 'UPDATE_LAST_USER',
                        data: doc.docs[doc.docs.length-1]
                    });
                }).catch(err => {
                    throw err;
                });
            } else {
                firestore.collection('users').orderBy(sortBy, sortType).startAfter(lastUser).limit(15).get().then(doc => {
                    let users = [];
                    doc.forEach(item => users.push({...item.data(), createdAt: item.data().createdAt.toDate()}));

                    dispatch({
                        type: 'UPDATE_USERS',
                        data: users
                    });
                    dispatch({
                        type: 'UPDATE_LAST_USER',
                        data: doc.docs[doc.docs.length-1]
                    });
                }).catch(err => {
                    throw err;
                })
            }
        } else {
            if (!lastUser) {
                dispatch({
                    type: 'CLEAR_LAST_USER'
                });

                firestore.collection('users').where(searchType, "==", searchValue).limit(15).get().then(doc => {
                    let users = [];
                    doc.forEach(item => users.push({...item.data(), createdAt: item.data().createdAt.toDate()}));

                    dispatch({
                        type: 'UPDATE_USERS',
                        data: users,
                        init: true
                    });
                    dispatch({
                        type: 'UPDATE_LAST_USER',
                        data: doc.docs[doc.docs.length-1]
                    });
                })
            } else {
                firestore.collection('users').where(searchType, "==", searchValue).startAfter(lastUser).limit(15).get().then(doc => {
                    let users = [];
                    doc.forEach(item => users.push({...item.data(), createdAt: item.data().createdAt.toDate()}));

                    dispatch({
                        type: 'UPDATE_USERS',
                        data: users
                    });
                    dispatch({
                        type: 'UPDATE_LAST_USER',
                        data: doc.docs[doc.docs.length-1]
                    });
                }).catch(err => {
                    throw err;
                })
            }
        }
    }
}

export const clearLastUser = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_LAST_USER'
        })
    }
}