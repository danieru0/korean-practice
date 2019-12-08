import React, { useState } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Logo from '../../shared/Logo/Logo';
import NavUserMenu from './NavUserMenu';
import NavAdminMenu from './NavAdminMenu';

const Container = styled.div`
	width: 200px;
	height: auto;
	position: fixed;
	transition: transform .8s cubic-bezier(1, 0, 0, 1);
	z-index: 999;
	transform: ${({isMenuActive}) => isMenuActive ? 'translateX(0%)' : 'translateX(-100%)'};

	@media (min-width: 600px) {
		transform: translateX(0%);
	}
`

const MobileBtnContainer = styled.div`
	width: 100px;
	height: 150px;
	position: absolute;
	right: -40px;
	background-color: ${props => props.theme.navColor};
	top: -50px;
	border-radius: 50%;
	display: none;
	justify-content: flex-end;
	align-items: center;
	z-index: 1;

	@media (max-width: 600px) {
		display: flex;
	}
`

const MobileBtn = styled.button`
	border: none;
	background: transparent;
	cursor: pointer;
	padding: 25px 7px 25px 0px;
	outline: none;
`

const StyledIconMobile = styled(FontAwesome)`
	color: #fff;
	font-size: 36px;
`

const NavContainer = styled.div`
	width: 100%;
	height: 100vh;
	font-family: ${props => props.theme.mainFont};
	background-color: ${props => props.theme.navColor};
	box-shadow: 0px 10px 15px #000;
	display: flex;
	justify-content: flex-start;
	padding-top: 10px;
	align-items: center;
	flex-direction: column;
	overflow: hidden;
`

const StyledLogo = styled(Logo)`
	z-index: 1;
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
	z-index: 1;
`

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	width: 100%;
	z-index: 1;
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

const Nav = ({profile, auth, location, adminStatus}) => {
	const [activeMenu, setActiveMenu] = useState(false);

	const handleMobileNav = () => {
		if (activeMenu) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}

	return (
		<Container isMenuActive={activeMenu ? 1 : 0}>
			<MobileBtnContainer>
				<MobileBtn onClick={handleMobileNav}>
					<StyledIconMobile name="bars"/>
				</MobileBtn>
			</MobileBtnContainer>
			<NavContainer>
				<StyledLogo size="small" />
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
					{
						auth.uid && (
							<NavItem>
								<NavLink onClick={handleMobileNav} active={location.pathname.split('/')[1] === 'home' ? 1 : 0} to="/home">
									<StyledIcon name="home"/>
									Home
								</NavLink>
							</NavItem>
						)
					}
					{
						adminStatus ? (
							<NavAdminMenu onClick={handleMobileNav} pathname={location.pathname}/>
						) : (
							<NavUserMenu onClick={handleMobileNav} pathname={location.pathname.split('/')[1]}/>
						)
					}
				</NavList>
			</NavContainer>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		adminStatus: state.adminReducer.adminStatus
	}
}

export default connect(mapStateToProps, null)(withRouter(Nav));