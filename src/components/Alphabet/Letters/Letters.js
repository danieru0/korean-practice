import React from 'react';
import styled from 'styled-components';

import PracticeBtn from '../../../shared/PracticeBtn/PracticeBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const StyledPracticeBtn = styled(PracticeBtn)`
	margin: 0px 70px;

	@media (max-width: 1483px) {
		margin: 20px 20px;
	}
`

const Letters = () => {
	return (
		<Container>
			<StyledPracticeBtn to="/alphabet/letters/vowels">Vowels</StyledPracticeBtn>
			<StyledPracticeBtn to="/alphabet/letters/consonants">Consonants</StyledPracticeBtn>
			<StyledPracticeBtn bordercolor="#e91e63" to="/testone/letter">Test yourself</StyledPracticeBtn>
		</Container>
	);
};

export default Letters;