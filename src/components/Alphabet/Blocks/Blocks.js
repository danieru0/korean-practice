import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip'
import Helmet from 'react-helmet';

import PageTitle from '../../../shared/PageTitle/PageTitle';
import NormalBtn from '../../../shared/NormalBtn/NormalBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}

	@media (max-width: 800px) {
		height: auto;
	}
`

const Wrapper = styled.div`
	width: auto;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	position: relative;

	@media (max-width: 800px) {
		margin-top: 150px;
	}
`

const StyledNormalBtn = styled(NormalBtn)`
	position: absolute;
	right: 10px;
	top: -50px;
`

const Block = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 180px;
	height: 250px;
	border: 1px solid #ffeb3b;
	font-family: ${props => props.theme.mainFont};
	color: ${props => props.theme.mainFontColor};
	font-size: 42px;
	margin: 10px;
`

const NumberGroup = styled.div`
	width: 55px;
	display: flex;
	justify-content: space-around;
`;

const Number = styled.span`
	cursor: help;
`

const StyledTooltip = styled(ReactTooltip)`
	font-size: 18px !important;
	font-family: ${props => props.theme.mainFont} !important;
`

const Blocks = () => {
	const [koreanActive, setKoreanActive] = useState(false);

	const handleToKoreanBtn = () => {
		if (koreanActive) {
			setKoreanActive(false);
		} else {
			setKoreanActive(true);
		}
	}

	return (
		<Container>
			<Helmet>
				<title>Blocks - Korean practice</title>
			</Helmet>
			<PageTitle>Blocks</PageTitle>
			<Wrapper>
				<StyledNormalBtn onClick={handleToKoreanBtn}>{koreanActive ? 'Go back' :'To korean'}</StyledNormalBtn>
				<Block>
					{
						koreanActive ? (
							'구'
						) : (
							<>
								<Number data-tip="Always consonant">1</Number>
								<Number data-tip="Always vowel">2</Number>
							</>		
						)
					}
				</Block>
				<Block>
					{
						koreanActive ? (
							'좁'
						) : (
							<>
								<Number data-tip="Always consonant">1</Number>
								<Number data-tip="Always vowel">2</Number>
								<Number data-tip="Always consonant">3</Number>
							</>
						)
					}

				</Block>
				<Block>
					{
						koreanActive ? (
							'다'
						) : (
							<NumberGroup>
								<Number data-tip="Always consonant">1</Number>
								<Number data-tip="Always vowel">2</Number>
							</NumberGroup>
						)
					}
				</Block>
				<Block>
					{
						koreanActive ? (
							'밥'
						) : (
							<>
								<NumberGroup>
									<Number data-tip="Always consonant">1</Number>
									<Number data-tip="Always vowel">2</Number>
								</NumberGroup>
								<Number data-tip="Always consonant">3</Number>
							</>
						)
					}
				</Block>
				<Block>
					{
						koreanActive ? (
							'닭'
						) : (
							<>
								<NumberGroup>
									<Number data-tip="Always consonant">1</Number>
									<Number data-tip="Always vowel">2</Number>
								</NumberGroup>
								<NumberGroup>
									<Number data-tip="Always consonant">3</Number>
									<Number data-tip="Always consonant">4</Number>
								</NumberGroup>
							</>
						)
					}
				</Block>
				<Block>
					{
						koreanActive ? (
							'긁'
						) : (
							<>
								<Number data-tip="Always consonant">1</Number>
								<Number data-tip="Always vowel">2</Number>
								<NumberGroup>
									<Number data-tip="Always consonant">3</Number>
									<Number data-tip="Always consonant">4</Number>
								</NumberGroup>
							</>
						)
					}
				</Block>
			</Wrapper>
			{
				koreanActive || <StyledTooltip type="info" effect="solid"/>
			}
		</Container>
	);
};

export default Blocks;