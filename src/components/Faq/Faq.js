import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	@media (max-width: 600px) {
		width: 100%;
		margin: 0;
	}

	@media (max-height: 550px) {
		height: auto;
	}
`

const PageTitle = styled.p`
	position: absolute;
	top: 20px;
	text-align: center;
	font-size: 40px;
	color: ${props => props.theme.mainFontColor};
	font-family: ${props => props.theme.mainFont};
	text-transform: uppercase;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
`

const Wrapper = styled.div`
	width: 600px;
	height: auto;
	display: flex;
	flex-direction: column;
	color: ${props => props.theme.mainFontColor};
	font-family: ${props => props.theme.mainFont};

	@media (max-width: 850px) {
		padding: 0px 20px;
	}

	@media (max-height: 550px) {
		margin: 60px 0px;
	}
`

const Question = styled.p`
	font-size: 28px;
	margin: 15px 0px 3px 0px;

	@media (max-width: 450px) {
		font-size: 24px;
	}
`

const Answer = styled.p`
	font-size: 18px;

	@media (max-width: 450px) {
		font-size: 16px;
	}
`

const Faq = () => {
	return (
		<Container>
			<PageTitle>FAQ</PageTitle>
			<Wrapper>
				<Question>What data are saved?</Question>
				<Answer>When you register an account, data such as: Your nick, email, avatar, password and experience are saved.</Answer>
				<Question>Why are these data saved?</Question>
				<Answer>Email and password is required for registration, nick is needed for communication. Everything else is saved for proper functioning of this website when you're logged in. </Answer>
				<Question>Where my data is stored</Question>
				<Answer>All your data is stored on Firebase database developed by Google.</Answer>
				<Question>For how long my data is stored?</Question>
				<Answer>Your data is stored until you decide to delete your account.</Answer>
				<Question>How to delete my account?</Question>
				<Answer>This option can be found in settings. (Home/settings)</Answer>
				<Question>How to contact with you?</Question>
				<Answer>Email: dabrowskidaniel006@gmail.com</Answer>
			</Wrapper>
		</Container>
	);
};

export default Faq;