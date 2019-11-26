import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { getTest, clearTest } from '../../actions/testTypeOneAction';
import { giveExpAndAnswers, clearUserExpAnswerStatus } from '../../actions/userAction';

import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';
import TestBtn from '../../shared/TestBtn/TestBtn';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
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
            reverse: false,
            reverseOnNextTask: false,
            answerInputValue: '',
            correct: false,
            wrong: false,
            answerFromClick: false
        }
    }

    answerInputRef = React.createRef();

    componentDidMount() {
        this.props.getTest(this.props.firestore, this.props.location.pathname.split('/')[2]);
        document.addEventListener('keydown', this.handleNextEnter);
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
        if (!this.state.answerFromClick) {
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

        if (this.state.reverseOnNextTask) {
            this.setState({
                reverseOnNextTask: false,
                reverse: !this.state.reverse,
                correct: false,
                wrong: false,
                answerInputValue: '',
                answerFromClick: false
            }, () => {
                this.props.getTest(this.props.firestore, this.props.location.pathname.split('/')[2], this.props.numberOfWords);
            });
        } else {
            this.setState({
                correct: false,
                wrong: false,
                answerInputValue: '',
                answerFromClick: false
            }, () => {
                this.props.getTest(this.props.firestore, this.props.location.pathname.split('/')[2], this.props.numberOfWords);
            });
        }

        this.props.clearUserExpAnswerStatus();

        this.answerInputRef.current.focus();
    }

    render() {
        const { testTypeOneData, loadingTestTypeOne, location, userExpAndAnswerUpdated } = this.props;

        return (
            <Container>
                <PageTitle>{`Test / ${location.pathname.split('/')[2]}`}</PageTitle>
                {
                    testTypeOneData ? (
                        <Test>
                            <TopWrapper>
                                <TestTitle>{`Translate this ${location.pathname.split('/')[2]}`}</TestTitle>
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
                            <TestAnswerInput ref={this.answerInputRef} wronganswer={this.state.wrong ? 1 : 0} disabled={this.state.correct} correctanswer={this.state.correct ? 1 : 0} onKeyDown={(e) => e.key === 'Enter' && this.handleCheck(e)} onChange={this.handleAnswerInputChange} value={this.state.answerInputValue} placeholder="Your answer..."/>
                            <ButtonsWrapper>
                                <StyledTestBtn onClick={this.handleAnswerClick} correctanswer={this.state.correct} bordercolor="#f44336">Answer</StyledTestBtn>
                                <StyledTestBtn correctanswer={this.state.correct} disabled={this.state.correct} onClick={this.handleCheck}>Check</StyledTestBtn>
                                <StyledTestBtn correctanswer={userExpAndAnswerUpdated === 'loading' ? 1 : 0} onClick={this.handleNext} bordercolor="#03a9f4">Next</StyledTestBtn>
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
        numberOfWords: state.testTypeOneReducer.numberOfWords,
        exp: state.testTypeOneReducer.exp,
        userExpAndAnswerUpdated: state.userReducer.userExpAndAnswerUpdated
    }
}

export default connect(mapStateToProps, { getTest, clearTest, giveExpAndAnswers, clearUserExpAnswerStatus })(withFirestore(withRouter(TestTypeOne)));