import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonLink = styled(Link)`
	background: transparent;
	border: 2px solid ${({borderColor}) => borderColor};
	color: #ffffff;
	font-family: 'Source Sans Pro';
	padding: 8px 15px;
	text-decoration: none;
	cursor: pointer;
	font-size: 14px;
`

const ButtonNormal = styled.button`
	background: transparent;
	border: 2px solid ${({borderColor}) => borderColor};
	color: #ffffff;
	font-family: 'Source Sans Pro';
	padding: 8px 15px;
	cursor: pointer;
	font-size: 14px;
`

const NormalBtn = ({href, children, borderColor, onClick, className}) => {
	let button;

	if (href) {
		button = <ButtonLink className={className} borderColor={borderColor} to={href}>{children}</ButtonLink>
	} else {
		button = <ButtonNormal className={className} borderColor={borderColor} onClick={onClick}>{children}</ButtonNormal>
	}

	return button;
};

NormalBtn.defaultProps = {
	borderColor: '#8bc34a'
};

NormalBtn.propTypes = {
	href: PropTypes.string,
	borderColor: PropTypes.string
}

export default NormalBtn;