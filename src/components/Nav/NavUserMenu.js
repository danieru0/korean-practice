import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

const NavItem = styled.li`
	width: 100%;
	height: 45px;
`

const NavLink = styled(Link)`
	text-decoration: none;
	font-size: 16px;
	color: ${props => props.theme.mainFontColor};
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	background-color: ${({active}) => active && '#4c4c4c'};
	outline: none;

	&:hover {
		background-color: #4c4c4c;
	}
`

const StyledIcon = styled(FontAwesome)`
	color: ${props => props.theme.infoColor};
	margin-left: 20px;
	font-size: 24px;
	width: 30px;
	margin-left: 30px;
	margin-right: 15px;
	text-align: center;
`

const NavUserMenu = ({pathname, onClick}) => {
    return (
        <>
            <NavItem>
                <NavLink onClick={onClick} active={pathname === 'alphabet' ? 1 : 0} to="/alphabet">
                    <StyledIcon name="font"/>
                    Alphabet
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={onClick} active={pathname === 'words' ? 1 : 0} to="/words">
                    <StyledIcon name="sort-alpha-down"/>
                    Words
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={onClick} active={pathname === 'conjugation' ? 1 : 0} to="/conjugation">
                    <StyledIcon name="plug"/>
                    Conjugation
                </NavLink>
            </NavItem>
        </>
    );
};

export default NavUserMenu;