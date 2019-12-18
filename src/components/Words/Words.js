import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import PracticeBtn from '../../shared/PracticeBtn/PracticeBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: center;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const StyledPracticeBtn = styled(PracticeBtn)`
	margin: 20px 70px;
`

const Words = () => {
	return (
		<Container>
			<Helmet>
				<title>Words - Korean practice</title>
			</Helmet>
			<StyledPracticeBtn bordercolor="#00bcd4" to="/words/nouns/categories">Nouns</StyledPracticeBtn>
			<StyledPracticeBtn bordercolor="#00bcd4" to="/words/verbs">Verbs</StyledPracticeBtn>
			<StyledPracticeBtn bordercolor="#00bcd4" to="/words/adjectives">Adjectives</StyledPracticeBtn>
			<StyledPracticeBtn bordercolor="#00bcd4" to="/words/adverbs">Adverbs</StyledPracticeBtn>
			<StyledPracticeBtn bordercolor="#f44336" to="/testone/verb">Test verbs</StyledPracticeBtn>
			<StyledPracticeBtn bordercolor="#f44336" to="/testone/adjective">Test adjectives</StyledPracticeBtn>
		</Container>
	);
};

export default Words;