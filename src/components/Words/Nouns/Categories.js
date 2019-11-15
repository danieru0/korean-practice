import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { getNounsCategories } from '../../../actions/wordsAction';

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
`

const Categories = ({firestore, getNounsCategories, nounsCategories}) => {

	useEffect(() => {
		getNounsCategories(firestore);
	}, [getNounsCategories, firestore])

	return (
		<Container>
			<PageTitle>Nouns / Categories</PageTitle>
			{
				nounsCategories ? (
					nounsCategories.types.map((item, key) => {
						return (
							<StyledPracticeBtn key={key} bordercolor="#9c27b0" to={`/words/nouns/${item}`}>{item}</StyledPracticeBtn>
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
		nounsCategories: state.wordsReducer.nounsCategories
	}
}

export default connect(mapStateToProps, { getNounsCategories })(withFirestore(Categories));