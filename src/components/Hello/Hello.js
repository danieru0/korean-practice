import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

import Logo from '../../shared/Logo/Logo';
import AuthBtn from '../../shared/AuthBtn/AuthBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	margin-left: 200px;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

const HelloGreeting = styled.p`
	font-size: 58px;
	color: #ffff00;
	margin-top: 40px;
`

const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 290px;
	margin-top: 10px;
`

const Info = styled.p`
	color: ${props => props.theme.infoColor};
	font-size: 16px;
	font-family: ${props => props.theme.mainFont};
	text-align: center;
	margin-top: 20px;
	margin-bottom: 30px;
	line-height: 20px;
`

const Heart = styled(FontAwesome)`
	font-size: 13px;
	color: #ff0000;
`

const Link = styled.a`
	color: ${props => props.theme.infoColor};
`

const Hello = () => {
	return (
		<Container>
			<Logo size="large" />
			<HelloGreeting>안녕하세요!</HelloGreeting>
			<ButtonsWrapper>
				<AuthBtn href="/login">Log in</AuthBtn>
				<AuthBtn href="/register">Sign in</AuthBtn>
			</ButtonsWrapper>
			<Info>
				Made with <Heart name="heart"/> by <Link href="https://github.com/elosiktv">Daniel Dąbrowski</Link> <br />
				Based on <Link href="https://www.howtostudykorean.com/">howtostudykorean.com</Link> <br /><br />
				<Link href="/faq">FAQ</Link>
			</Info>
		</Container>
	);
};

export default Hello;