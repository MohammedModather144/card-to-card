import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin, logout } from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    useEffect(() => {
        logout()
    }, [])
    return (

        // Show the component only when the user is logged in
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;