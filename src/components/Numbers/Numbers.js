import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import styled from 'styled-components';

import { getNumbers, clearWords } from '../../actions/wordsAction';

import PracticeBtn from '../../shared/PracticeBtn/PracticeBtn';
import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';
import LinksContainer from '../../shared/LinksContainer/LinksContainer';

const Container = styled.div`
	width: calc(100% - 200px);
	min-height: 100vh;
	max-height: auto;
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

const StyledPracticeBtn = styled(PracticeBtn)`
	margin: 20px;
	font-size: 20px;
	display: flex;
	flex-direction: column;
	position: relative;
`

const Line = styled.hr`
	width: 60%;
`

const Text = styled.p``

const Numbers = ({location, getNumbers, firestore, words, clearWords}) => {
    useEffect(() => {
        if (location.pathname.split('/')[2]) {
            getNumbers(firestore, location.pathname.split('/')[2]);
        }

        return () => {
            clearWords();
        }
    }, [location, getNumbers, firestore, clearWords]);

    const links = {
        0: {
            testLink: '/testone/numbers?=sino-numbers',
            sectionLink: '/numbers/sino-numbers',
            sectionText: 'Sino-korean numbers'
        },
        1: {
            testLink: '/testone/numbers?=pure-numbers',
            sectionLink: '/numbers/pure-numbers',
            sectionText: 'Pure numbers'
        }
    }

    if (location.pathname.split('/')[2]) {
        return (
            <Container>
                <PageTitle>{location.pathname.split('/')[2].split('-').join(' ')}</PageTitle>
                {
                    words.length !== 0 ? (
                        words.map((item, key) => {
                            return (
                                <StyledPracticeBtn key={key} notClickable small={true} bordercolor="#7134eb">
                                    <Text>{item.korean}</Text>
                                    <Line />
                                    <Text>{item.english}</Text>
                                </StyledPracticeBtn>
                            )
                        })
                    ) : (
                        <PageLoader />
                    )
                }
            </Container>
        )
    } else {
        return <LinksContainer linksObject={links} bordercolor="#7134eb" title="Numbers"/>;
    }
};

const mapStateToProps = state => {
    return {
        words: state.wordsReducer.words
    }
}

export default connect(mapStateToProps, { getNumbers, clearWords })(withFirestore(withRouter(Numbers)));