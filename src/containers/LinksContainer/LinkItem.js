import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PracticeBtn from '../../shared/PracticeBtn/PracticeBtn';

const Wrapper = styled.div`
	position: relative;
	width: auto;
	height: auto;
	margin: 20px;
`

const StyledPracticeBtn = styled(PracticeBtn)`
	display: flex;
	flex-direction: column;
	white-space: pre-line;
`

const TestLink = styled(Link)`
    position: absolute;
	left: 0px;
	top: 0px;
	border: 0px;
	background: transparent;
	color: #fff;
	font-family: ${props => props.theme.mainFont};
	padding: 10px 15px;
	font-size: 16px;
	border-bottom: 3px solid ${({bordercolor}) => bordercolor};
	border-right: 3px solid ${({bordercolor}) => bordercolor};
	text-transform: uppercase;
    text-decoration: none;

	&:hover {
		color: #ccc;
	}
`

const LinkItem = ({item, bordercolor}) => {
    return (
        <Wrapper>
            {
                item.testLink !== undefined && (
                    <TestLink to={item.testLink} bordercolor={item.bordercolor ? item.bordercolor : bordercolor}>{item.testText ? item.testText : 'Test'}</TestLink>
                )
            }
            <StyledPracticeBtn to={item.sectionLink} bordercolor={item.bordercolor ? item.bordercolor : bordercolor}>
                {item.sectionText.replace('<br />', '\n')}
            </StyledPracticeBtn>
        </Wrapper>
    );
};

export default LinkItem;