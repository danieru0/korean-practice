import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import Helmet from 'react-helmet';

import { signUp, clearAuthState } from '../../../actions/authAction';

import PageTitle from '../../../shared/PageTitle/PageTitle';
import Input from '../../../shared/Input/Input';
import AuthBtn from '../../../shared/AuthBtn/AuthBtn';

const Container = styled.form`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;

	@media (max-width: 600px) {
		width: 100%;
		margin: 0;
	}

	@media (max-height: 580px) {
		height: 570px;
	}
`

const StyledInput = styled(Input)`
	margin: 10px 0px;
`

const ErrorMessage = styled.p`
	font-family: ${props => props.theme.mainFont};
	color: #ff0000;
	font-size: 16px;
	width: 250px;
	margin-top: -8px;
	margin-bottom: 5px;
`

const Info = styled.p`
	color: ${props => props.theme.infoColor};
	font-size: 14px;
	font-family: ${props => props.theme.mainFont};
	text-align: center;
	line-height: 20px;
	margin-top: -8px;
	margin-bottom: 5px;
`

const StyledLink = styled(Link)`
	color: ${props => props.theme.infoColor};	
`


const Register = ({firestore, authError, signUp, clearAuthState, authStart, authSuccess}) => {
	const [nickInput, setNickInput] = useState(null);
	const [emailInput, setEmailInput] = useState(null);
	const [passwordInput, setPasswordInput] = useState(null);
	const [repeatPasswordInput, setRepeatPasswordInput] = useState(null);

	useEffect(() => {
		return () => {
			clearAuthState();
		}
	}, [clearAuthState]);

	const handleSignUpButton = e => {
		e.preventDefault();

		if (authStart === false) {
			signUp(firestore, nickInput, emailInput, passwordInput, repeatPasswordInput);
		}
	}

	if (authSuccess === true) {
		return <Redirect to="/login" />
	}
 
	return (
		<Container>
			<Helmet>
				<title>Register - Korean practice</title>
			</Helmet>
			<PageTitle>Sign up</PageTitle>
			<StyledInput onChange={(value) => setNickInput(value)} label="Nick:" placeholder="Nick..."/>
			<ErrorMessage>{authError.nick}</ErrorMessage>
			<StyledInput onChange={(value) => setEmailInput(value)} label="Email:" placeholder="Email..." type="email"/>
			<ErrorMessage>{authError.email}</ErrorMessage>
			<StyledInput onChange={(value) => setPasswordInput(value)} label="Password:" placeholder="Password..." type="password"/>
			<ErrorMessage>{authError.password}</ErrorMessage>
			<StyledInput onChange={(value) => setRepeatPasswordInput(value)} label="Repeat password:" placeholder="Repeat password..." type="password"/>
			<ErrorMessage>{authError.password}</ErrorMessage>
			<Info>By clicking sign up button you accept the information <br />found in the <StyledLink to="/faq">FAQ</StyledLink> section</Info>
			<AuthBtn onClick={handleSignUpButton}>Sign up</AuthBtn>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		authError: state.authReducer.authError,
		authStart: state.authReducer.authStart,
		authSuccess: state.authReducer.authSuccess
	}
}

export default connect(mapStateToProps, { signUp, clearAuthState })(withFirestore(Register));