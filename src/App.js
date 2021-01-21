import React, { Component } from "react";
import Authentication from "./components/authentication/Main";
import VerifyAccount from "./components/authentication/VerifyAccount/VerifyAccount";
import ResetPassword from "./components/authentication/ResetPassword/ResetPassword";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import Home from "./components/home";
import Users from "./components/users";
import Protected from "./components/Protected";
import PagePropStrings from "./helpers/strings/PagePropStrings";
import Messages from "./components/layout/layoutComponents/NavbarItems/messages_components/index";
import Groups from "./components/groups";
import Newsfeed from "./components/newsfeed";
import Forums from "./components/forums";
import Projects from "./components/project";

import url from "url";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" children={<Authentication />} />
          <Route path="/register" children={<Authentication />} />
          <Route
            path="/verify-account"
            children={(e) => {
              const uri = url.parse(e.location.search, true);
              const token = uri.query.token;
              return <VerifyAccount token={token} />;
            }}
          />
          <Route
            path="/reset-password/"
            children={(e) => {
              const uri = url.parse(e.location.search, true);
              const token = uri.query.token;
              return <ResetPassword token={token} />;
            }}
          />
          <Route
            exact
            path="/logout"
            component={() => {
              localStorage.clear();
              window.location.replace("/login");
            }}
          />
          <Route exact path="/">
          <Protected hasBackground={false} component={Home}/>
          </Route>

         <Route exact path="/newsfeed">
           <Protected
               title={PagePropStrings.newsfeed.title}
               description={PagePropStrings.newsfeed.description}
               backgroundColor={PagePropStrings.newsfeed.backgroundColor}
               hasBackground={true}
               component={Newsfeed}
           />
         </Route>
          <Route path="/profiles/:slug">
            <Protected
              hasBackground={false}
              component={(props) => <Profile {...props} />}
            />
          </Route>
          <Route path="/dashboard">
            <Protected
              title={PagePropStrings.dashboard.title}
              description={PagePropStrings.dashboard.description}
              backgroundColor={PagePropStrings.dashboard.backgroundColor}
              hasBackground={true}
              component={Dashboard}
            />
          </Route>
          <Route path="/users">
            <Protected
              title={PagePropStrings.users.title}
              description={PagePropStrings.users.description}
              backgroundColor={PagePropStrings.users.backgroundColor}
              hasBackground={true}
              component={Users}
            />
          </Route>
          <Route path="/messages">
            <Protected
              title={PagePropStrings.messages.title}
              description={PagePropStrings.messages.description}
              backgroundColor={PagePropStrings.messages.backgroundColor}
              hasBackground={true}
              component={Messages}
            />
          </Route>
          <Route path="/groups">
            <Protected
              title={PagePropStrings.groups.title}
              description={PagePropStrings.groups.description}
              backgroundColor={PagePropStrings.groups.backgroundColor}
              hasBackground={true}
              component={Groups}
            />
          </Route>
          <Route path="/forums">
            <Protected
              title={PagePropStrings.forums.title}
              description={PagePropStrings.forums.description}
              backgroundColor={PagePropStrings.forums.backgroundColor}
              hasBackground={true}
              component={Forums}
            />
          </Route>
          <Route path="/projects">
            <Protected
              title={PagePropStrings.projects.title}
              description={PagePropStrings.projects.description}
              backgroundColor={PagePropStrings.projects.backgroundColor}
              hasBackground={true}
              component={Projects}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
