import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonLink = styled(Link)`
	background: transparent;
	border: 2px solid ${({bordercolor}) => bordercolor};
	color: #ffffff;
	font-family: 'Source Sans Pro';
	padding: 8px 15px;
	text-decoration: none;
	cursor: pointer;
	font-size: 14px;
`

const ButtonNormal = styled.button`
	background: transparent;
	border: 2px solid ${({bordercolor}) => bordercolor};
	color: #ffffff;
	font-family: 'Source Sans Pro';
	padding: 8px 15px;
	cursor: pointer;
	font-size: 14px;
`

const NormalBtn = ({href, children, bordercolor, onClick, className}) => {
	let button;

	if (href) {
		button = <ButtonLink className={className} bordercolor={bordercolor} to={href}>{children}</ButtonLink>
	} else {
		button = <ButtonNormal className={className} bordercolor={bordercolor} onClick={onClick}>{children}</ButtonNormal>
	}

	return button;
};

NormalBtn.defaultProps = {
	bordercolor: '#8bc34a'
};

NormalBtn.propTypes = {
	href: PropTypes.string,
	bordercolor: PropTypes.string
}

export default NormalBtn;