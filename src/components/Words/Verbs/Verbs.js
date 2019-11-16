import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import { getWords, clearWords, saveWord } from '../../../actions/wordsAction';

import PracticeBtn from '../../../shared/PracticeBtn/PracticeBtn';
import PageTitle from '../../../shared/PageTitle/PageTitle';
import PageLoader from './../../../shared/PageLoader/PageLoader';
import MainLoader from '../../../shared/MainLoader/MainLoader';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	max-height: auto;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: center;
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

const Verbs = ({location, firestore, getWords, clearWords, saveWord, wordSaving, verbs}) => {
	useEffect(() => {
		getWords(firestore, 'verbs', '01');
		return (() => {
			clearWords();
		})
	}, [location, firestore, getWords, clearWords])

	const saveVerb = item => {
		saveWord(firestore, 'verbs', item);
	}

	return (
		<Container>
			<PageTitle>Verbs</PageTitle>
			<MainLoader show={wordSaving} />
			{
				verbs.length !== 0 ? (
					verbs[0].map((item, key) => {
						return (
							<StyledPracticeBtn key={key} small={true} onClick={() => saveVerb(item)} bordercolor="#9c27b0">
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
		verbs: state.wordsReducer.verbs,
		wordSaving: state.wordsReducer.wordSaving
	}
}

export default connect(mapStateToProps, { getWords, clearWords, saveWord })(withFirestore(withRouter(Verbs)));