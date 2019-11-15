import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import { getNouns } from '../../../actions/wordsAction';

import PracticeBtn from '../../../shared/PracticeBtn/PracticeBtn';
import PageTitle from '../../../shared/PageTitle/PageTitle';
import PageLoader from './../../../shared/PageLoader/PageLoader';

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

const Text = styled.p`
	
`

const Nouns = ({location, firestore, getNouns, nouns}) => {
	useEffect(() => {
		getNouns(firestore, location.pathname.split('/')[3])
	}, [location, firestore, getNouns])

	const siema = () => {
		alert('siema');
	}

	return (
		<Container>
			<PageTitle>{`Nouns / ${location.pathname.split('/')[3]}`}</PageTitle>
			{
				nouns ? (
					nouns.map((item, key) => {
						return (
							<StyledPracticeBtn key={key} small={true} onClick={siema} bordercolor="#9c27b0">
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
		nouns: state.wordsReducer.nouns
	}
}

export default connect(mapStateToProps, { getNouns })(withFirestore(withRouter(Nouns)));