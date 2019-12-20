import React from 'react';
import styled from 'styled-components';
//eslint-disable-next-line
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import PracticeBtn from '../../shared/PracticeBtn/PracticeBtn';
import PageTitle from '../../shared/PageTitle/PageTitle';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
    align-content: flex-start;
	align-content: center;
    position: relative;
    padding-top: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Wrapper = styled.div`
	position: relative;
	width: auto;
	height: auto;
	margin: 20px;
`

const StyledPracticeBtn = styled(PracticeBtn)`
	display: flex;
	flex-direction: column;
`

const Sentences = () => {
    return (
        <Container>
            <Helmet>
                <title>Sentences - Korean practice</title>
            </Helmet>
            <PageTitle>Sentences</PageTitle>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/to-have" bordercolor="#795548">
                    To have <br /> 있다
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/describe-nouns" bordercolor="#795548">
                    Describing nouns
                </StyledPracticeBtn>
            </Wrapper>
        </Container>
    );
};

export default Sentences;