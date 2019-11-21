import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

const Irregular = styled(Link)`
    font-family: ${props => props.theme.mainFont};
    font-size: 22px;
    color: ${props => props.theme.mainFontColor};
    display: flex;
    align-items: center;
    text-decoration: none;
`

const StyledIcon = styled(FontAwesome)`
    color: #f44336;
    font-size: 22px;
    margin-right: 5px;
`

const Type = styled.p`
    text-transform: uppercase;
`;

const IrregularInfo = ({irregularType}) => {
    let irregular = '';

    switch(irregularType) {
        case '0':
            irregular = null;
            break;
        case '1':
            irregular = 'ㅅ';
            break;
        case '2':
            irregular = 'ㄷ';
            break;
        case '3':
            irregular = 'ㅂ';
            break;
        case '4':
            irregular = 'ㅡ';
            break;
        case '5':
            irregular = '르';
            break;
        case '6':
            irregular = 'ㄹ';
            break;
        default: return false;
    }

    if (irregular === null) {
        return null;
    }

    return (
        <Irregular to={`/irregular/${irregularType}`}>
            <StyledIcon name="info-circle"/>
            <Type>{`${irregular} Irregular`}</Type>
        </Irregular>
    );
};

export default IrregularInfo;