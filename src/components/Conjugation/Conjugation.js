import React from 'react';
import styled from 'styled-components';
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

const TestLink = styled(Link)`
    position: absolute;
	left: 0px;
	top: 0px;
	border: 0px;
	background: transparent;
	color: #fff;
	font-family: ${props => props.theme.mainFont};
	padding: 10px 15px;
	font-size: 16px;
	border-bottom: 3px solid #ff9800;
	border-right: 3px solid #ff9800;
	text-transform: uppercase;
    text-decoration: none;

	&:hover {
		color: #ccc;
	}
`

const Conjugation = () => {
    return (
        <Container>
			<Helmet>
				<title>Conjugation - Korean practice</title>
			</Helmet>
            <PageTitle>Conjugation</PageTitle>
			<Wrapper>
				<TestLink to="/testtwo/past-tense">Test</TestLink>
				<StyledPracticeBtn to="/conjugation/past-tense" bordercolor="#ff9800">
					Past tense
				</StyledPracticeBtn> 
			</Wrapper>
			<Wrapper>
				<TestLink to="/testtwo/present-tense">Test</TestLink>
				<StyledPracticeBtn to="/conjugation/present-tense" bordercolor="#ff9800">
					Present tense
				</StyledPracticeBtn>
			</Wrapper>
        </Container>
    );
};

export default Conjugation;