import React, { useState, useEffect } from 'react';
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { getUsers, clearLastUser } from '../../actions/adminAction';

import PageTitle from '../../shared/PageTitle/PageTitle';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
    display: flex;
    position: relative;
    padding-top: 150px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Options = styled.div`
    width: 100%;
    position: absolute;
    top: -50px;
    display: flex;
    height: 50px;
    align-items: center;
`

const Line = styled.div`
    width: 1px;
    height: 75%;
    background: #fff;
    margin: 0px 20px;
`

const SearchInput = styled.input`
    height: 40px;
    margin-right: 5px;
`

const Label = styled.label`
    color: #fff;
    font-family: ${props => props.theme.mainFont};
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-left: 5px;
`

const Radio = styled.input`
    width: 20px;
    height: 20px;
    margin-right: 2px;
`

const Select = styled.select`
    height: 40px;
    width: 120px;
    margin-right: 5px;
`

const SelectOption = styled.option`

`

const UpdateBtn = styled.button`
    margin-left: 10px;
    background: #fff;
    border: 1px solid #000;
    padding: 7px;
`

const Wrapper = styled.div`
    position: relative;
    margin: 0 auto;
    flex-shrink: 0;
`

const Table = styled.table`
    width: 1400px;
    border: 2px solid #000;
    border-bottom: 1px solid #000;
    font-family: ${props => props.theme.mainFont};
    border-collapse: separate;
`

const Head = styled.thead`
    background: #424242;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    height: 100px;
`

const HeadGroup = styled.tr`
    height: 50px;
`

const Categories = styled.th`
    border-right: 2px solid #bdbdbd;
    vertical-align: middle;
    text-align: left;
    padding-left: 20px;
    border-bottom: 2px solid #9e9e9e;

    &:last-of-type {
        border-right: none;
    }
`

const Body = styled.tbody`
    color: #000;
    font-size: 14px;
`

const Groups = styled.tr`
    &:nth-of-type(odd) {
        background: #e0e0e0
    }

    &:nth-of-type(even) {
        background: #9e9e9e;
    }
`

const Data = styled.th`
    height: 50px;
    vertical-align: middle;
    text-align: left;
    padding-left: 20px;
    border-right: 2px solid #bdbdbd;
    border-bottom: 1px solid #000;
`

const EditLink = styled(Link)`
    background: #fff;
    padding: 10px 30px;
    border: 1px solid #000;
    color: #000;
    text-decoration: none;
`

const Users = ({firestore, getUsers, clearLastUser, users, lastUser}) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('nick');
    const [sortBy, setSortBy] = useState('nick');
    const [sortType, setSortType] = useState('asc');

    useEffect(() => {
        getUsers(firestore, null, null, 'nick', 'asc');
    }, [firestore, getUsers])

    const loadMore = () => {
        getUsers(firestore, searchValue, searchType, sortBy, sortType, lastUser);
    }

    const updateUsers = () => {
        getUsers(firestore, searchValue, searchType, sortBy, sortType);
    }

    const shouldClearLastUser = () => {
        if (lastUser !== null) {
            clearLastUser();
        }
    }

    return (
        <Container>
           <PageTitle>Users</PageTitle> 
           <Wrapper>
                <Options>
                    <SearchInput onChange={(e) => { setSearchValue(e.target.value); shouldClearLastUser()}} placeholder="Search..."/>
                    <Label onClick={() => {setSearchType('nick'); shouldClearLastUser()}}>
                        <Radio defaultChecked name="search" type="radio"/>
                        Username
                    </Label>
                    <Label onClick={() => {setSearchType('email'); shouldClearLastUser()}}>
                        <Radio name="search" type="radio"/>
                        Email
                    </Label>
                    <Line />
                    <Select onClick={(e) => {setSortBy(e.target.value); shouldClearLastUser()}} defaultValue="nick">
                        <SelectOption>Sort by</SelectOption>
                        <SelectOption value="nick">Username</SelectOption>
                        <SelectOption value="email">Email</SelectOption>
                        <SelectOption value="exp">Exp</SelectOption>
                        <SelectOption value="answers">Answers</SelectOption>
                        <SelectOption value="createdAt">createdAt</SelectOption>
                    </Select>
                    <Label onClick={() => {setSortType('asc'); shouldClearLastUser()}}>
                        <Radio defaultChecked name="sort" type="radio"/>
                        Ascending
                    </Label>
                    <Label onClick={() => {setSortType('desc'); shouldClearLastUser()}}>
                        <Radio name="sort" type="radio"/>
                        Descending
                    </Label>
                    <UpdateBtn onClick={updateUsers}>Update</UpdateBtn>
                    <UpdateBtn onClick={loadMore}>Load more</UpdateBtn>
                </Options>
                <Table>
                    <Head>
                        <HeadGroup>
                            <Categories>Username</Categories>
                            <Categories>Email</Categories>
                            <Categories>Joined at</Categories>
                            <Categories>Admin</Categories>
                            <Categories>Answers</Categories>
                            <Categories>Exp</Categories>
                            <Categories>Manage</Categories>
                        </HeadGroup>                    
                    </Head>
                    <Body>
                        {
                            users.length !== 0 && (
                                users.map((item, key) => {
                                    return (
                                        <Groups key={key}>
                                            <Data>{item.nick}</Data>
                                            <Data>{item.email}</Data>
                                            <Data>{item.createdAt.toISOString()}</Data>
                                            <Data>{item.isAdmin.toString()}</Data>
                                            <Data>{item.answers}</Data>
                                            <Data>{item.exp}</Data>
                                            <Data>
                                                <EditLink to={`/admin/user/${item.id}`}>Edit</EditLink>
                                            </Data>
                                        </Groups>
                                    )
                                })
                            )
                        }
                    </Body>
                </Table>
           </Wrapper>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        users: state.adminReducer.users,
        lastUser: state.adminReducer.lastUser
    }
}

export default connect(mapStateToProps, { getUsers, clearLastUser })(withFirestore(Users));