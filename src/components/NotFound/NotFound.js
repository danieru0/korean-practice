import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const Container = styled.div`
	width: calc(100% - 200px);
	margin-left: 200px;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
    color: #ccc;
    font-family: ${props => props.theme.mainFont};

    @media (max-width: 600px) {
		width: 100%;
		margin: 0;
	}
`

const Fourzerofour = styled.p`
    font-size: 112px;
`

const Text = styled.p`
    font-size: 42px;
`

const NotFound = () => {
    return (
        <Container>
            <Helmet>
                <title>404 - Korean practice</title>
            </Helmet>
            <Fourzerofour>404</Fourzerofour>
            <Text>Not found |･ω･)</Text>
        </Container>
    );
};

export default NotFound;