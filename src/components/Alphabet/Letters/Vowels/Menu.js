import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const VowelsMenu = styled.ul`
	font-family: ${props => props.theme.mainFont};
	font-size: 32px;
	list-style: none;
	position: absolute;
	display: flex;
	justify-content: center;
	top: 70px;
	flex-wrap: wrap;
`

const VowelsItem = styled.li`
	margin: 0px 3px;
`

const VowelsLink = styled(Link)`
	text-decoration: none;
	color: ${({active, theme}) => active ? '#FFFF00' : theme.mainFontColor};
`

const Menu = ({active}) => {
	return (
		<VowelsMenu>
			<VowelsItem>
				<VowelsLink active={active === undefined || active === '20' ? 1 : 0} to="/alphabet/letters/vowels/20">ㅏ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '21' ? 1 : 0} to="/alphabet/letters/vowels/21">ㅐ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '22' ? 1 : 0} to="/alphabet/letters/vowels/22">ㅑ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '23' ? 1 : 0} to="/alphabet/letters/vowels/23">ㅒ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '24' ? 1 : 0} to="/alphabet/letters/vowels/24">ㅓ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '25' ? 1 : 0} to="/alphabet/letters/vowels/25">ㅔ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '26' ? 1 : 0} to="/alphabet/letters/vowels/26">ㅕ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '27' ? 1 : 0} to="/alphabet/letters/vowels/27">ㅖ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '28' ? 1 : 0} to="/alphabet/letters/vowels/28">ㅗ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '29' ? 1 : 0} to="/alphabet/letters/vowels/29">ㅘ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '30' ? 1 : 0} to="/alphabet/letters/vowels/30">ㅙ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '31' ? 1 : 0} to="/alphabet/letters/vowels/31">ㅚ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '32' ? 1 : 0} to="/alphabet/letters/vowels/32">ㅛ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '33' ? 1 : 0} to="/alphabet/letters/vowels/33">ㅜ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '34' ? 1 : 0} to="/alphabet/letters/vowels/34">ㅝ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '35' ? 1 : 0} to="/alphabet/letters/vowels/35">ㅞ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '36' ? 1 : 0} to="/alphabet/letters/vowels/36">ㅟ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '37' ? 1 : 0} to="/alphabet/letters/vowels/37">ㅠ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '38' ? 1 : 0} to="/alphabet/letters/vowels/38">ㅡ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '39' ? 1 : 0} to="/alphabet/letters/vowels/39">ㅢ</VowelsLink>
			</VowelsItem>
			<VowelsItem>
				<VowelsLink active={active === '40' ? 1 : 0} to="/alphabet/letters/vowels/40">ㅣ</VowelsLink>
			</VowelsItem>
		</VowelsMenu>
	);
};

export default Menu;