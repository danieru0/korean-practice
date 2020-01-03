import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import * as linksObject from '../../constants/linksObject';

import PracticeBtn from '../../shared/PracticeBtn/PracticeBtn';
import PageTitle from '../../shared/PageTitle/PageTitle';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: center;
    position: relative;
    padding-top: 100px;
	padding-left: 100px;
	padding-right: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

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

const LinksContainer = ({type, bordercolor, title}) => {
    return (
        <Container>
            <Helmet>
                <title>{`${title} - Korean practice`}</title>
            </Helmet>
            <PageTitle>{title}</PageTitle>
            {
                Object.keys(linksObject.LINKS[type]).map((id, key) => {
                    const item = linksObject.LINKS[type][id];
                    return (
                        <Wrapper key={key}>
                            {
                                item.testLink !== undefined && (
                                    <TestLink to={item.testLink} bordercolor={item.bordercolor ? item.bordercolor: bordercolor}>{item.testText ? item.testText : 'Test'}</TestLink>
                               )
                            }
                            <StyledPracticeBtn to={item.sectionLink} bordercolor={item.bordercolor ? item.bordercolor : bordercolor}>
                                {item.sectionText.replace('<br />', '\n')}
                            </StyledPracticeBtn>
                        </Wrapper>
                    )
                })
            }
        </Container>
    );
};

LinksContainer.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	bordercolor: PropTypes.string.isRequired
}

export default LinksContainer;