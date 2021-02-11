import React, { Suspense, useContext } from "react";
import { Route } from "react-router-dom";
import { isUserAuthenticated } from "../helpers/AuthHelpers";
import Layout from "./layout";
import { ErrorBoundary } from "./../bounderies/ErrorBoundaries";
import { ProtectedRoutesFallback } from "./fallbacks";
import { ParseContext } from "../contexts/RealtimeContext";

export default function Protected({ component: Component, ...props }) {
  const Parse = useContext(ParseContext);
  const currentUser = Parse.User.current();

  return currentUser ? (
    <Route
      {...props}
      render={(props) => {
        return (
          <ErrorBoundary>
            <Suspense fallback={<ProtectedRoutesFallback />}>
              <Layout>
                <Component {...props} />
              </Layout>
            </Suspense>
          </ErrorBoundary>
        );
      }}
    />
  ) : (
    window.location.replace("/login")
  );
}
