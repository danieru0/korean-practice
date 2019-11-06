import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import NormalBtn from '../../shared/NormalBtn/NormalBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`

const Wrapper = styled.div`
	width: 600px;
	height: 300px;
	display: flex;
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
`

const CakeIsALie = styled.p`
	color: ${props => props.theme.infoColor};
	font-family: ${props => props.theme.mainFont};
	margin-left: 20px;
	font-size: 14px;
`

// eslint-disable-next-line
const StyledSavedButton = styled(NormalBtn)`
	margin: 10px;
`

const Home = ({profile}) => {
	if (profile.isEmpty) return (<Container>nie ma</Container>);

	return (
		<Container>
			<Wrapper>
				<User>
					<Avatar alt="" src={profile.avatar}/>
					<TextInfo>{profile.nick}</TextInfo>
					<TextInfo>{`EXP: ${profile.exp}`}</TextInfo>
					<TextInfo>{`Correct answers: ${profile.answers}`}</TextInfo>
					<NormalBtn href="/settings">Settings</NormalBtn>
				</User>
				<Saved>
					<CakeIsALie>Everything you save will appear here (●´ω｀●)</CakeIsALie>
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