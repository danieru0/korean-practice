import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import { getWords, clearWords, saveWord } from '../../actions/wordsAction';

import PracticeBtn from '../../shared/PracticeBtn/PracticeBtn';
import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';
import MainLoader from '../../shared/MainLoader/MainLoader';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	max-height: auto;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: flex-start;
	position: relative;
	padding-top: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const StyledPageLoader = styled(PageLoader)`
	position: absolute !important;
	margin: auto;
	top: 0;
	bottom: 0;
`

const SaveButton = styled.button`
	position: absolute;
	left: 0px;
	top: 0px;
	border: 0px;
	background: transparent;
	color: #fff;
	font-family: ${props => props.theme.mainFont};
	padding: 5px 10px;
	font-size: 14px;
	border-bottom: 2px solid #9c27b0;
	border-right: 2px solid #9c27b0;
	text-transform: uppercase;

	&:hover {
		color: #ccc;
	}
`

const StyledPracticeBtn = styled(PracticeBtn)`
	margin: 20px;
	font-size: 20px;
	display: flex;
	flex-direction: column;
	position: relative;
`

const Line = styled.hr`
	width: 60%;
`

const Text = styled.p``

const WordContainer = ({type, location, firestore, getWords, clearWords, saveWord, wordSaving, words, auth, lastWord, profile}) => {
	const [scrollDown, setScrollDown] = useState(null);
	useEffect(() => {
		if (scrollDown === false) return;
		switch(type) {
			case 'nouns':
				getWords(firestore, 'nouns', lastWord, location.pathname.split('/')[3], scrollDown);
				break;
			case 'adjectives':
				getWords(firestore, 'adjectives', lastWord, null, scrollDown);
				break;
			case 'verbs':
				getWords(firestore, 'verbs', lastWord, null, scrollDown);
				break;
			case 'adverbs':
				getWords(firestore, 'adverbs', lastWord, null, scrollDown);
				break;
			case 'months':
				getWords(firestore, 'months', lastWord, null, scrollDown);
				break;
			default: return false;
		}
		// eslint-disable-next-line
	}, [type, location, firestore, getWords, scrollDown])

	const handleScroll = useCallback(() => {
		if (containerRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
			if (words.length !== 0) {
				setScrollDown(true);
			}
		}
	}, [words])

	useEffect(() => {
		document.addEventListener('scroll', handleScroll);

		return (() => {
			document.removeEventListener('scroll', handleScroll);
		})
	}, [handleScroll]);

	useEffect(() => {
		setScrollDown(false);
	}, [words])

	useEffect(() => {
		return () => {
			clearWords();
		}
	}, [clearWords])

	const containerRef = useRef(null);

	const handleWordSave = item => {
		saveWord(firestore, type, item, profile);
	}

	return (
		<Container ref={containerRef}>
			<Helmet>
				<title>{`${type === 'nouns' ? `Nouns / ${location.pathname.split('/')[3]}` : type.charAt(0).toUpperCase() + type.slice(1)} - Korean practice`}</title>
			</Helmet>
			<PageTitle>{type === 'nouns' ? `Nouns / ${location.pathname.split('/')[3]}` : type}</PageTitle>
			<MainLoader show={wordSaving} />
			{
				words.length !== 0 ? (
					words.map((item, key) => {
						return (
							<StyledPracticeBtn key={key} notClickable small={true} bordercolor="#9c27b0">
								{auth.uid && <SaveButton onClick={() => handleWordSave(item)}>Save</SaveButton>}
								<Text>{item.korean}</Text>
								<Line />
								<Text>{item.english}</Text>
							</StyledPracticeBtn>
						)
					})
				) : (
					<StyledPageLoader />
				)
			}
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		words: state.wordsReducer.words,
		wordSaving: state.wordsReducer.wordSaving,
		lastWord: state.wordsReducer.lastWord,
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps, { getWords, clearWords, saveWord })(withFirestore(withRouter(WordContainer)));