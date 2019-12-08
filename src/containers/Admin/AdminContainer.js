import React from 'react';
import { withRouter } from 'react-router-dom';

import Dashboard from '../../components/Admin/Dashboard';
import Settings from '../../components/Admin/Settings';

const AdminContainer = ({location}) => {
    const page = location.pathname.split('/')[2];
    switch(page) {
        case 'settings':
            return <Settings />
        default: return <Dashboard />
    }
};

export default withRouter(AdminContainer);