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

const NavAdminMenu = ({pathname, onClick}) => {
    return (
        <>
            <NavItem>
                <NavLink onClick={onClick} active={pathname.split('/')[1] && pathname.split('/')[2] === undefined && 'admin' ? 1 : 0} to="/admin">
                    <StyledIcon name="chalkboard"/>
                    Dashboard
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={onClick} active={pathname.split('/')[2] === 'settings' ? 1 : 0} to="/admin/settings">
                    <StyledIcon name="cog"/>
                    Settings
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={onClick} active={pathname.split('/')[2] === 'users' ? 1 : 0} to="/admin/users">
                    <StyledIcon name="users"/>
                    Users
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={onClick} active={pathname.split('/')[2] === 'word' ? 1 : 0} to="/admin/word">
                    <StyledIcon name="sort-alpha-down"/>
                    Add word
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={onClick} active={pathname.split('/')[2] === 'conjugations' ? 1 : 0} to="/admin/conjugations">
                    <StyledIcon name="plug"/>
                    Conjugations
                </NavLink>
            </NavItem>
        </>
    );
};

export default NavAdminMenu;