import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const Wrapper = styled.div`
	position: relative;
	width: auto;
	height: auto;
	margin: 20px;
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
	border-bottom: 3px solid ${({bordercolor}) => bordercolor};
	border-right: 3px solid ${({bordercolor}) => bordercolor};
	text-transform: uppercase;
    text-decoration: none;

	&:hover {
		color: #ccc;
	}
`

const StyledPracticeBtn = styled(PracticeBtn)`	
	display: flex;
`

const Words = () => {
	return (
		<Container>
			<Helmet>
				<title>Words - Korean practice</title>
			</Helmet>
			<Wrapper>
				<TestLink to="/testone/nouns" bordercolor="#00bcd4">Test all</TestLink>
				<StyledPracticeBtn bordercolor="#00bcd4" to="/words/nouns/categories">Nouns</StyledPracticeBtn>
			</Wrapper>
			<Wrapper>
				<TestLink to="/testone/verb" bordercolor="#00bcd4">Test</TestLink>
				<StyledPracticeBtn bordercolor="#00bcd4" to="/words/verbs">Verbs</StyledPracticeBtn>
			</Wrapper>
			<Wrapper>
				<TestLink to="/testone/adjective" bordercolor="#00bcd4">Test</TestLink>
				<StyledPracticeBtn bordercolor="#00bcd4" to="/words/adjectives">Adjectives</StyledPracticeBtn>
			</Wrapper>
			<Wrapper>
				<TestLink to="/testone/adverbs" bordercolor="#00bcd4">Test</TestLink>
				<StyledPracticeBtn bordercolor="#00bcd4" to="/words/adverbs">Adverbs</StyledPracticeBtn>
			</Wrapper>
		</Container>
	);
};

export default Words;