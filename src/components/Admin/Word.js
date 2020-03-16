import React, { useState } from 'react';
import styled from 'styled-components';
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { addNewWord } from '../../actions/adminAction';

import PageTitle from '../../shared/PageTitle/PageTitle';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Wrapper = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;

    @media (max-width: 524px) {
        padding: 0px 20px;
    }
`

const Input = styled.input`
    width: 100%;
    height: 60px;
    font-size: 32px;
    color: #fff;
    font-family: ${props => props.theme.mainFont};
    background: none;
    border: none;
    border-bottom: 3px solid #bdbdbd;
    margin: 10px 0px;

    &::placeholder {
        color: #bbb;
    }
`

const Select = styled.select`
    width: 100%;
    height: 50px;
    margin-top: 5px;
`

const Option = styled.option`

`

const SaveBtn = styled.button`
    width: 80px;
    height: 40px;
    background: #fff;
    border: 1px solid #000;
    font-family: ${props => props.theme.mainFont};
`

const Word = ({addNewWord, firestore}) => {
    const [type, setType] = useState('nouns');
    const [forCounter, setForCounter] = useState('nouns');
    const [word, setWord] = useState({
        english: '',
        korean: '',
        type: '',
        stem: '',
        queryArray: ''
    })

    const handleSelectChange = e => {
        setType(e.target.value.split('-')[0]);
        setForCounter(e.target.value.split('-')[1]);
        setWord({...word, type: '', stem: ''});
    }

    const handleInputChange = e => {
        setWord({...word, [e.target.name]: e.target.value});
    }

    const handleSaveBtn = () => {
        setWord({...word, queryArray: word.english.split(' ')});
        console.log(word);
        if (word.english && word.korean) {
            if (word.type || word.stem) {
                addNewWord(firestore, word, type, forCounter)
            } else {
                if (type === 'adverbs') {
                    addNewWord(firestore, word, type, forCounter)
                } else {
                    alert('Missing category or stem');
                }
            }
        } else {
            alert('Missing english or korean');
        }
    }

    return (
        <Container>
            <Helmet>
                <title>Word Admin - Korean practice</title>
            </Helmet>
            <PageTitle>Add word</PageTitle>
            <Wrapper>
                <Input onChange={handleInputChange} name="english" value={word.english} placeholder="English"/>
                <Input onChange={handleInputChange} name="korean" value={word.korean} placeholder="Korean"/>
                <Select onClick={handleSelectChange} defaultValue="nouns-nouns">
                    <Option value="nouns-nouns">Nouns</Option>
                    <Option value="adjectives-adjective">Adjective</Option>
                    <Option value="verbs-verb">Verb</Option>
                    <Option value="adverbs-adverbs">Adverb</Option>
                </Select>
                {
                    type === 'nouns' ? (
                        <Input onChange={handleInputChange} name="type" value={word.type} placeholder="Category"/>
                    ) : (
                        type !== 'adverbs' && (
                            <Input onChange={handleInputChange} name="stem" value={word.stem} placeholder="Stem"/>
                        )
                    )
                }
                <SaveBtn onClick={handleSaveBtn}>Save</SaveBtn>
            </Wrapper>
        </Container>
    );
};

export default connect(null, { addNewWord })(withFirestore(Word));