import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import { getSpecificUser, setUserAdmin, removeUserAvatar, clearSpecificUser } from '../../actions/adminAction';

import PageLoader from '../../shared/PageLoader/PageLoader';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 40px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Wrapper = styled.div`
    width: 700px;
    display: flex;

    @media (max-width: 860px) {
        flex-direction: column;
        width: 90%;
    }
`

const UserInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 10px;
    border-right: 3px solid #bdbdbd;
    color: #fff;
    font-family: ${props => props.theme.mainFont};

    @media (max-width: 860px) {
        align-items: center;
        border-right: none;
        border-bottom: 3px solid #bdbdbd;
        margin-bottom: 10px;
    }    
`

const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`

const Info = styled.p`
    margin: 2px 0px;
`

const UserOptions = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 860px) {
        justify-content: center;
    }
`

const UserBtn = styled.button`
    width: 100px;
    height: 100px;
    background: none;
    border: 3px solid ${({bordercolor}) => bordercolor};
    font-family: ${props => props.theme.mainFont};
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    margin: 0 20px;

    @media (max-width: 860px) {
        margin: 10px 20px;
    }
`

const User = ({firestore, getSpecificUser, setUserAdmin, removeUserAvatar, clearSpecificUser, specificUser, location}) => {
    useEffect(() => {
        getSpecificUser(firestore, location.pathname.split('/')[3]);

        return () => {
            clearSpecificUser(firestore);
        }
    }, [firestore, getSpecificUser, clearSpecificUser, location]);
    
    const updateAdminStatus = () => {
        if (window.confirm('Are you sure?')) {
            setUserAdmin(firestore, location.pathname.split('/')[3], !specificUser.isAdmin)
        }
    }
    
    const removeAvatar = () => {
        if (window.confirm('Are you sure?')) {
            removeUserAvatar(firestore, location.pathname.split('/')[3]);
        }
    }

    return (
        <Container>
            <Helmet>
                <title>User Admin - Korean practice</title>
            </Helmet>
            {
                specificUser ? (
                    <Wrapper>
                        <UserInfo>
                            <Avatar alt="" src={specificUser.avatar}/>
                            <Info>{specificUser.nick}</Info>
                            <Info>{specificUser.id}</Info>
                            <Info>{`Exp: ${specificUser.exp}`}</Info>
                            <Info>{`Answers: ${specificUser.answers}`}</Info>
                            <Info>{`Admin: ${specificUser.isAdmin}`}</Info>
                            <Info>{specificUser.createdAt.toISOString()}</Info>
                        </UserInfo>
                        <UserOptions>
                            <UserBtn onClick={updateAdminStatus} bordercolor="#ffeb3b">{`Admin ${specificUser.isAdmin}`}</UserBtn>
                            <UserBtn onClick={removeAvatar} bordercolor="#673ab7">Remove avatar</UserBtn>
                        </UserOptions>
                    </Wrapper>
                ) : (
                    <PageLoader />
                )
            }

        </Container>
    );
};

const mapStateToProps = state => {
    return {
        specificUser: state.adminReducer.specificUser
    }
}

export default connect(mapStateToProps, { getSpecificUser, setUserAdmin, removeUserAvatar, clearSpecificUser })(withFirestore(withRouter(User)));