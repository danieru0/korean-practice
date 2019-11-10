import React from 'react';
import styled from 'styled-components';

const Container = styled.p`
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

const PageTitle = ({children, className}) => {
	return (
		<Container className={className}>
			{children}
		</Container>
	);
};

export default PageTitle;