import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ConsonantsMenu = styled.ul`
	font-family: ${props => props.theme.mainFont};
	font-size: 32px;
	list-style: none;
	position: absolute;
	display: flex;
	justify-content: center;
	top: 70px;
	flex-wrap: wrap;
`

const ConsonantsItem = styled.li`
	margin: 0px 3px;
`

const ConsonantsLink = styled(Link)`
	text-decoration: none;
	color: ${({active, theme}) => active ? '#FFFF00' : theme.mainFontColor};
`

const Menu = ({active}) => {
	return (
		<ConsonantsMenu>
			<ConsonantsItem>
				<ConsonantsLink active={active === undefined || active === '01' ? 1 : 0} to="/alphabet/letters/consonants/01">ㄱ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '02' ? 1 : 0} to="/alphabet/letters/consonants/02">ㄲ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '03' ? 1 : 0} to="/alphabet/letters/consonants/03">ㄴ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '04' ? 1 : 0} to="/alphabet/letters/consonants/04">ㄷ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '05' ? 1 : 0} to="/alphabet/letters/consonants/05">ㄸ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '06' ? 1 : 0} to="/alphabet/letters/consonants/06">ㄹ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '07' ? 1 : 0} to="/alphabet/letters/consonants/07">ㅁ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '08' ? 1 : 0} to="/alphabet/letters/consonants/08">ㅂ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '09' ? 1 : 0} to="/alphabet/letters/consonants/09">ㅃ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '10' ? 1 : 0} to="/alphabet/letters/consonants/10">ㅅ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '11' ? 1 : 0} to="/alphabet/letters/consonants/11">ㅆ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '12' ? 1 : 0} to="/alphabet/letters/consonants/12">ㅇ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '13' ? 1 : 0} to="/alphabet/letters/consonants/13">ㅈ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '14' ? 1 : 0} to="/alphabet/letters/consonants/14">ㅉ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '15' ? 1 : 0} to="/alphabet/letters/consonants/15">ㅊ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '16' ? 1 : 0} to="/alphabet/letters/consonants/16">ㅋ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '17' ? 1 : 0} to="/alphabet/letters/consonants/17">ㅌ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '18' ? 1 : 0} to="/alphabet/letters/consonants/18">ㅍ</ConsonantsLink>
			</ConsonantsItem>
			<ConsonantsItem>
				<ConsonantsLink active={active === '19' ? 1 : 0} to="/alphabet/letters/consonants/19">ㅎ</ConsonantsLink>
			</ConsonantsItem>
		</ConsonantsMenu>
	);
};

export default Menu;