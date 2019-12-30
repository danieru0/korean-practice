import React from 'react';

import LinksContainer from '../../shared/LinksContainer/LinksContainer';

const Conjugation = () => {
	const links = {
		0: {
			testLink: '/testtwo/past-tense',
			sectionLink: '/conjugation/past-tense',
			sectionText: 'Past tense'
        },
        1: {
			testLink: '/testtwo/present-tense',
			sectionLink: '/conjugation/present-tense',
			sectionText: 'Present tense'
        },
        2: {
			testLink: '/testtwo/future-tense-1',
			sectionLink: '/conjugation/future-tense-1',
			sectionText: 'Future tense <br /> 겠다'
        },
        3: {
			testLink: '/testtwo/future-tense-2',
			sectionLink: '/conjugation/future-tense-2',
			sectionText: 'Future tense <br /> ~ㄹ/을 것'
        }, 
        4: {
			sectionLink: '/conjugation/ida-past-tense',
			sectionText: '이다 <br /> Past tense'
        },
        5: {
			sectionLink: '/conjugation/ida-present-tense',
			sectionText: '이다 <br /> Present tense'
        },
        6: {
			sectionLink: '/conjugation/future-tense-3',
			sectionText: '이다 <br /> Future tense using 되다'
        }
	}
    return (
		<LinksContainer linksObject={links} title="Conjugation" bordercolor="#ff9800" />
    );
};

export default Conjugation;