import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { checkAdminStatus } from '../actions/adminAction';

export default function withAdminAuth(ComponentToCheck) {
    class AuthAdminHoc extends Component {
        componentDidMount() {
            this.props.checkAdminStatus(this.props.firestore);
        }

        componentWillUnmount() {
            this.props.checkAdminStatus(this.props.firestore, true);
        }

        render() {
            const { adminStatus } = this.props;
            if (adminStatus !== null) {
                if (adminStatus) {
                    return <ComponentToCheck {...this.props}/>
                } else {
                    return <Redirect to="/"/>
                }
            } else {
                return null;
            }
        }
    }

    const mapStateToProps = state => {
        return {
            adminStatus: state.adminReducer.adminStatus
        }
    }

    return connect(mapStateToProps, { checkAdminStatus })(withFirestore(AuthAdminHoc))
}