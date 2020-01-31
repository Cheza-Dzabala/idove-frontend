import React, { useState, useEffect, useReducer } from 'react';
import NotificationComponent from '../../notifications/Notification';
import Loader from '../../shared/Loader';
import Axios from '../../../helpers/Axios';

const Register = (props) => {

  const initialState = { status: '', data: '', dataError: null }

  const [registrationData, setRegistrationData] = useState({ email: '', username: '', password: '', password2: '', first_name: '', last_name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const reducer = (state, action) => {
    switch (action.type) {
      case 'REGISTRATION_SUCCESS':
        return {
          status: 'success',
          data: action.payload
        };
      case 'REGISTRATION_ERROR':
        return {
          status: 'error',
          dataError: action.payload
        };
      default:
        return {
          ...state
        }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.status === 'error') {
      setShowError(true)
      setIsLoading(false)
    }
    if (state.status === 'success') {
      setShowSuccess(true)
    }
  }, [state.status])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value })
  }

  const attemptRegistration = (e) => {
    dispatch({})
    e.preventDefault();
    setIsLoading(true);
    Axios.post('/auth/register/', { ...registrationData })
      .then((response) => {
        const { data } = response;
        dispatch({ type: 'REGISTRATION_SUCCESS', payload: data });
      })
      .catch((error) => {
        const errorEntries = Object.entries(error.response.data);
        dispatch({ type: 'REGISTRATION_ERROR', payload: errorEntries[0][1] });
      });
  }

  return (
    <div className="tab-content">
      <div className={`tab-pane ${props.isActive ? 'active' : ''}`} id=" " role="tabpanel" data-mh="log-tab">
        <div className="title h6">Register to the iDove Communications Hub</div>
        <form className="content" onSubmit={(e) => attemptRegistration(e)} data-test="form">
          {showError ? <NotificationComponent alertType="alert-danger" message={state.dataError} data-test="error" /> : ''}
          {showSuccess ? <NotificationComponent alertType="alert-success" message={state.data} data-test="success" /> : ''}
          <div className="row">
            <div className="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="form-group label-floating is-empty">
                <label className="control-label">First Name</label>
                <input className="form-control" name="first_name" data-test="first_name" placeholder="" type="text" onChange={(e) => handleChange(e)} required />
              </div>
            </div>
            <div className="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="form-group label-floating is-empty">
                <label className="control-label">Last Name</label>
                <input className="form-control" name="last_name" data-test="last_name" placeholder="" type="text" onChange={(e) => handleChange(e)} required />
              </div>
            </div>
            <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="form-group label-floating is-empty">
                <label className="control-label">Your Email</label>
                <input className="form-control" placeholder="" name="email" data-test="email" type="email" onChange={(e) => handleChange(e)} required />
              </div>
              <div className="form-group label-floating is-empty">
                <label className="control-label">Username</label>
                <input className="form-control" placeholder="" name="username" data-test="username" type="text" onChange={(e) => handleChange(e)} required />
              </div>
              <div className="form-group label-floating is-empty">
                <label className="control-label">Password</label>
                <input className="form-control" placeholder="" name="password" data-test="password" type="password" onChange={(e) => handleChange(e)} required />
              </div>

              <div className="form-group label-floating is-empty">
                <label className="control-label">Confirm Password</label>
                <input className="form-control" placeholder="" name="password2" data-test="password2" type="password" onChange={(e) => handleChange(e)} required />
              </div>

              <div className="remember">
                <div className="checkbox">
                  <label>
                    <input name="optionsCheckboxes" type="checkbox" />
                    I accept the <a href="/">Terms and Conditions</a> of the website
                </label>
                </div>
              </div>
              <button href="/" className="btn btn-purple btn-lg full-width" type="submit" data-test="submitButton">
                Complete Registration
              </button>
              {isLoading ? <Loader color="#7C5AC2" /> : ''}
            </div>
          </div>
        </form>
      </div>

    </div>

  )
}

export default Register;