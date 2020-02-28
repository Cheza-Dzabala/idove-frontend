import React, { Component } from 'react';
import CountryList from 'react-select-country-list';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { getProfile, saveProfile, updateProfile } from '../../../actions/profileActions';
import { evaluate_response } from '../../../utilities/profile/statusCodeEval';
import { objectMapper } from '../../../utilities/profile/resolver';
import { uploadAttachment } from '../../../utilities/trix/attachmentListeners';
import Skeleton from '../../shared/Skeleton';
import { userProfile } from '../../../helpers/AuthHelpers';
import Form from './profileComponents/Form';



class Profile extends Component {
  state = {
    profileData: {},
    isLoading: false,
    tabHeader: 'Profile',
    operation: '',
    initialLoad: false,
    notify: false,
    notificationSeverity: '',
    notificationMessage: ''
  };

  static getDerivedStateFromProps = (nextProps, state) => {
    const { http_status, profile: { data } } = nextProps;
    return evaluate_response(http_status, data, state);
  }

  componentDidMount = async () => {
    const { getProfile } = this.props;
    await getProfile();
    document.addEventListener('trix-attachment-add', uploadAttachment)
  }

  render() {

    const { profileData } = this.state;

    const handleChange = async (e) => {
      const { name, value } = e.target;
      this.setState(prevState => ({
        profileData: {
          ...prevState.profileData,
          [name]: value
        }
      }));
    }

    const uploadImage = (e) => {
      const { name, files } = e.target;
      this.setState(prevState => ({
        profileData: {
          ...prevState.profileData,
          [name]: files[0]
        }
      }));
    }

    const cancelSubmit = (e) => {
      e.preventDefault();
      console.log('canceling')
    }

    const createProfile = async (e) => {
      e.preventDefault();
      this.setState({ isLoading: true });
      const { saveProfile } = this.props;
      const formData = objectMapper(this.state.profileData);
      await saveProfile(formData);
    }

    const updateProfile = async (e) => {
      e.preventDefault();
      const { updateProfile } = this.props;
      this.setState({ isLoading: true });
      console.log(this.state.profileData);
      const formData = objectMapper(this.state.profileData);
      const { slug } = profileData;
      await updateProfile(formData, slug);
    }


    const Alert = (props) => {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        this.setState({
          notify: false
        })
      }
      this.setState({
        notify: false
      })
    };


    return (
      <div>
        <Snackbar open={this.state.notify} autoHideDuration={2000} onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Alert onClose={handleClose} severity={this.state.notificationSeverity}>
            {this.state.notificationMessage}
          </Alert>
        </Snackbar>
        <div className="ui-block-title">
          <h6 className="title">{this.state.tabHeader} | {this.state.operation === 'update' ? <a href={`/profiles/${userProfile().slug}`}>View My Profile</a> : ''}</h6>
        </div>
        <div className="ui-block-content">
          {
            this.state.isLoading ? (
              <Skeleton />
            ) : (
                <Form
                  operation={this.state.operation}
                  profileData={profileData}
                  countries={CountryList().getData()}
                  handleChange={handleChange}
                  updateProfile={updateProfile}
                  createProfile={createProfile}
                  cancelSubmit={cancelSubmit}
                  uploadImage={uploadImage}
                />
              )
          }
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  http_status: state.profile.http_status
});

export default connect(mapStateToProps, { getProfile, saveProfile, updateProfile })(Profile);