import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

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

const StyledPracticeBtn = styled(PracticeBtn)`
	margin: 20px;
	font-size: 20px;
	display: flex;
	flex-direction: column;
`

const Line = styled.hr`
	width: 100%;
`

const Text = styled.p``

const WordContainer = ({type, location, firestore, getWords, clearWords, saveWord, wordSaving, words}) => {
	useEffect(() => {
		switch(type) {
			case 'nouns':
				getWords(firestore, 'nouns', '01', location.pathname.split('/')[3]);
				break;
			case 'adjectives':
				getWords(firestore, 'adjectives', '01');
				break;
			case 'verbs':
				getWords(firestore, 'verbs', '01');
				break;
			default: return false;
		}
		return (() => {
			clearWords();
		})
	}, [type, location, firestore, getWords, clearWords])

	const handleWordSave = item => {
		saveWord(firestore, 'nouns', item);
	}

	return (
		<Container>
			<PageTitle>{type === 'nouns' ? `Nouns / ${location.pathname.split('/')[3]}` : type}</PageTitle>
			<MainLoader show={wordSaving} />
			{
				words.length !== 0 ? (
					words[0].map((item, key) => {
						return (
							<StyledPracticeBtn key={key} small={true} onClick={() => handleWordSave(item)} bordercolor="#9c27b0">
								<Text>{item.korean}</Text>
								<Line />
								<Text>{item.english}</Text>
							</StyledPracticeBtn>
						)
					})
				) : (
					<PageLoader />
				)
			}
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		words: state.wordsReducer.words,
		wordSaving: state.wordsReducer.wordSaving
	}
}

export default connect(mapStateToProps, { getWords, clearWords, saveWord })(withFirestore(withRouter(WordContainer)));