import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Container = styled(Link)`
	width: 288px;
	height: 313px;
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	font-size: 36px;
	color: #fff;
	font-family: ${props => props.theme.mainFont};
	border: 3px solid ${({bordercolor}) => bordercolor && bordercolor};
`

const PracticeBtn = ({bordercolor, children, to, className}) => {
	return (
		<Container to={to} bordercolor={bordercolor} className={className}>
			{children}
		</Container>
	);
};

PracticeBtn.defaultProps = {
	bordercolor: "#00bcd4"
}

PracticeBtn.propTypes = {
	bordercolor: PropTypes.string,
	children: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired
}

export default PracticeBtn;