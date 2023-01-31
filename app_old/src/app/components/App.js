import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router-dom'

import Layout from './layout'

const App = ({ children, rest }) => {
  const isAuth = localStorage.getItem('token')
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (
          (isAuth && routeProps.location.pathname === '/login') ||
          (isAuth && routeProps.location.pathname === '/register')
        ) {
          return <Redirect to='/dashboard' />
        } else if (isAuth) {
          return <Layout>{children}</Layout>
        } else if (
          (isAuth == null && routeProps.location.pathname === '/login') ||
          (isAuth == null && routeProps.location.pathname === '/register')
        ) {
          return children
        } else {
          return <Redirect to='/login' />
        }
      }}
    />
  )
}

App.propTypes = {
  children: PropTypes.any,
  rest: PropTypes.any
}

export default App
