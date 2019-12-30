import React from 'react';

import LinksContainer from '../../shared/LinksContainer/LinksContainer';

const Irregulars = () => {
    const links = {
        0: {
			sectionLink: '/irregulars/1',
			sectionText: 'ㅅ irregular'
        },
        1: {
			sectionLink: '/irregulars/2',
			sectionText: 'ㄷ irregular'
        },
        2: {
			sectionLink: '/irregulars/3',
			sectionText: 'ㅂ irregular'
        },
        3: {
			sectionLink: '/irregulars/4',
			sectionText: 'ㅡ irregular'
        }, 
        4: {
			sectionLink: '/irregulars/5',
			sectionText: '르 irregular'
        },
        5: {
			sectionLink: '/irregulars/6',
			sectionText: 'ㄹ irregular'
        }
    }
    return (
        <LinksContainer linksObject={links} bordercolor="#50d890" title="Irregulars" />
    );
};

export default Irregulars;