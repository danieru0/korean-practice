import * as hangul from 'hangul-js';

export const addIka = (wordArray) => {
    if (hangul.isConsonant(wordArray[wordArray.length - 1])) {
        wordArray.push('이');
    } else {
        wordArray.push('가');
    }

    return wordArray;
}

export const addAnd = (wordArray) => {
    if (hangul.isConsonant(wordArray[wordArray.length - 1])) {
        wordArray.push('과');
    } else {
        wordArray.push('와');
    }

    return wordArray;
}

export const addRyr = (wordArray) => {
    if (hangul.isConsonant(wordArray[wordArray.length - 1])) {
        wordArray.push('을');
    } else {
        wordArray.push('를');
    }

    return wordArray;
}

export const addDescribeNouns = (wordArray) => {
    wordArray.splice(wordArray.length - 2, wordArray.length);
    let irregular = 0;

    if (wordArray[wordArray.length - 1] === 'ㅂ') {
        wordArray.splice(wordArray.length - 1, wordArray.length);
        wordArray.push('운');
        irregular = 3;
    } else {
        if (hangul.isConsonant(wordArray[wordArray.length - 1])) {
            wordArray.push('은');
        } else {
            wordArray.push('ㄴ');
        }
    }

    return [wordArray, irregular];
}

export const addDzi = (wordArray) => {
    wordArray.splice(wordArray.length - 2, wordArray.length);
    wordArray.push('지');
    return wordArray;
}
