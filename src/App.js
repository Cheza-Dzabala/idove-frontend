import React, { Component } from 'react';
import Authentication from './components/authentication/Main'
import VerifyAccount from './components/authentication/VerifyAccount/VerifyAccount'
import ResetPassword from './components/authentication/ResetPassword/ResetPassword'
import PageNotFound from './components/pageNotFound/PageNotFound'
import Layout from './components/layout';
import Profile from './components/Profile/Profile';
import Home from './components/home';
import Protected from './components/Protected';
import PagePropStrings from './helpers/strings/PagePropStrings'
import url from 'url';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" children={<Authentication />} />
          <Route path="/register" children={<Authentication />} />
          <Route path="/verify-account" children={<VerifyAccount />} />
          <Route path="/reset-password/" children={(e) => {
            const uri = url.parse(e.location.search, true)
            const token = uri.query.token;
            return <ResetPassword token={token} />
          }} />
          <Route exact path="/logout" component={() => {
            localStorage.clear();
            window.location.replace('/login')
          }} />
          <Layout exact path="/" >
            <Protected
              hasBackground={false}
              component={Home} />
          </Layout>
          }} />
          <Layout exact path="/profile">
            <Protected
              title={PagePropStrings.profile.title}
              description={PagePropStrings.profile.description}
              backgroundColor={PagePropStrings.profile.backgroundColor}
              hasBackground={true}
              component={Profile} />
          </Layout>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router >
    )
  }
}

export default withRouter(App)