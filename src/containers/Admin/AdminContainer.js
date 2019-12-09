import React from 'react';
import { withRouter } from 'react-router-dom';

import Dashboard from '../../components/Admin/Dashboard';
import Settings from '../../components/Admin/Settings';
import Users from '../../components/Admin/Users';
import User from '../../components/Admin/User';
import Word from '../../components/Admin/Word';

const AdminContainer = ({location}) => {
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
        default: return <Dashboard />
    }
};

export default withRouter(AdminContainer);