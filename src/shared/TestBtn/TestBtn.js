import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
    color: ${({correctanswer}) => correctanswer ? '#7b7b7b' : '#fff'};
    font-family: ${props => props.theme.mainFont};
    font-size: 16px;
    border: 1px solid ${({bordercolor}) => bordercolor};
    width: 100px;
    height: 35px;
    cursor: pointer;
    text-transform: uppercase;
    background: ${({correctanswer}) => correctanswer ? '#313131' : '#424242'};
    transition: color 1s cubic-bezier(1, 0, 0, 1), background 1s cubic-bezier(1, 0, 0, 1);
    cursor: ${({correctanswer}) => correctanswer ? 'default' : 'pointer'};
`

const TestBtn = ({className, bordercolor, children, onClick, correctanswer}) => {
    return (
        <Button correctanswer={correctanswer ? 1 : 0} onClick={onClick} className={className} bordercolor={bordercolor}>
            {children}
        </Button>
    );
};

TestBtn.defaultProps = {
    bordercolor: '#8bc34a'
}

TestBtn.propTypes = {
    bordercolor: PropTypes.string
}

export default TestBtn;