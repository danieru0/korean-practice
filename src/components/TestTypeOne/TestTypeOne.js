import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import Helmet from 'react-helmet';

import { getTest, clearTest } from '../../actions/testTypeOneAction';
import { giveExpAndAnswers, clearUserExpAnswerStatus } from '../../actions/userAction';

import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';
import TestBtn from '../../shared/TestBtn/TestBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
    padding-top: 80px;
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
    width: 800px;
    height: auto;
    display: flex;
    flex-direction: column;
    font-family: ${props => props.theme.mainFont};
    color: ${props => props.theme.mainFontColor};

    @media (max-width: 1030px) {
        width: 100%;
        padding: 0px 20px;
    }
`

const TopWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const TestTitle = styled.p`
    font-size: 32px;
    text-transform: uppercase;
    margin-bottom: 10px;

    @media (max-width: 752px) {
        font-size: 24px;
    }
`

const ReverseButton = styled.button`
    background: none;
    border: none;
    font-family: ${props => props.theme.mainFont};

    ${props => {
        switch(props.reversed) {
            case 'reverseInit':
                return "color: #b9b7b7"
            case 'active':
                return "color: #525151"
            default: return `color: #fff`
        }
    }}
`

const TestTask = styled.div`
    width: 100%;
    height: 200px;
    border: 0;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    user-select: none;
    box-shadow: inset 0 0 0 7px #424242;
    position: relative;
    vertical-align: middle;

    &::before, &::after {
        box-sizing: inherit;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform-origin: center;
        transition: transform 1s cubic-bezier(1, 0, 0, 1);
    }

    &::before {
        border-top: 7px solid green;
        border-bottom: 7px solid green;
        transform: ${({correctanswer}) => correctanswer ? 'scale3d(1,1,1)' : 'scale3d(0,1,1)'};
    }

    &::after {
        border-left: 7px solid green;
        border-right: 7px solid green;
        transform: ${({correctanswer}) => correctanswer ? 'scale3d(1,1,1)' : 'scale3d(1,0,1)'};
    }
`

const TestAnswerInput = styled.input`
    width: 100%;
    height: 80px;
    margin-top: 5px;
    background: none;
    border: none;
    border-bottom: ${({correctanswer, wronganswer}) => correctanswer ? '4px solid green' : wronganswer ? '4px solid red' : '4px solid #000'};
    transition: border-bottom 1s cubic-bezier(1, 0, 0, 1);
    color: #ddd;
    font-size: 28px;
    padding: 0px 10px;
`

const ButtonsWrapper = styled.div`
    display: flex;
    margin-left: auto;
    margin-top: 10px;

    @media (max-width: 400px) {
        flex-direction: column;
        margin-left: 0;
        align-items: center;

        button:nth-of-type(1) {
            order: 3;
        }
        button:nth-of-type(2) {
            order: 2;
        }
    }
`

const StyledTestBtn = styled(TestBtn)`
    margin: 0px 10px;

    @media (max-width: 400px) {
        margin: 10px 0px;
    }
`

class TestTypeOne extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            reverse: false,
            reverseOnNextTask: false,
            answerInputValue: '',
            correct: false,
            wrong: false,
            answerFromClick: false,
            nextInit: false
        }
    }

    answerInputRef = React.createRef();

    componentDidMount() {
        let pathnameWithSearch = this.props.location.pathname + this.props.location.search;
        this.setState({
            url: pathnameWithSearch.split('/')[2]
        }, () => {
            this.props.getTest(this.props.firestore, this.state.url);
            document.addEventListener('keydown', this.handleNextEnter);
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loadingTestTypeOne !== this.props.loadingTestTypeOne) {
            if (this.props.loadingTestTypeOne === false) {
                this.setState({
                    nextInit: false
                })
                this.answerInputRef.current.focus();
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
            answerInputValue: e.target.value,
            wrong: false
        });
    }

    handleCheck = () => {
        if (!this.state.answerFromClick && this.props.testTypeOneData.english && !this.state.correct) {
            const correctAnswer = this.state.reverse ? this.props.testTypeOneData.korean : this.props.testTypeOneData.english.toLowerCase();
            if (this.state.answerInputValue.toLowerCase() === correctAnswer) {
                this.setState({
                    correct: true
                });
                this.props.giveExpAndAnswers(this.props.firestore, this.props.exp);
            } else {
                this.setState({
                    wrong: true
                })
            }
        }
    }

    handleAnswerClick = () => {
        this.setState({
            correct: 1,
            answerInputValue: this.state.reverse ? this.props.testTypeOneData.korean : this.props.testTypeOneData.english,
            answerFromClick: true
        })
    }

    handleReverseClick = () => {
        this.setState({
            reverseOnNextTask: !this.state.reverseOnNextTask
        });
    }

    handleNextEnter = () => {
        if (this.state.correct && this.props.userExpAndAnswerUpdated === true) {
            this.handleNext();
        }
    }

    handleNext = () => {
        if (this.state.correct) {
            if (!this.state.answerFromClick) {
                if (this.props.userExpAndAnswerUpdated !== true) return false;
            }
        }

        if (this.state.nextInit === false) {
            this.setState({
                nextInit: true
            }, () => {
                if (this.state.reverseOnNextTask) {
                    this.setState({
                        reverseOnNextTask: false,
                        reverse: !this.state.reverse,
                        correct: false,
                        wrong: false,
                        answerInputValue: '',
                        answerFromClick: false
                    }, () => {
                        this.props.getTest(this.props.firestore, this.state.url);
                    });
                } else {
                    this.setState({
                        correct: false,
                        wrong: false,
                        answerInputValue: '',
                        answerFromClick: false
                    }, () => {
                        this.props.getTest(this.props.firestore, this.state.url);
                    });
                }
        
                this.props.clearUserExpAnswerStatus();
            })
        }

    }

    render() {
        const { testTypeOneData, loadingTestTypeOne, userExpAndAnswerUpdated, task, title } = this.props;

        return (
            <Container>
                <Helmet>
                    <title>Test - Korean practice</title>
                </Helmet>
                <PageTitle>{`Test / ${title}`}</PageTitle>
                {
                    testTypeOneData ? (
                        <Test>
                            <TopWrapper>
                                <TestTitle>{task}</TestTitle>
                                <ReverseButton reversed={this.state.reverseOnNextTask ? 'reverseInit' : this.state.reverse && 'active'} onClick={this.handleReverseClick}>Reverse</ReverseButton>
                            </TopWrapper>
                            <TestTask correctanswer={this.state.correct ? 1 : 0}>
                                {
                                    loadingTestTypeOne ? (
                                        <PageLoader />
                                    ) : (
                                        this.state.reverse ? testTypeOneData.english : testTypeOneData.korean
                                    )
                                }
                            </TestTask>
                            <TestAnswerInput autoComplete="off" ref={this.answerInputRef} wronganswer={this.state.wrong ? 1 : 0} disabled={this.state.correct} correctanswer={this.state.correct ? 1 : 0} onKeyDown={(e) => e.key === 'Enter' && this.handleCheck(e)} onChange={this.handleAnswerInputChange} value={this.state.answerInputValue} placeholder="Your answer..."/>
                            <ButtonsWrapper>
                                <StyledTestBtn onClick={this.handleAnswerClick} correctanswer={this.state.correct} bordercolor="#f44336">Answer</StyledTestBtn>
                                <StyledTestBtn correctanswer={userExpAndAnswerUpdated === 'loading' ? 1 : 0} onClick={this.handleNext} bordercolor="#03a9f4">Next</StyledTestBtn>
                                <StyledTestBtn correctanswer={this.state.correct} disabled={this.state.correct} onClick={this.handleCheck}>Check</StyledTestBtn>
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
        testTypeOneData: state.testTypeOneReducer.testTypeOneData,
        loadingTestTypeOne: state.testTypeOneReducer.loadingTestTypeOne,
        exp: state.testTypeOneReducer.exp,
        title: state.testTypeOneReducer.title,
        task: state.testTypeOneReducer.task,
        userExpAndAnswerUpdated: state.userReducer.userExpAndAnswerUpdated
    }
}

export default connect(mapStateToProps, { getTest, clearTest, giveExpAndAnswers, clearUserExpAnswerStatus })(withFirestore(withRouter(TestTypeOne)));