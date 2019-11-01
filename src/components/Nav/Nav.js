import React from 'react';
import styled from 'styled-components';

import Logo from '../../shared/Logo/Logo';

const Container = styled.div`
	width: 200px;
	height: 100vh;
	position: fixed;
	background-color: ${props => props.theme.navColor};
	box-shadow: 0px 10px 15px #000;
	display: flex;
	justify-content: center;
	padding-top: 10px;
	align-items: flex-start;
`

const Nav = () => {
	return (
		<Container>
			<Logo size="small" />
		</Container>
	);
};

export default Nav;