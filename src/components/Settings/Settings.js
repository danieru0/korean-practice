import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import Helmet from 'react-helmet';

import { updateAvatar, changePassword, deleteAccount } from '../../actions/settingsAction';

import getImageSize from '../../utils/getImageSize';

import PageTitle from '../../shared/PageTitle/PageTitle';
import NormalBtn from '../../shared/NormalBtn/NormalBtn';
import Input from '../../shared/Input/Input';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	font-family: ${props => props.theme.mainFont};

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}

	@media (max-height: 750px) {
		height: 700px;
	}
`

const Wrapper = styled.div`
	width: 600px;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px 20px;

	@media (max-height: 750px) {
		margin-top: 70px;
	}
`

const OptionTitle = styled.div`
	font-size: 32px;
	color: ${props => props.theme.mainFontColor};
	width: 100%;
	margin-top: 30px;

	&:first-of-type {
		margin-top: 0;
	}

	&::after {
		content: "";
		width: 100%;
		height: 2px;
		background-color: #ffffff;
		display: block;
		margin-top: 2px;
		margin-bottom: 15px;
	}
`

const AvatarWrapper = styled.div`
	display: flex;
	margin-bottom: 15px;
`

const Avatar = styled.img`
	width: 112px;
	height: 112px;
	border-radius: 50%;
`

const AvatarFileInput = styled.input`
	align-self: flex-end;
	width: 200px;
	cursor: pointer;

	&::before {
		content: "Maximum resolution: 112x112 (px)";
		color: ${props => props.theme.infoColor};
		font-size: 12px;
	}

	@media (max-width: 350px) {
		width: 150px;
	}
`

const StyledInput = styled(Input)`
	margin: 10px 0px;

	input {
		height: 40px;
	}
`

const Settings = ({profile, firestore, settingsState, updateAvatar, changePassword, deleteAccount}) => {
	const [avatarFile, setAvatarFile] = useState(null);
	const [avatarLink, setAvatarLink] = useState(null);
	const [oldPassword, setOldPassword] = useState(null);
	const [newPassword, setNewPassword] = useState(null);

	const handleAvatarFileInput = async e => {
		const acceptedImageTypes = ['image/jpeg', 'image/png'];
		const { files } = e.target;

		if (files[0] && acceptedImageTypes.includes(files[0].type)) {
			const size = await getImageSize(files[0]);
			if (size && size[0] <= 112 && size[1] <= 112) {
				setAvatarLink(window.URL.createObjectURL(files[0]));
				setAvatarFile(files[0]);
			} else {
				alert('The image is too big! Maximum resolution is: 112x112 (px)');
			}
		}
	}

	const handleAvatarUpdate = () => {
		if (!settingsState && avatarFile) {
			updateAvatar(firestore, avatarFile);
		}
	}

	const handlePasswordChange = () => {
		if (oldPassword && newPassword && !settingsState) {
			changePassword(oldPassword, newPassword);
		}
	}

	const handleDeleteAccount = () => {
		if (!settingsState && window.confirm('Are you sure about that? (╥﹏╥)')) {
			const currentPassword = prompt('Please provide your current password to continue:');
			if (currentPassword) {
				deleteAccount(firestore, currentPassword);
			}
		}
	}

	return (
		<Container>
			<Helmet>
				<title>Settings - Korean practice</title>
			</Helmet>
			<PageTitle>Settings</PageTitle>
			<Wrapper>
				<OptionTitle>Avatar</OptionTitle>
				<AvatarWrapper>
					<Avatar alt="" src={profile.isLoaded ? avatarLink ? avatarLink : profile.avatar : ''}/>
					<AvatarFileInput onChange={handleAvatarFileInput} type="file" accept="image/*"/>
				</AvatarWrapper>
				<NormalBtn onClick={handleAvatarUpdate}>Save</NormalBtn>
				<OptionTitle>Change password</OptionTitle>
				<StyledInput onChange={(value) => setOldPassword(value)} label="Current password:" placeholder="Current password..." type="password"/>
				<StyledInput onChange={(value) => setNewPassword(value)} label="New password:" placeholder="New password..." type="password"/>
				<NormalBtn onClick={handlePasswordChange}>Save</NormalBtn>
				<OptionTitle>Other</OptionTitle>
				<NormalBtn onClick={handleDeleteAccount} bordercolor="#f44336">DELETE ACCOUNT</NormalBtn>
			</Wrapper>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		profile: state.firebase.profile,
		settingsState: state.settingsReducer.settingsState
	}
}

export default connect(mapStateToProps, { updateAvatar, changePassword, deleteAccount })(withFirestore(Settings));