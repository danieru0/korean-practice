import React, { useState } from 'react';
import styled from 'styled-components';
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { addNewConjugation } from '../../actions/adminAction'

import PageTitle from '../../shared/PageTitle/PageTitle';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding-top: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Wrapper = styled.div`
    width: 900px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1130px) {
        width: 90%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const Group = styled.div`
    width: 49%;
    height: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 1130px) {
        width: 100%;
    }
`

const Input = styled.input`
    width: 100%;
    height: 60px;
    font-size: 28px;
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
    height: 65px;
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

    &:first-of-type {
        margin-top: 30px;
    }
`

const Conjugation = ({addNewConjugation, firestore}) => {
    const [type, setType] = useState('past-tense');
    const [conjugation, setConjugation] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        breakpoint: '',
        irregular: '',
        word: ''
    });

    const isEmpty = obj => {
        for (let key in obj) {
            if (obj[key] === '') {
                return true
            }
        }
        return false;
    }

    const handleInputChange = e => {
        setConjugation({...conjugation, [e.target.name]: e.target.value});
    }

    const handleTypeChange = e => {
        setType(e.target.value);
    }

    const addConjugation = () => {
        if (isEmpty(conjugation)) {
            alert('Something is missing!');
        } else {
            addNewConjugation(firestore, conjugation, type);
        }
    }

    return (
        <Container>
            <Helmet>
                <title>Conjugation Admin - Korean practice</title>
            </Helmet>
            <PageTitle>Add conjugation</PageTitle>
            <Wrapper>
                <Group>
                    <Input value={conjugation[1]} onChange={handleInputChange} name="1" placeholder="Plain form"/>
                    <Input value={conjugation[2]} onChange={handleInputChange} name="2" placeholder="Informal low respect"/>
                    <Input value={conjugation[3]} onChange={handleInputChange} name="3" placeholder="Informal high respect"/>
                    <Input value={conjugation[4]} onChange={handleInputChange} name="4" placeholder="Formal high respect"/>
                </Group>
                <Group>
                    <Input value={conjugation.breakpoint} onChange={handleInputChange} name="breakpoint" placeholder="Breakpoint"/>
                    <Input value={conjugation.irregular} onChange={handleInputChange} name="irregular" placeholder="Irregular type"/>
                    <Input value={conjugation.word} onChange={handleInputChange} name="word" placeholder="Word reference"/>
                    <Select onChange={handleTypeChange} defaultValue={type}>
                        <Option value="past-tense">past-tense</Option>
                        <Option value="present-tense">present-tense</Option>
                        <Option value="future-tense-1">future-tense-1 겠다</Option>
                    </Select>
                </Group>
            </Wrapper>
            <SaveBtn onClick={addConjugation}>Add</SaveBtn>
            <SaveBtn>Reset</SaveBtn>
        </Container>
    );
};

export default connect(null, { addNewConjugation })(withFirestore(Conjugation));