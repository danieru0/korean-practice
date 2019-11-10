import React from 'react';
import styled from 'styled-components';

import PracticeBtn from '../../shared/PracticeBtn/PracticeBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const StyledPracticeBtn = styled(PracticeBtn)`
	margin: 0px 70px;
`

const Alphabet = () => {
	return (
		<Container>
			<StyledPracticeBtn to="/alphabet/letters">Letters</StyledPracticeBtn>
			<StyledPracticeBtn bordercolor="#ffeb3b" to="/alphabet/blocks">Blocks</StyledPracticeBtn>
		</Container>
	);
};

export default Alphabet;