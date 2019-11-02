import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import Logo from '../../shared/Logo/Logo';

const fade = keyframes`
	from {
		opacity: 1;
	} to {
		opacity: 0;
	}
`

const Container = styled.div`
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0,0,0,0.4);
	z-index: 999999999;
`

const StyledLogo = styled(Logo)`
	position: absolute;
	bottom: 40px;
	right: 50px;
	animation: ${fade} 1s ease-in-out infinite alternate-reverse;
	user-select: none;
	cursor: default;
	outline: none;
`

const MainLoader = ({mainLoaderVisible}) => {
	if (mainLoaderVisible === false) {
		return null;
	}

	return (
		<Container>
			<StyledLogo notClickable size="small"/>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		mainLoaderVisible: state.mainLoaderReducer.mainLoaderVisible
	}
}

export default connect(mapStateToProps, null)(MainLoader);