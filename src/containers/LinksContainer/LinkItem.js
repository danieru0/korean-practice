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

const ButtonsGroup = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: absolute;
	top: 0;
`

const StyledPracticeBtn = styled(PracticeBtn)`
	display: flex;
	flex-direction: column;
	white-space: pre-line;
`

const TestLink = styled(Link)`
	background: transparent;
	color: #fff;
	font-family: ${props => props.theme.mainFont};
	padding: 10px 15px;
	font-size: 16px;
	border-bottom: 3px solid ${({bordercolor}) => bordercolor};
	text-transform: uppercase;
    text-decoration: none;

	${props => {
		switch(props.direction) {
			case 'left':
				return `border-right: 3px solid ${props.bordercolor};`;
			case 'right':
				return `border-left: 3px solid ${props.bordercolor};`
			default: return null;
		}
	}}

	&:hover {
		color: #ccc;
	}
`

const LinkItem = ({item, bordercolor}) => {
    return (
        <Wrapper>
			<ButtonsGroup>
				{
					item.testLink !== undefined && (
						<TestLink to={item.testLink} direction="left" bordercolor={item.bordercolor ? item.bordercolor : bordercolor}>{item.testText ? item.testText : 'Test'}</TestLink>
					)
				}
				{
					item.typingLink !== undefined && (
						<TestLink to={item.typingLink} direction="right" bordercolor={item.bordercolor ? item.bordercolor : bordercolor}>Typing</TestLink>
					)
				}
			</ButtonsGroup>
            <StyledPracticeBtn to={item.sectionLink} bordercolor={item.bordercolor ? item.bordercolor : bordercolor}>
                {item.sectionText.replace('<br />', '\n')}
            </StyledPracticeBtn>
        </Wrapper>
    );
};

export default LinkItem;