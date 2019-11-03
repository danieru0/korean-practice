import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Logo from '../../shared/Logo/Logo';

const Container = styled.div`
	width: 200px;
	height: 100vh;
	position: fixed;
	font-family: ${props => props.theme.mainFont};
	background-color: ${props => props.theme.navColor};
	box-shadow: 0px 10px 15px #000;
	display: flex;
	justify-content: flex-start;
	padding-top: 10px;
	align-items: center;
	flex-direction: column;
`

const Avatar = styled.img`
	width: 64px;
	height: 64px;
	border-radius: 50%;
	margin: 15px 0px 5px 0px;
`

const Nick = styled.p`
	font-size: 16px;
	color: ${props => props.theme.mainFontColor};
`

const Line = styled.hr`
	background-color: #424242;
	width: 80%;
	height: 1px;
	border: none;
	margin: 0px;
	margin-top: 15px;
	margin-bottom: 1px;
`

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	width: 100%;
`

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

const Nav = ({profile, auth, location}) => {
	return (
		<Container>
			<Logo size="small" />
			{
				auth.uid && (
					profile.isEmpty ? (
						<>
							<Avatar alt="" src="" />
							<Nick>(づ｡◕‿‿◕｡)づ</Nick>
						</>
					) : (
						<>
							<Avatar alt="" src={profile.avatar} />
							<Nick>{profile.nick}</Nick>
						</>
					)
				)
			}
			<Line />
			<NavList>
				<NavItem>
					<NavLink active={location.pathname === '/home' ? 1 : 0} to="/home">
						<StyledIcon name="home"/>
						Home
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={location.pathname === '/alphabet' ? 1 : 0} to="/alphabet">
						<StyledIcon name="font"/>
						Alphabet
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={location.pathname === '/words' ? 1 : 0} to="/words">
						<StyledIcon name="sort-alpha-down"/>
						Words
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={location.pathname === '/conjugation' ? 1 : 0} to="/conjugation">
						<StyledIcon name="plug"/>
						Conjugation
					</NavLink>
				</NavItem>
			</NavList>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth
	}
}

export default connect(mapStateToProps, null)(withRouter(Nav));