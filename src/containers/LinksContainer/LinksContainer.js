import React, {useEffect} from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { getLinks } from '../../actions/sentencesAction';

import * as linksObject from '../../constants/linksObject';

import PageTitle from '../../shared/PageTitle/PageTitle';
import PageLoader from '../../shared/PageLoader/PageLoader';
import LinkItem from './LinkItem';

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
	padding-left: 100px;
	padding-right: 100px;

	@media (max-width: 600px) {
		width: 100%;
		margin-left: 0px;
	}
`


const LinksContainer = ({type, bordercolor, title, links, getLinks, firestore}) => {
	useEffect(() => {
		if (type === 'sentences' && links === null) {
			getLinks(firestore);
		}
	}, [firestore, getLinks, type, links]);

    return (
        <Container>
            <Helmet>
                <title>{`${title} - Korean practice`}</title>
            </Helmet>
            <PageTitle>{title}</PageTitle>
			{
				type === 'sentences' ? (
					links ? (
						Object.keys(links).map((id, key) => {
							const item = links[id];
							return (
									<LinkItem key={key} item={item} bordercolor={bordercolor} />
								)
						})
					) : (
						<PageLoader />
					)
				) : (
					Object.keys(linksObject.LINKS[type]).map((id, key) => {
						const item = linksObject.LINKS[type][id];	
						return (
								<LinkItem key={key} item={item} bordercolor={bordercolor} />
							)
					})
				)
			}
        </Container>
    );
};

LinksContainer.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	bordercolor: PropTypes.string.isRequired
}

const mapStateToProps = state => {
	return {
		links: state.sentencesReducer.links
	}
}

export default connect(mapStateToProps, { getLinks })(withFirestore(LinksContainer));