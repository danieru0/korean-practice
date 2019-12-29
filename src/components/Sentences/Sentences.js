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
                <StyledPracticeBtn to="/sentences/ida" bordercolor="#795548">
                    To be <br /> 이다
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/to-have" bordercolor="#795548">
                    To have <br /> 있다
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/to-be-at-location" bordercolor="#795548">
                    To be at location <br /> 있다
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/possessive" bordercolor="#795548">
                    Possessive particle <br /> 의
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/describe-nouns" bordercolor="#795548">
                    Describing nouns <br /> ㄴ/은
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/negative-sentence-1" bordercolor="#795548">
                    Negative sentence <br /> 안
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/negative-sentence-2" bordercolor="#795548">
                    Negative sentence <br /> 지 않다
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/to-not-have" bordercolor="#795548">
                    To not have <br /> 없다
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/sentences/to-not-be" bordercolor="#795548">
                    To not be <br /> 아니다
                </StyledPracticeBtn>
            </Wrapper>
        </Container>
    );
};

export default Sentences;