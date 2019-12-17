import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const Modal = styled.div`
    width: 620px;
    height: 100px;
    background: #212121;
    color: #fff;
    font-family: ${props => props.theme.mainFont};
    padding: 10px;
    position: relative;
    box-shadow: 0 0 14px 8px #000;

    @media (max-width: 647px) {
        width: 90%;
        height: auto;
    }
`

const ModalHide = styled.button`
    position: absolute;
    right: -10px;
    top: -10px;
    background: none;
    border: none;
    color: #aaa;
`

const StyledIcon = styled(FontAwesome)`
    font-size: 26px;
`

const Title = styled.p`
    font-size: 28px;
    text-transform: uppercase;
    width: 100%;
    min-height: 40px;
    padding-bottom: 10px;
    border-bottom: 3px solid #000;
`

const Content = styled.p`
    font-size: 18px;
    margin-top: 10px;
`

const Blocked = ({onClick}) => {
    return (
        <Modal>
            <ModalHide onClick={onClick}>
                <StyledIcon name="times"/>
            </ModalHide>
            <Title>Function blocked!</Title>
            <Content>
                This function has been blocked by creator of this site. Please come back later! :)
            </Content>
        </Modal>
    )
}

export default Blocked;