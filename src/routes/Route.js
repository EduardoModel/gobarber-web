import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  // Verify inside the auth state if the user is signed
  const { signed } = store.getState().auth;

  // If the user is trying to access a private route and isn't autehticated,
  // redirect him to the login page
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  // If the user is authenticated and is trying to access a public route,
  // redirect him to the dashboard
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  // Using the information if the user is authenticated
  // Change dinamically the background layout
  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
