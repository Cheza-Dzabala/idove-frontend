import React from 'react';
import { Route } from 'react-router-dom';
import { isUserAuthenticated } from '../helpers/AuthHelpers';

export default function Protected({ component: Component, ...props }) {
  return (
    (isUserAuthenticated()) ? <Route {...props} render={
      (props) => {
        return <Component {...props} />
      }
    } /> : window.location.replace('/login')
  )
}
