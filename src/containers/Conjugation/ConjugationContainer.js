import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';

import { getExplanation, getRandomConjugatedWord, clearConjugation } from '../../actions/conjugationAction';

import IrregularInfoLink from '../../shared/IrregularInfoLink/IrregularInfoLink';

import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';
import MainLoader from '../../shared/MainLoader/MainLoader';
import NormalBtn from '../../shared/NormalBtn/NormalBtn';

const Container = styled.div`
	width: calc(100% - 200px);
    min-height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	padding-top: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Wrapper = styled.div`
    width: 800px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    font-family: ${props => props.theme.mainFont};
    color: ${props => props.theme.mainFontColor};

    @media (max-width: 1035px) {
        width: 100%;
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

const ConjugationList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-size: 40px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
`

const ConjugationItem = styled.li`
    margin: 0px 5px;
`;

const YellowItem = styled.span`
    color: #ffeb3b;
`

const ExplanationButton = styled.button`
    background: none;
    border: none;
    font-size: 30px;
    font-family: ${props => props.theme.mainFont};
    color: ${props => props.theme.mainFontColor};
    text-transform: uppercase;
    width: 110px;
    margin: 0px auto;
    margin-top: 5px;

    &:hover, &:focus {
        color: #aaa;
    }
`

const StyledFontAwesomeArrow = styled(FontAwesome)`
    font-size: 24px;
    margin-left: 6px;
    transform: ${({activeexplanation}) => activeexplanation ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform .5s ease-in-out;
`

const ExplanationList = styled.ul`
    width: 100%;
    height: auto;
    transform-origin: top;
    transform: ${({activeexplanation}) => activeexplanation ? 'scaleY(1)' : 'scaleY(0)'};
    overflow: hidden;
    font-size: 18px;
    transition: transform .5s ease-in-out;
`

const ExplanationItem = styled.li`
    margin: 10px 0px;
    margin-left: 23px;
    list-style: disc;

    &:last-child {
        list-style: none;
        margin: 0px;
        margin-top: 40px;
        color: ${props => props.theme.infoColor};
        font-size: 16px;
        
        a {
            color: ${props => props.theme.infoColor};
        }
    }
`

const ExplanationLine = styled.span`
    margin: 0px 10px;
`

const ConjugationContainer = ({location, firestore, getExplanation, getRandomConjugatedWord, clearConjugation, explanation, conjugatedWord, word, loadingNewWorld}) => {
    const [activeExplanation, setActiveExplanation] = useState(false);

    useEffect(() => {
        getExplanation(firestore, location.pathname.split('/')[2]);
        getRandomConjugatedWord(firestore, location.pathname.split('/')[2]);

        return (() => {
            clearConjugation();
        })
    }, [location, firestore, getExplanation, getRandomConjugatedWord, clearConjugation]);

    const getNextConjugation = () => {
        getRandomConjugatedWord(firestore, location.pathname.split('/')[2]);
    }

    return (
        <Container>
            <Helmet>
                <title>{`${explanation ? explanation.info.title : 'Loading...'} - Korean practice`}</title>
            </Helmet>
            <MainLoader show={loadingNewWorld}/>
            <PageTitle>{`${explanation ? explanation.info.title : 'Loading...'}`}</PageTitle>
            {
                word ? (
                    <Wrapper>
                        <TopContainer>
                            <IrregularInfoLink irregularType={conjugatedWord.info.irregular} />
                            <StyledNormalBtn onClick={getNextConjugation}>Next</StyledNormalBtn>
                        </TopContainer>
                        <ConjugationList>
                            {
                                Object.keys(conjugatedWord).map((item, key) => {
                                    if (Number(item)) {
                                        return (
                                            <ConjugationItem key={key}>
                                                {
                                                    <>
                                                        {conjugatedWord[item].substring(0, conjugatedWord.info.breakpoint)}
                                                        <YellowItem>
                                                            {conjugatedWord[item].substring(conjugatedWord.info.breakpoint)}
                                                        </YellowItem>
                                                    </>
                                                }
                                            </ConjugationItem>
                                        )
                                    }

                                    return null;
                                })
                            }
                        </ConjugationList>
                        <ExplanationButton onClick={() => setActiveExplanation(!activeExplanation)}>
                            Why?
                            <StyledFontAwesomeArrow activeexplanation={activeExplanation ? 1 : 0} name="long-arrow-alt-down" />
                        </ExplanationButton>
                        <ExplanationList activeexplanation={activeExplanation ? 1 : 0}>
                            {
                                Object.keys(explanation).map((item, key) => {
                                    if (item === '0') {
                                        return (
                                            <ExplanationItem key={key}>
                                                { word.stem }
                                                <ExplanationLine>-</ExplanationLine>
                                                { `${explanation[item]} (${word.korean} / ${word.english})` }
                                            </ExplanationItem>
                                        )
                                    } else if (Number(item)) {
                                        let subst;
                                        if (explanation[item].word === 0) {
                                            subst = conjugatedWord.info.breakpoint;
                                        } else {
                                            subst = 0;
                                        }

                                        return (
                                            <ExplanationItem key={key}>
                                                <YellowItem>
                                                    { conjugatedWord[item].split(' ')[explanation[item].word].substring(subst) }
                                                </YellowItem>
                                                <ExplanationLine>-</ExplanationLine>
                                                { explanation[item].text }
                                            </ExplanationItem>
                                        )
                                    }

                                    return false;
                                })
                            }
                            <ExplanationItem>
                                See more at: <a href={explanation.info.link}>{explanation.info.link}</a>
                            </ExplanationItem>
                        </ExplanationList>
                    </Wrapper>
                ) : (
                    <PageLoader />
                )
            }

        </Container>
    );
};

const mapStateToProps = state => {
    return {
        explanation: state.conjugationReducer.explanation,
        conjugatedWord: state.conjugationReducer.conjugatedWord,
        word: state.conjugationReducer.word,
        loadingNewWorld: state.conjugationReducer.loadingNewWorld
    }
}

export default connect(mapStateToProps, { getExplanation, getRandomConjugatedWord, clearConjugation })(withFirestore(withRouter(ConjugationContainer)));