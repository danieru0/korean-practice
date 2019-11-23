import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { getLetter } from '../../../../actions/lettersAction';

import PageTitle from '../../../../shared/PageTitle/PageTitle';
import PageLoader from '../../../../shared/PageLoader/PageLoader';
import Menu from './Menu';

const Container = styled.div`
	width: calc(100% - 200px);
	height: 100vh;
	margin-left: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	flex-direction: column;
	font-family: ${props => props.theme.mainFont};
	color: ${props => props.theme.mainFontColor};

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}

	@media (max-height: 410px) {
		height: 410px;
	}
`

const LetterRead = styled.span`
	font-size: 64px;
`

const LetterName = styled.span`
	font-size: 22px;
	margin: 10px 0px;
	text-transform: uppercase;
`

class Consonants extends Component {
	componentDidUpdate(prevProps) {
		if (prevProps.location.pathname.split('/')[4] !== this.props.location.pathname.split('/')[4]) {
			this.props.getLetter(this.props.firestore, this.props.location.pathname.split('/')[4]);
		}
	}

	componentDidMount() {
		this.props.getLetter(this.props.firestore, this.props.location.pathname.split('/')[4] || '01');
	}

	render() {
		const {location, letter} = this.props;
		return (
			<Container>
				<PageTitle>Consonants</PageTitle>
				<Menu active={location.pathname.split('/')[4]}/>
				{
					letter ? (
						<>
							<LetterRead>{`${letter.korean} = ${letter.english}`}</LetterRead>
							<LetterName>{`Name: ${letter.name}`}</LetterName>
						</>
					) : (
						<PageLoader />
					)
				}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		letter: state.lettersReducer.letter
	}
}

export default connect(mapStateToProps, { getLetter })(withRouter(withFirestore(Consonants)));