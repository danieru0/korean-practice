import React, { useEffect } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import ReactTooltip from 'react-tooltip'

import { getSentenceData, clearSentenceData} from '../../actions/sentencesAction';

import IrregularInfoLink from '../../shared/IrregularInfoLink/IrregularInfoLink';
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

const SentenceList = styled.ul`
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-size: 40px;
    align-items: center;
    flex-wrap: wrap;
    color: #ffeb3b;
`

const ConjugationItem = styled.li`
    margin: 10px 5px;
`;

const Sentence = styled.p`
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

const Sentences = ({location, firestore, getSentenceData, clearSentenceData, counters, explanation, sentence, translation, irregular}) => {
    useEffect(() => {
        getSentenceData(firestore, location.pathname.split('/')[2], counters);
        //eslint-disable-next-line
    }, [firestore, location, getSentenceData])

    useEffect(() => {
        return () => {
            clearSentenceData();
        }
    }, [clearSentenceData])

    const getNextSentence = () => {
        getSentenceData(firestore, location.pathname.split('/')[2], counters);
    }

    return (
        <Container>
            <Helmet>
                <title>{`${explanation ? explanation.title : 'Loading'} - Korean practice`}</title>
            </Helmet>
            <PageTitle>{`${explanation ? explanation.title : 'Loading...'}`}</PageTitle>
            {
                explanation && sentence ? (
                    <Wrapper>
                        <TopContainer>
                            <IrregularInfoLink irregularType={irregular} />
                            <StyledNormalBtn onClick={getNextSentence}>Next</StyledNormalBtn>
                        </TopContainer>
                        {
                            typeof sentence === 'object' ? (
                                <SentenceList data-tip={translation.map(item => `${item.korean}: ${item.english}`)}>
                                    {
                                        sentence.map((item, key) => {
                                            return (
                                                <ConjugationItem key={key}>{item}</ConjugationItem>
                                            )
                                        })
                                    }
                                </SentenceList>
                            ) : (
                                <Sentence data-tip={translation.map(item => `${item.korean}: ${item.english}`)}>
                                    { sentence }
                                </Sentence>
                            )
                        }
                        <Dot />
                        <Explanation>
                            {explanation.text} <br/><br/>
                            <ExplanationMore>
                                See more at: <a href={explanation.link}>{explanation.link}</a>
                            </ExplanationMore>
                        </Explanation>
                    </Wrapper>
                ) : (
                    <PageLoader />
                )
            }
            {
                explanation && sentence && <StyledTooltip type="info" effect="solid" />
            }
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        counters: state.sentencesReducer.counters,
        explanation: state.sentencesReducer.explanation,
        sentence: state.sentencesReducer.sentence,
        translation: state.sentencesReducer.translation,
        irregular: state.sentencesReducer.irregular
    }
}

export default connect(mapStateToProps, { getSentenceData, clearSentenceData })(withFirestore(withRouter(Sentences)));