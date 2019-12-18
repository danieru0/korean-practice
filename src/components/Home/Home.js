import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import NormalBtn from '../../shared/NormalBtn/NormalBtn';
import PageLoader from '../../shared/PageLoader/PageLoader';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Wrapper = styled.div`
	width: 600px;
	height: 300px;
	display: flex;

	@media (max-width: 800px) {
		flex-direction: column;
		width: 100%;
		align-items: center;
	}
`

const User = styled.div`
	width: 40%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-right: 1px solid #424242;
	color: ${props => props.theme.mainFontColor};
	font-family: ${props => props.theme.mainFont};

	@media (max-width: 800px) {
		border-right: none;
		border-bottom: 1px solid #424242;
		width: 200px;
		padding-bottom: 10px;
	}
`

const Avatar = styled.img`
	width: 112px;
	height: 112px;
	border-radius: 50%;
`

const TextInfo = styled.p`
	font-size: 20px;
	margin: 3px 0px;
	text-align: center;

	&:last-of-type {
		margin-bottom: 10px;
	}
`

const Saved = styled.div`
	width: 60%;
	display: flex;
	flex-wrap: wrap;
	align-content: center;

	@media (max-width: 800px) {
		width: 300px;
		padding-top: 10px;
	}
`

const CakeIsALie = styled.p`
	color: ${props => props.theme.infoColor};
	font-family: ${props => props.theme.mainFont};
	margin-left: 20px;
	font-size: 14px;
`

const StyledSavedButton = styled(NormalBtn)`
	margin: 10px;
	text-transform: capitalize;
`

const Home = ({profile}) => {
	if (profile.isEmpty) return (<Container><PageLoader /></Container>);
	let zeros = 0;

	return (
		<Container>
			<Helmet>
				<title>Home - Korean practice</title>
			</Helmet>
			<Wrapper>
				<User>
					<Avatar alt="" src={profile.avatar}/>
					<TextInfo>{profile.nick}</TextInfo>
					<TextInfo>{`EXP: ${profile.exp}`}</TextInfo>
					<TextInfo>{`Correct answers: ${profile.answers}`}</TextInfo>
					<NormalBtn href="/settings">Settings</NormalBtn>
				</User>
				<Saved>
					{
						profile.saved && Object.keys(profile.saved).map(item => {
							if (profile.saved[item] > 0) {
								return <StyledSavedButton href={`/saved/${item}`} key={item}>{item}</StyledSavedButton>
							} else {
								return zeros++
							}
						})
					}
					{
						profile.saved ? (
							Object.keys(profile.saved).length === zeros && (
								<CakeIsALie>Everything you save will appear here (●´ω｀●)</CakeIsALie>
							)
						) : (
							<CakeIsALie>Everything you save will appear here (●´ω｀●)</CakeIsALie>
						)
					}
				</Saved>
			</Wrapper>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps, null)(Home);