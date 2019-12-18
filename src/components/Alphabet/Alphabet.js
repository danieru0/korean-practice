import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import PracticeBtn from '../../shared/PracticeBtn/PracticeBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const StyledPracticeBtn = styled(PracticeBtn)`
	margin: 0px 70px;

	@media (max-width: 1055px) {
		margin: 10px 10px;
	}
`

const Alphabet = () => {
	return (
		<Container>
		<Helmet>
			<title>Alphabet - Korean practice</title>
		</Helmet>
			<StyledPracticeBtn to="/alphabet/letters">Letters</StyledPracticeBtn>
			<StyledPracticeBtn bordercolor="#ffeb3b" to="/alphabet/blocks">Blocks</StyledPracticeBtn>
		</Container>
	);
};

export default Alphabet;