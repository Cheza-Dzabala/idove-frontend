import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/userProfileActions';
import Skeleton from '../shared/Skeleton';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Projects from './components/Projects';
import Connections from './components/Connections';
import Photos from './components/Photos';
import Videos from './components/Videos';
import Header from './Header';

class Index extends Component {
    state = {
        isLoading: true,
        profile: {},
        slug: this.props.location.pathname.split("/")[2],
    }

    static getDerivedStateFromProps = (nextProps, state) => {
        const { http_status, profile: { data } } = nextProps;
        switch (http_status) {
            case 200:
                return {
                    profile: data.data,
                    isLoading: false,
                }
            default:
                return {
                    state
                }
        }
    }

    componentDidMount = async () => {
        const { getUserProfile } = this.props;
        console.log(this.state.slug);
        await getUserProfile(this.state.slug);
    }

    render() {
        const { isLoading, profile, slug } = this.state;

        const getActive = (page) => {
            const path = this.props.location.pathname.split("/")[3];
            switch (page) {
                case page === path: {
                    return 'active'
                }
                case page !== path: {
                    return ''
                }
                default: {
                    return 'active'
                }
            }
        }

        return isLoading ? <Skeleton /> : (
            <div>
                <Header profile={profile} getActive={getActive} slug={this.state.slug} />
                <div className="row">
                    <Switch>
                        <Route exact path={`/profiles/${slug}/projects`} component={Projects} profile={profile} />
                        <Route exact path={`/profiles/${slug}/connections`} component={Connections} />
                        <Route exact path={`/profiles/${slug}/photos`} component={Photos} />
                        <Route exact path={`/profiles/${slug}/videos`} component={Videos} />
                        <Route path="*" component={(props) => <About profile={profile} {...props} />} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.userProfile,
    http_status: state.userProfile.http_status
});

export default connect(mapStateToProps, { getUserProfile })(Index);
