import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import { encryptStorage } from './encryptStorage';

const PrivateRoute = ({ children, ...rest }) => {
  const authentificate = localStorage.getItem('token');
  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          authentificate ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />
    </>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.any
};
export default PrivateRoute;
