import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
	display: flex;
	flex-direction: column;
`

const Text = styled.p`
	font-family: ${props => props.theme.mainFont};
	color: ${props => props.theme.mainFontColor};
	font-size: 24px;
	margin-left: 4px;
	margin-bottom: 5px;
`


const StyledInput = styled.input`
	width: 250px;
	height: 50px;
	background-color: ${props => props.theme.mainInputBackgroundColor};
	border: 1px solid ${props => props.theme.mainInputBorderColor};
	padding: 0px 5px;
	color: ${props => props.theme.mainInputColor};
	box-sizing: content-box;
	font-size: 20px;

	&::placeholder {
		color: ${props => props.theme.mainInputColor};
	}
`

const Input = ({label, placeholder, type, className, onChange, name}) => {
	return (
		<Label className={className}>
			<Text>{label}</Text>
			<StyledInput onChange={(e) => onChange(e.target.value)} name={name} placeholder={placeholder} type={type}/>
		</Label>
	);
};

Input.propTypes = {
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string,
	name: PropTypes.string
}

export default Input;