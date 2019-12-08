import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const AdminTitle = styled.p`
    position: absolute;
    left: 0;
    right: 0;
    top: 100px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: #fff;
    font-size: 48px;
    font-family: ${props => props.theme.mainFont};
`

const AdminName = styled.p`
    position: absolute;
    left: 0;
    right: 0;
    top: 150px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: #fff;
    font-size: 36px;
    font-family: ${props => props.theme.mainFont};
`

const AdminLink = styled(Link)`
    width: 288px;
    height: 313px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 36px;
    color: #fff;
    font-family: ${props => props.theme.mainFont};
    background: #3f51b5;
    margin: 20px 20px;
`

const Wrapper = styled.div`
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 80px;
`

const Dashboard = () => {
    return (
        <Container>
            <AdminTitle>Welcome!</AdminTitle>
            <AdminName>Daniel Dąbrowski</AdminName>
            <Wrapper>
                <AdminLink to="/admin/settings">Settings</AdminLink>
                <AdminLink to="/admin/users">Users</AdminLink>
                <AdminLink to="/admin/words">Words</AdminLink>
                <AdminLink to="/admin/conjugations">Conjugations</AdminLink>
            </Wrapper>
        </Container>
    );
};

export default Dashboard;