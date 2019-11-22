import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { withRouter, Redirect } from 'react-router-dom';

import { getSavedWords, clearWords, removeSavedWord } from '../../actions/wordsAction';

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

const StyledPracticeBtn = styled(PracticeBtn)`
	margin: 20px;
	font-size: 20px;
	display: flex;
	flex-direction: column;
	position: relative;
`

const RemoveButton = styled.button`
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

const Line = styled.hr`
	width: 60%;
`

const Text = styled.p``

const Saved = ({firestore, location, getSavedWords, clearWords, removeSavedWord, saved, wordDeleting}) => {
	useEffect(() => {
		getSavedWords(firestore, location.pathname.split('/')[2], '01');
		return (() => {
			clearWords();
		})
	}, [location, firestore, getSavedWords, clearWords]);

	const removeWord = (e, id) => {
		e.stopPropagation();
		removeSavedWord(firestore, location.pathname.split('/')[2], id)
	}

	return (
		<Container>
			<MainLoader show={wordDeleting}/>
			<PageTitle>{`Saved ${location.pathname.split('/')[2]}`}</PageTitle>
			{
				saved.length !== 0 ? (
					saved[0].length !== 0 ? (
						saved[0].map((item, key) => {
						return (
							<StyledPracticeBtn key={key} small notClickable bordercolor="#9c27b0">
								<RemoveButton onClick={(e) => removeWord(e, item.id)}>Delete</RemoveButton>
								<Text>{item.korean}</Text>
								<Line />
								<Text>{item.english}</Text>
							</StyledPracticeBtn>
						)
					})
					) : (
						<Redirect to="/404" />
					)

				) : (
					<StyledPageLoader />
				)
			}
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		saved: state.wordsReducer.saved,
		wordDeleting: state.wordsReducer.wordDeleting
	}
}

export default connect(mapStateToProps, { getSavedWords, clearWords, removeSavedWord })(withFirestore(withRouter(Saved)));