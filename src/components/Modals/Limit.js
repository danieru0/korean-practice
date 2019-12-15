import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const Modal = styled.div`
    width: 800px;
    height: 300px;
    background: #212121;
    color: #fff;
    font-family: ${props => props.theme.mainFont};
    padding: 10px;
    position: relative;
    box-shadow: 0 0 14px 8px #000;

    @media (max-width: 828px) {
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

const Limit = ({onClick}) => {
    return (
        <Modal>
            <ModalHide onClick={onClick}>
                <StyledIcon name="times" />
            </ModalHide>
            <Title>Database limits reached (╥_╥)</Title>
            <Content>
            Hello! I created this site mostly for learning purpose and for increasing my korean language skills, therefore i don't make any money from this and there's no ads as well. Either way, what you're seeing right now is an information about reaching Firestore free plan limitations (50k reads per day, 20k writes per day, 20k deletes per day). Unfortunately, i'm not rich enough to pay monthly for a better plan. I actually didn't expect this website to become so popular that this message come's out. Well, right now i can only apologize for what happend (っ˘̩╭╮˘̩)っ This message will disappear tomorrow (Unless we reach limits again). So once again: I am veeeery sorry but you will have to come here tomorrow (*/ω＼) <br /><br />I hope you'll forgive me! (°◡°♡)<br /><br />Daniel.
            </Content>
        </Modal>
    );
};

export default Limit;