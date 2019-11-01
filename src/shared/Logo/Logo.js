import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.a`
	color: ${props => props.theme.mainFontColor};
	font-family: ${props => props.theme.mainFont};
	text-decoration: none;
	text-transform: uppercase;
	letter-spacing: 1px;

	${props => {
		switch(props.size) {
			case "small":
				return "font-size: 26px"
			case "large":
				return "font-size: 56px"
			default: return "font-size: 32px";
		}
	}}
`

const SectionOne = styled.p``
const SectionTwo = styled.p`
	margin-left: 10px;

	${props => {
		switch(props.size) {
			case "small":
				return "margin-top: -6px"
			case "large":
				return "margin-top: -15px"
			default: return "margin-top: -6px"
		}
	}}
`

const Logo = ({size}) => {
	return (
		<Container href="/" size={size}>
			<SectionOne>Korean</SectionOne>
			<SectionTwo size={size}>Practice</SectionTwo>
		</Container>
	);
};

Logo.propTypes = {
	size: PropTypes.string
}

export default Logo;