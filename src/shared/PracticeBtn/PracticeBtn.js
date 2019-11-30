import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ContainerLink = styled(Link)`
	width: ${({small}) => small ? '200px' : '288px'};
	height: ${({small}) => small ? '200px' : '313px'};
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	text-align: center;
	font-size: 36px;
	color: #fff;
	font-family: ${props => props.theme.mainFont};
	border: 3px solid ${({bordercolor}) => bordercolor && bordercolor};
`

const ContainerBtn = styled.button`
	width: ${({small}) => small ? '200px' : '288px'};
	height: ${({small}) => small ? '200px' : '313px'};
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	text-transform: uppercase;
	font-size: 36px;
	color: #fff;
	font-family: ${props => props.theme.mainFont};
	border: 3px solid ${({bordercolor}) => bordercolor && bordercolor};
	background: transparent;
`

const ContainerDiv = styled.div`
	width: ${({small}) => small ? '200px' : '288px'};
	height: ${({small}) => small ? '200px' : '313px'};
	text-decoration: none;
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;
	text-transform: uppercase;
	font-size: 36px;
	color: #fff;
	font-family: ${props => props.theme.mainFont};
	border: 3px solid ${({bordercolor}) => bordercolor && bordercolor};
	background: transparent;
`

const PracticeBtn = ({bordercolor, children, to, notClickable, onClick, className, small}) => {
	if (onClick) {
		return <ContainerBtn small={small ? 1 : 0} bordercolor={bordercolor} className={className} onClick={onClick}>{children}</ContainerBtn>
	} else if (notClickable) {
		return 	<ContainerDiv small={small ? 1 : 0} to={to} bordercolor={bordercolor} className={className}>{children}</ContainerDiv>
	} else {
		return <ContainerLink small={small ? 1 : 0} to={to} bordercolor={bordercolor} className={className}>{children}</ContainerLink>
	}
};

PracticeBtn.defaultProps = {
	bordercolor: "#00bcd4"
}

PracticeBtn.propTypes = {
	bordercolor: PropTypes.string,
	to: PropTypes.string
}

export default PracticeBtn;