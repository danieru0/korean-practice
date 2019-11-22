import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { getTest } from '../../actions/testTypeOneAction';

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
`

const ReverseButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.mainFontColor};
    font-family: ${props => props.theme.mainFont};
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
`

const StyledTestBtn = styled(TestBtn)`
    margin: 0px 10px;
`

class TestTypeOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reverse: false,
            answerInputValue: '',
            correct: false,
            wrong: false
        }
    }

    componentDidMount() {
        this.props.getTest(this.props.firestore, this.props.location.pathname.split('/')[2]);
    }

    handleAnswerInputChange = e => {
        this.setState({
            answerInputValue: e.target.value,
            wrong: false
        });
    }

    handleCheckClick = () => {
        if (this.props.location.pathname.split('/')[2] === 'letter') {
            if (this.state.answerInputValue.toLowerCase() === this.props.testTypeOneData.pron.toLowerCase()) {
                this.setState({
                    correct: true
                });
            } else {
                this.setState({
                    wrong: true
                })
            }
        }
    }

    render() {
        const { testTypeOneData, location } = this.props;

        return (
            <Container>
                <PageTitle>{`Test / ${location.pathname.split('/')[2]}`}</PageTitle>
                {
                    testTypeOneData ? (
                        <Test>
                            <TopWrapper>
                                <TestTitle>{`Translate this ${location.pathname.split('/')[2]}`}</TestTitle>
                                <ReverseButton>Reverse</ReverseButton>
                            </TopWrapper>
                            <TestTask correctanswer={this.state.correct ? 1 : 0}>{testTypeOneData.korean}</TestTask>
                            <TestAnswerInput wronganswer={this.state.wrong ? 1 : 0} disabled={this.state.correct} correctanswer={this.state.correct ? 1 : 0} onChange={this.handleAnswerInputChange} value={this.state.answerInputValue} placeholder="Your answer..."/>
                            <ButtonsWrapper>
                                <StyledTestBtn correctanswer={this.state.correct} bordercolor="#f44336">Answer</StyledTestBtn>
                                <StyledTestBtn bordercolor="#03a9f4">Next</StyledTestBtn>
                                <StyledTestBtn correctanswer={this.state.correct} disabled={this.state.correct} onClick={this.handleCheckClick}>Check</StyledTestBtn>
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
        testTypeOneData: state.testTypeOneReducer.testTypeOneData
    }
}

export default connect(mapStateToProps, { getTest })(withFirestore(withRouter(TestTypeOne)));