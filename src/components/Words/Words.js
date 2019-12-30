import React from 'react';

import LinksContainer from '../../shared/LinksContainer/LinksContainer';

const Words = () => {
	const links = {
		0: {
			testLink: '/testone/nouns',
			testText: 'Test all',
			sectionLink: '/words/nouns/categories',
			sectionText: 'Nouns'
		},
		1: {
			testLink: '/testone/verb',
			sectionLink: '/words/verb',
			sectionText: 'Verbs'
		},
		2: {
			testLink: '/testone/adjective',
			sectionLink: '/words/adjectives',
			sectionText: 'Adjectives'
		},
		3: {
			testLink: '/testone/adverbs',
			sectionLink: '/words/adverbs',
			sectionText: 'Adverbs'
		}
	}

	return (
		<LinksContainer linksObject={links} title="Words" bordercolor="#00bcd4" />
	);
};

export default Words;