import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import { getSavedWords, clearWords } from '../../actions/wordsAction';

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

const Saved = ({firestore, location, getSavedWords, clearWords, saved}) => {
	useEffect(() => {
		getSavedWords(firestore, location.pathname.split('/')[2], '01');
		return (() => {
			clearWords();
		})
	}, [location, firestore, getSavedWords, clearWords]);

	const removeWord = (e) => {
		e.stopPropagation();
	}

	return (
		<Container>
			<PageTitle>{`Saved ${location.pathname.split('/')[2]}`}</PageTitle>
			{
				saved.length !== 0 ? (
					saved[0].map((item, key) => {
						return (
							<StyledPracticeBtn key={key} small notClickable bordercolor="#9c27b0">
								<RemoveButton onClick={removeWord}>Delete</RemoveButton>
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
		saved: state.wordsReducer.saved
	}
}

export default connect(mapStateToProps, { getSavedWords, clearWords })(withFirestore(withRouter(Saved)));