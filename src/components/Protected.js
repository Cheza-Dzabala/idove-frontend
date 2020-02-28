import React, {Suspense} from 'react';
import {Route} from 'react-router-dom';
import {isUserAuthenticated} from '../helpers/AuthHelpers';
import Layout from "./layout";
import {ErrorBoundary} from './../bounderies/ErrorBoundaries'
import {ProtectedRoutesFallback} from "./fallbacks";

export default function Protected({component: Component, ...props}) {
    return (
        (isUserAuthenticated()) ? <Route {...props} render={
            (props) => {
                return <ErrorBoundary>
                    <Suspense fallback={<ProtectedRoutesFallback />}>
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    </Suspense>
                </ErrorBoundary>
            }
        }/> :
    window.location.replace('/login')
)
}
