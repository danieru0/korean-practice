import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import Helmet from 'react-helmet';

import { getRandomWord, clearRandomWord } from '../../actions/wordsAction';

import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
    padding-top: 80px;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: center;
    text-align: center;
    flex-direction: column;
    position: relative;
    font-family: ${props => props.theme.mainFont};

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const WordToType = styled.div`
    font-size: 64px;
    color: #ffeb3b;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`

const WordTranslation = styled.span`
    font-size: 28px;
    color: #fff;
`

const Input = styled.input`
    padding: 20px 30px;
    font-size: 42px;
    background: none;
    border: none;
    border-bottom: ${({correct}) => correct ? '3px solid green' : '3px solid grey'};
    color: ${({correct}) => correct ? 'green' : '#fff'};
    text-align: center;
    transition: all .3s;

    &::placeholder {
        font-style: italic;
    }

    @media (max-width: 800px) {
        padding: auto;
        width: 90%;
    }
`

const Typing = ({getRandomWord, clearRandomWord, firestore, location, oneWord, loadingOneWord}) => {
    const [correctValue, setCorrectValue] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        getRandomWord(firestore, location.pathname.split('/')[2]);

        return () => {
            clearRandomWord();
        }
    }, [firestore, location, getRandomWord, clearRandomWord]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.value = '';
        }     
    }, [oneWord]);

    const handleInputChange = e => {
        if (e.target.value === oneWord.korean) {
            setCorrectValue(true);
            setTimeout(() => {
                setCorrectValue(false);
                getRandomWord(firestore, location.pathname.split('/')[2]);
            }, 2000);
        }
    }

    return (
        <Container>
            <Helmet>
                <title>Typing - Korean practice</title>
            </Helmet>
            <PageTitle>Typing</PageTitle>
            {
                oneWord ? (
                    <>
                        {
                            loadingOneWord ? (
                                    <WordToType>
                                    <PageLoader />
                                    </WordToType>
                            ) : (
                                <>
                                    <WordToType>
                                        {oneWord.korean}
                                    </WordToType>
                                    <WordTranslation>
                                        {oneWord.english}
                                    </WordTranslation>
                                </>
                            )
                        }
                        <Input ref={inputRef} disabled={correctValue} correct={correctValue} onChange={handleInputChange} autoComplete="off" placeholder="Type here..." />
                    </>
                ) : (
                    <PageLoader />
                )
            }

        </Container>
    );
};

const mapStateToProps = state => {
    return {
        oneWord: state.wordsReducer.oneWord,
        loadingOneWord: state.wordsReducer.loadingOneWord
    }
}

export default connect(mapStateToProps, { getRandomWord, clearRandomWord })(withFirestore(withRouter(Typing)));