import React from 'react';
import styled from 'styled-components';
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
    padding-left: 200px;
    padding-right: 200px;

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

const Irregulars = () => {
    return (
        <Container>
            <Helmet>
                <title>Irregulars - Korean practice</title>
            </Helmet>
            <PageTitle>Irregulars</PageTitle>
            <Wrapper>
                <StyledPracticeBtn to="/irregulars/1" bordercolor="#50d890">
                    ㅅ irregular
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/irregulars/2" bordercolor="#50d890">
                    ㄷ irregular
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/irregulars/3" bordercolor="#50d890">
                    ㅂ irregular
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/irregulars/4" bordercolor="#50d890">
                    ㅡ irregular
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/irregulars/5" bordercolor="#50d890">
                    르 irregular
                </StyledPracticeBtn>
            </Wrapper>
            <Wrapper>
                <StyledPracticeBtn to="/irregulars/6" bordercolor="#50d890">
                    ㄹ irregular
                </StyledPracticeBtn>
            </Wrapper>
        </Container>
    );
};

export default Irregulars;