import getRandomNumber from '../utils/getRandomNumber';
import * as hangul from 'hangul-js';
import { handleErrors } from './errorsAction';
import * as helpers from '../utils/hangulHelpers';

export const getLinks = (firestore) => {
    return async dispatch => {
        try {
            const result = await firestore.collection('sentences').doc('links').get();

            dispatch({
                type: 'UPDATE_SENTENCE_LINKS',
                data: result.data().links
            })
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const getSentenceData = (firestore, category, explanation) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: 'MAIN_LOADER_SHOW'
            });
    
            const {counters} = getState().settingsReducer;
            let data;
    
            if (!explanation) {
                data = await firestore.collection('sentences').doc(category).get();
                data = data.data();
                
                if (data === undefined) throw new Error('404');
            } else {
                data = explanation;
            }
    
            switch(category) {
                case 'for-amount':
                    return dispatch(getForAmount(firestore, counters, data));
                default: dispatch(processData(firestore, counters, data));
            }
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const processData = (firestore, counters, data) => {
    return dispatch => {
        try {
            let getWords = [];
            let irregular = 0;
            const getProcess = new Promise((resolve, reject) => {
                if (data.process.get === null) {
                    resolve();
                }

                let counter = 0;
                data.process.get.forEach(item => {
                    let counterName = item;
                    if (item === 'adjectives') {
                        counterName = 'adjective'
                    } else if (item === 'verbs') {
                        counterName = 'verb';
                    }
                    firestore.collection(item).doc(getRandomNumber(counters[counterName])).get().then(doc => {
                        const snapshot = doc.data();
                        if (snapshot.word) {
                            snapshot.word.get().then(word => {
                                getWords.push({...snapshot, word: word.data()});
                                counter++;
                                if (counter === data.process.get.length) {
                                    resolve();
                                }
                            })
                        } else {
                            getWords.push({...snapshot, wordHanguljs: hangul.disassemble(doc.data().korean)});
                            counter++;
                            if (counter === data.process.get.length) {
                                resolve();
                            }
                        }
                    }).catch(err => {
                        reject(err);
                    })
                })
            });

            getProcess.then(() => {
                const taskProcess = new Promise((resolve, reject) => {
                    if (data.process.tasks === null) {
                        resolve();
                    }

                    let counter = 0;

                    data.process.tasks.forEach((task, id) => {
                        counter++;
                        for (let property in task) {
                            const taskName = property;
                            const value = task[property];
    
                            switch(taskName) {
                                case 'push':
                                    if (value.split('')[0] !== '-') {
                                        getWords[id]['wordHanguljs'].push(value);
                                    } else {
                                        if (value !== '-describeNouns') {
                                            const functionName = `add${value.split('-')[1].charAt(0).toUpperCase() + value.split('-')[1].slice(1).toLowerCase()}`;
                                            getWords[id]['wordHanguljs'] = helpers[functionName](getWords[id]['wordHanguljs']);
                                        } else if (value === '-describeNouns') {
                                            const conjugated = helpers.addDescribeNouns(getWords[id]['wordHanguljs']);
                                            getWords[id]['wordHanguljs'] = conjugated[0];
                                            irregular = conjugated[1];
                                        } else {
                                            throw new Error('404');
                                        }
                                    }
                                    break;
                                default: throw new Error('404');
                            }

                            if (counter === data.process.tasks.length) {
                                resolve();
                            }
                        }
                    })
                });

                taskProcess.then(() => {
                    const sentence = [];
                    const sentenceInCaseOfConjugation = [];
                    const translation = [];

                    data.sentence.forEach(item => {
                        if (typeof item === 'string') {
                            const itemArray = item.split('');

                            if (itemArray[0] === '!') {
                                let itemArray = item.split('');
                                sentence.push(getWords[itemArray[1]][itemArray[2]]);
                                return false;
                            }

                            if (item === 'conjugation') {
                                Object.keys(data.conjugation).map(key => {
                                    return sentenceInCaseOfConjugation.push(`${sentence} ${data.conjugation[key]}`);
                                })
                                return false;
                            }
                                
                            sentence.push(item);
                        } else if (typeof item === 'number') {
                            sentence.push(hangul.assemble(getWords[item]['wordHanguljs']));
                        }
                    })

                    if (data.translation) {
                        data.translation.forEach((item, id) => {
                            if (item === 'word') {
                                translation.push(getWords[id][item])
                            } else if (item === null) {
                                translation.push(getWords[id]);
                            } else {
                                translation.push(item);
                            }
                        })
                    }

                    dispatch({
                        type: 'UPDATE_SENTENCE_DATA',
                        explanation: data,
                        sentence: sentenceInCaseOfConjugation.length !== 0 ? sentenceInCaseOfConjugation : sentence.join(' '),
                        translation: data.translation ? translation : getWords,
                        nextButton: data.options && data.options.nextButton,
                        irregular: irregular
                    });
                    dispatch({
                        type: 'MAIN_LOADER_HIDE'
                    });
                })
            });
        } catch (err) {
            dispatch(handleErrors(err));
        }
    }
}

export const clearSentenceData = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_SENTENCE_DATA'
        });
    }
}

export const getForAmount = (firestore, counters, data) => {
    return async dispatch => {
        try {
            const randomPastTense = await firestore.collection('past-tense').doc(getRandomNumber(counters['past-tense'])).get();
            const word = await randomPastTense.data().word.get();
            const randomCounter = await firestore.collection('counters').doc(getRandomNumber(counters.counters)).get();
            const randomNumber = await firestore.collection(randomCounter.data().numbers).doc(getRandomNumber(counters[randomCounter.data().numbers] - 4)).get();

            dispatch({
                type: 'UPDATE_SENTENCE_DATA',
                explanation: data,
                sentence: `${randomNumber.data()[randomCounter.data().type]}${randomCounter.data().numbers === 'sino-numbers' ? '' : ' '}${randomCounter.data().korean} 동안 ${randomPastTense.data()[2]}`,
                translation: [randomNumber.data(), randomCounter.data(), word.data()]
            });
            dispatch({
                type: 'MAIN_LOADER_HIDE'
            }); 
        } catch (err) {
           dispatch(handleErrors(err));
        }
    }
}