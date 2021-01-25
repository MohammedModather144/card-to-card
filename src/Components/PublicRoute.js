import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // Must User Login Redirect To home-vendor
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/success" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;