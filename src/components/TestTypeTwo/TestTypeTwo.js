import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import Helmet from 'react-helmet';
import ReactTooltip from 'react-tooltip'

import { getTest, clearTest } from '../../actions/testTypeTwoAction';
import { giveExpAndAnswers, clearUserExpAnswerStatus } from '../../actions/userAction';

import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';
import TestBtn from '../../shared/TestBtn/TestBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
    padding-top: 70px;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: center;
    position: relative;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`

const Test = styled.div`
    width: 540px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: ${props => props.theme.mainFont};
    color: ${props => props.theme.mainFontColor};

    @media (max-width: 780px) {
        width: 100%;
        padding: 0px 20px;
    }
`

const TestWordToConjugate = styled.div`
    font-size: 36px;
    color: #ffeb3b;
    text-transform: uppercase;
    margin-bottom: 10px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TestWrapper = styled.div`
    display: flex;
    margin: 10px 0px;
    align-items: center;
    width: 100%;

    @media (max-width: 514px) {
        flex-direction: column;
    }

`

const TestHonorificsType = styled.p`
    font-size: 24px;
`

const TestAnswerInput = styled.input`
    background: #000;
    width: 300px;
    height: 45px;
    font-size: 18px;
    padding: 0px 10px;
    color: #fff;
    margin-left: auto;
    transition: border 0.3s cubic-bezier(1, 0, 0, 1);

    @media (max-width: 780px) {
        width: 200px;
    }

    @media (max-width: 600px) {
        width: 250px;
    }

    @media (max-width: 514px) {
        width: 280px;
        margin: 0;
        margin-top: 8px;
    }

    ${props => {
        switch(props.correctanswer) {
            case true:
                return 'border: 1px solid green'
            case false:
                return 'border: 1px solid red'
            default: return 'border: 1px solid #424242'
        }
    }}
`

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 30px;

    @media (max-width: 364px) {
        flex-direction: column;

        button:nth-of-type(1) {
            order: 3;
        }
        button:nth-of-type(2) {
            order: 2;
        }
    }
`

const StyledTooltip = styled(ReactTooltip)`
	font-size: 18px !important;
	font-family: ${props => props.theme.mainFont} !important;
`

const StyledTestBtn = styled(TestBtn)`
    margin: 0px 10px;

    @media (max-width: 364px) {
        margin: 10px 0px;
    }
`

class TestTypeTwo extends Component {
    constructor() {
        super();
        this.state = {
            1: {
                value: '',
                correct: 'notSet'
            },
            2: {
                value: '',
                correct: 'notSet'
            },
            3: {
                value: '',
                correct: 'notSet'
            },
            4: {
                value: '',
                correct: 'notSet'
            },
            allCorrect: false,
            answerFromClick: false,
            nextInit: false
        }
    }

    componentDidMount() {
        this.props.getTest(this.props.firestore, this.props.location.pathname.split('/')[2]);
        document.addEventListener('keydown', this.handleNextEnter);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loadingTestTypeTwo !== this.props.loadingTestTypeTwo) {
            if (this.props.loadingTestTypeTwo === false) {
                this.setState({
                    nextInit: false
                })
            }

        }
    }

    componentWillUnmount() {
        this.props.clearTest();
        this.props.clearUserExpAnswerStatus();
        document.removeEventListener('keydown', this.handleNextEnter);
    }

    handleAnswerInputChange = e => {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value
            }
        })
    }

    handleCheck = () => {
        if (this.state.allCorrect === false && this.state.answerFromClick === false && this.state.nextInit === false && this.props.testTypeTwoData[0]) {
            let counter = 0;
            for (let i = 1; i < 5; i++) {
                if (this.state[i].value === this.props.testTypeTwoData[0][i]) {
                    this.setState({
                        [i]: {
                            ...this.state[i],
                            correct: true
                        }
                    });
                    counter++;
                } else {
                    this.setState({
                        [i]: {
                            ...this.state[i],
                            correct: false
                        }
                    });
                }
            }
    
            if (counter === 4) {
                this.setState({
                    allCorrect: true
                })
                this.props.giveExpAndAnswers(this.props.firestore, this.props.exp);
            }
        }
    }

    handleAnswerClick = () => {
        if (this.state.allCorrect === false && this.state.nextInit === false && this.props.testTypeTwoData[0]) {
            this.setState({
                allCorrect: true,
                answerFromClick: true
            }, () => {
                for (let i = 1; i < 5; i++) {
                    this.setState({
                        [i]: {
                            ...this.state[i],
                            correct: true,
                            value: this.props.testTypeTwoData[0][i]
                        }
                    })
                }
            })
        }
    }

    handleNextInputEnter = e => {
        if (e.key === 'Enter') {
            if (e.target.name < 4) {
                document.querySelector(`[name="${Number(e.target.name) + 1}"]`).focus();
            } else {
                this.handleCheck();
            }
        }
    }

    handleNextEnter = e => {
        if (e.key === 'Enter' && this.state.allCorrect && this.props.userExpAndAnswerUpdated === true) {
            this.handleNext();
        }
    }

    handleNext = () => {
        if (this.state.allCorrect) {
            if (!this.state.answerFromClick) {
                if (this.props.userExpAndAnswerUpdated !== true) return false;
            }
        }

        if (this.state.nextInit === false) {
            this.setState({
                nextInit: true
            }, () => {
                for (let i = 1; i < 5; i++) {
                    this.setState({
                        [i]: {
                            ...this.state[i],
                            correct: 'notSet',
                            value: ''
                        }
                    })
                }
                this.setState({
                    allCorrect: false,
                    answerFromClick: false,
                }, () => {
                    this.props.getTest(this.props.firestore, this.props.location.pathname.split('/')[2], this.props.numberOfWords);
                })
            })
        }
    }

    render() {
        const { testTypeTwoData, loadingTestTypeTwo, location, userExpAndAnswerUpdated } = this.props;

        return (
            <Container>
                {
                    loadingTestTypeTwo || <StyledTooltip type="info" effect="solid"/>
                }
                <Helmet>
                    <title>Test - Korean practice</title>
                </Helmet>
                <PageTitle>{`Test / ${location.pathname.split('/')[2].split('-').join(' ')}`}</PageTitle>
                {
                    testTypeTwoData ? (
                        <Test>
                            <TestWordToConjugate data-tip={loadingTestTypeTwo || testTypeTwoData[1].english}>
                                {
                                    loadingTestTypeTwo ? (
                                        <PageLoader />
                                    ) : (
                                        testTypeTwoData[1].korean
                                    )
                                }
                            </TestWordToConjugate>
                            <TestWrapper>
                                <TestHonorificsType>Plain form:</TestHonorificsType>
                                <TestAnswerInput autoComplete="off" onKeyDown={this.handleNextInputEnter} disabled={this.state[1].correct !== 'notSet' && this.state[1].correct} correctanswer={this.state[1].correct} onChange={this.handleAnswerInputChange} value={this.state[1].value} name="1" placeholder="Answer..."/>
                            </TestWrapper>
                            <TestWrapper>
                                <TestHonorificsType>Informal low respect:</TestHonorificsType>
                                <TestAnswerInput autoComplete="off" onKeyDown={this.handleNextInputEnter} disabled={this.state[2].correct !== 'notSet' && this.state[2].correct} correctanswer={this.state[2].correct} onChange={this.handleAnswerInputChange} value={this.state[2].value} name="2" placeholder="Answer..."/>
                            </TestWrapper>
                            <TestWrapper>
                                <TestHonorificsType>Informal high respect:</TestHonorificsType>
                                <TestAnswerInput autoComplete="off" onKeyDown={this.handleNextInputEnter} disabled={this.state[3].correct !== 'notSet' && this.state[3].correct} correctanswer={this.state[3].correct} onChange={this.handleAnswerInputChange} value={this.state[3].value} name="3" placeholder="Answer..."/>
                            </TestWrapper>
                            <TestWrapper>
                                <TestHonorificsType>formal high respect:</TestHonorificsType>
                                <TestAnswerInput autoComplete="off" onKeyDown={this.handleNextInputEnter} disabled={this.state[4].correct !== 'notSet' && this.state[4].correct} correctanswer={this.state[4].correct} onChange={this.handleAnswerInputChange} value={this.state[4].value} name="4" placeholder="Answer..."/>
                            </TestWrapper>
                            <ButtonsWrapper>
                                <StyledTestBtn correctanswer={this.state.allCorrect} onClick={this.handleAnswerClick} bordercolor="#f44336">Answer</StyledTestBtn>
                                <StyledTestBtn correctanswer={userExpAndAnswerUpdated === 'loading' ? 1 : 0} onClick={this.handleNext} bordercolor="#03a9f4">Next</StyledTestBtn>
                                <StyledTestBtn correctanswer={this.state.allCorrect} onClick={this.handleCheck} disabled={this.state.allCorrect}>Check</StyledTestBtn>
                            </ButtonsWrapper>
                        </Test>
                    ) : (
                        <PageLoader />
                    )
                }
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        testTypeTwoData: state.testTypeTwoReducer.testTypeTwoData,
        loadingTestTypeTwo: state.testTypeTwoReducer.loadingTestTypeTwo,
        numberOfWords: state.testTypeTwoReducer.numberOfWords,
        exp: state.testTypeTwoReducer.exp,
        userExpAndAnswerUpdated: state.userReducer.userExpAndAnswerUpdated
    }
}

export default connect(mapStateToProps, { getTest, clearTest, giveExpAndAnswers, clearUserExpAnswerStatus })(withFirestore(withRouter(TestTypeTwo)));