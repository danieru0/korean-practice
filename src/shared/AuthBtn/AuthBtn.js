import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = styled(Link)`
	background: #8bc34a;
	color: #ffffff;
	font-size: 20px;
	border: none;
	text-transform: uppercase;
	font-weight: 600;
	font-family: ${props => props.theme.mainFont};
	padding: 8px 15px;
	text-decoration: none;
`

const AuthBtn = ({children, href}) => {
	return (
		<Button to={href}>
			{children}
		</Button>
	);
};

AuthBtn.propTypes = {
	href: PropTypes.string
}

export default AuthBtn;