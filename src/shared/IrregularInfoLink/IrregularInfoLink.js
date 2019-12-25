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

    &:not(:first-child) {
        margin-left: 10px;
    }
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
    const irregularsBase = {
        1: 'ㅅ',
        2: 'ㄷ',
        3: 'ㅂ',
        4: 'ㅡ',
        5: '르',
        6: 'ㄹ'
    }

    if (irregularType === '0' || irregularType === 0) {
        return false;
    }

    return (
        <>
            {   
                typeof irregularType === 'object' ? (
                    irregularType.map((item, key) => {
                        return (
                            <Irregular key={key} to={`/irregulars/${item}`}>
                                <StyledIcon name="info-circle"/>
                                <Type>{`${irregularsBase[item]} Irregular`}</Type>
                            </Irregular>
                        )
                    })
                ) : (
                    <Irregular to={`/irregulars/${irregularType}`}>
                            <StyledIcon name="info-circle"/>
                            <Type>{`${irregularsBase[irregularType]} Irregular`}</Type>
                    </Irregular>
                )             
            }

        </>
    );
};

export default IrregularInfo;