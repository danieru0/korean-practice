import React from 'react';

import LinksContainer from '../../shared/LinksContainer/LinksContainer';

const Sentences = () => {
    const links = {
        0: {
			sectionLink: '/sentences/ida',
			sectionText: `To be <br /> 이다`
        },
        1: {
			sectionLink: '/sentences/to-have',
			sectionText: 'To have <br /> 있다'
        },
        2: {
			sectionLink: '/sentences/to-be-at-location',
			sectionText: 'To be at location <br /> 있다'
        },
        3: {
			sectionLink: '/sentences/possessive',
			sectionText: 'Possessive particle <br /> 의'
        }, 
        4: {
			sectionLink: '/sentences/describe-nouns',
			sectionText: 'Describing nouns <br /> ㄴ/은'
        },
        5: {
			sectionLink: '/sentences/negative-sentence-1',
			sectionText: 'Negative sentence <br /> 안'
        },
        6: {
			sectionLink: '/sentences/negative-sentence-2',
			sectionText: 'Negative sentence <br /> 지 않다'
        },
        7: {
            sectionLink: '/sentences/to-not-have',
            sectionText: 'To not have <br /> 없다'
        },
        8: {
            sectionLink: '/sentences/to-not-be',
            sectionText: 'To not be <br /> 아니다'
        }
    }
    return (
        <LinksContainer linksObject={links} title="Sentences" bordercolor="#795548" />
    );
};

export default Sentences;