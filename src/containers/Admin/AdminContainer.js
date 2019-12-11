import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearAdmin } from '../../actions/adminAction';

import Dashboard from '../../components/Admin/Dashboard';
import Settings from '../../components/Admin/Settings';
import Users from '../../components/Admin/Users';
import User from '../../components/Admin/User';
import Word from '../../components/Admin/Word';
import Conjugation from '../../components/Admin/Conjugation';

const AdminContainer = ({location, clearAdmin}) => {
    useEffect(() => {
        return (() => {
            clearAdmin();
        })
    }, [clearAdmin]);

    const page = location.pathname.split('/')[2];
    switch(page) {
        case 'settings':
            return <Settings />
        case 'users':
            return <Users />
        case 'user':
            return <User />
        case 'word':
            return <Word />
        case 'conjugation':
            return <Conjugation />
        default: return <Dashboard />
    }
};

export default connect(null, { clearAdmin })(withRouter(AdminContainer));