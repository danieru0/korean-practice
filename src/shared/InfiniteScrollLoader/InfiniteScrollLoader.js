import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import './style.css';

const Container = styled.div`
    width: calc(100% - 200px);
    height: 100px;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    transition: transform .3s;
    transform: ${({isVisible}) => isVisible ? 'translateY(0)' : 'translateY(100%)'};
`

const InfiniteScrollLoader = ({infiniteScrollLoaderVisible}) => {
    return (
        <Container isVisible={infiniteScrollLoaderVisible}>
            <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        infiniteScrollLoaderVisible: state.infiniteScrollLoaderReducer.infiniteScrollLoaderVisible
    }
}

export default connect(mapStateToProps, null)(InfiniteScrollLoader);