import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleModal } from '../../actions/modalAction';

import Limit from '../../components/Modals/Limit';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 200px;

    @media (max-width: 1110px) {
		padding-left: 0;
	}
`

const ModalContainer = ({modalActive, modalType, toggleModal}) => {
    const onOutsideClick = useCallback((e) => {
        if (e.target.id === 'modal-container') {
            toggleModal(false, null);
        } 
    }, [toggleModal])
    
    useEffect(() => {
        document.addEventListener('click', onOutsideClick);

        return (() => {
            document.removeEventListener('click', onOutsideClick);
        });
    }, [onOutsideClick]);

    const hideModal = () => {
        toggleModal(false, null);
    }

    let modal = null;
    switch(modalType) {
        case 'limit':
            modal = <Limit onClick={hideModal}/>
            break;
        default: return modalActive ? new Error('Wrong modal type!') : null;
    }

    return (
        <>
            {
                modalActive && (
                    <Container id="modal-container">
                        {modal !== null && modal}
                    </Container>
                )
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        modalActive: state.modalReducer.modalActive,
        modalType: state.modalReducer.modalType
    }
}

export default connect(mapStateToProps, { toggleModal })(ModalContainer);