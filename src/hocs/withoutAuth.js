import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function withoutAuth(ComponentToCheck) {
	class AutHoc extends Component {
		render() {
			const { auth } = this.props;
			if (!auth.uid) {
				return <ComponentToCheck {...this.props}/>
			} else {
				return <Redirect to="/"/>
			}
		}
	}

	const mapStateToProps = state => {
		return {
			auth: state.firebase.auth
		}
	}

	return connect(mapStateToProps, null)(AutHoc);
}