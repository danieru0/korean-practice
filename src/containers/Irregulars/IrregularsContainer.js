import React, { useEffect } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import ReactTooltip from 'react-tooltip'

import { getIrregularData, clearIrregularData } from '../../actions/irregularsAction';

import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';
import NormalBtn from '../../shared/NormalBtn/NormalBtn';

const StyledTooltip = styled(ReactTooltip)`
	font-size: 18px !important;
	font-family: ${props => props.theme.mainFont} !important;
`

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

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Wrapper = styled.div`
    width: 900px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${props => props.theme.mainFont};
    color: ${props => props.theme.mainFontColor};

    @media (max-width: 1132px) {
        width: 95%;
        padding: 0px 10px;
    }
`

const TopContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
` 

const StyledNormalBtn = styled(NormalBtn)`
    margin-left: auto;
`

const IrregularWord = styled.p`
    font-size: 40px;
    text-align: center;
    color: #ffeb3b;
`

const Dot = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 20px 0px;
    background: #161515;
`

const Explanation = styled.p`
    width: 100%;
    height: auto;
    font-size: 18px;
`

const ExplanationMore = styled.span`
    font-size: 16px;
    color: ${props => props.theme.infoColor};

    a {
        color: ${props => props.theme.infoColor};
    }
`

const IrregularsContainer = ({firestore, location, getIrregularData, clearIrregularData, info, word, conjugationNumber}) => {
    useEffect(() => {
        getIrregularData(firestore, location.pathname.split('/')[2]);
    }, [firestore, location, getIrregularData]);

    useEffect(() => {
        return () => {
            clearIrregularData();
        }
    }, [clearIrregularData]);

    const getNextIrregular = () => {
        getIrregularData(firestore, location.pathname.split('/')[2]);
    }

    return (
        <Container>
            <Helmet>
                <title>{`${info ? info.title : 'Loading... '} - Korean practice`}</title>
            </Helmet>
            <PageTitle>{`${info ? info.title : 'Loading... '}`}</PageTitle>
            {
                info && word ? (
                    <Wrapper>
                        <TopContainer>
                            <StyledNormalBtn onClick={getNextIrregular}>Next</StyledNormalBtn>
                        </TopContainer>
                        <IrregularWord data-tip={`${word.word.korean}: ${word.word.english}`}>{word[conjugationNumber]}</IrregularWord>
                        <Dot />
                        <Explanation>
                            {info.text} <br/><br/>
                            <ExplanationMore>
                                See more at: <a href={info.link}>{info.link}</a>
                            </ExplanationMore>
                        </Explanation>
                    </Wrapper>
                ) : (
                    <PageLoader />
                )
            }
            {
                info && word && <StyledTooltip type="info" effect="solid" />
            }
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        info: state.irregularsReducer.info,
        word: state.irregularsReducer.word,
        conjugationNumber: state.irregularsReducer.conjugationNumber
    }
}

export default connect(mapStateToProps, { getIrregularData, clearIrregularData })(withFirestore(withRouter(IrregularsContainer)));