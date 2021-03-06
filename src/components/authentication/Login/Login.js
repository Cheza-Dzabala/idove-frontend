import React, { useState, useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import NotificationComponent from '../../notifications/Notification';
import ResetPasswordModal from '../../modals/ResetPasswordModal';
import { validateEmail } from '../../../helpers/regexTests';
import Loader from '../../shared/Loader';
import Axios from '../../../helpers/Axios';
import { saveToken, saveUserData, saveUserProfile } from '../../../helpers/AuthHelpers';

const Login = (props) => {
  let credentials = {};
  const [loginData, setLoginData] = useState({ password: '', email: '' });
  const [isLoading, setLoading] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false)
  const initialState = { status: '', data: '', dataError: null }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS': {
        return {
          status: 'success',
          data: action.payload
        };
      }
      case 'LOGIN_ERROR': {
        return {
          status: 'error',
          dataError: action.payload
        }
      }
      default: {
        return {
          status: '',
          data: '',
          dataError: null
        }
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    if (state.status === 'error') {
      setShowLoginError(true)
      setLoading(false)
    }
    if (state.status === '') {
      setShowLoginError(false);
      setLoading(false)
    }
  }, [state.status])

  const attemptLogin = (e) => {
    e.preventDefault();
    dispatch({})
    setLoading(true);
    if (validateEmail(loginData.email)) {
      credentials = {
        email: loginData.email,
        password: loginData.password
      }
    } else {
      credentials = {
        username: loginData.email,
        password: loginData.password
      }
    }
    Axios.post('/api/login/', { ...credentials })
      .then((response) => {
        const { data } = response;
        saveToken(data.access_token);
        saveUserData(data.user_data);
        if (data.user_profile.length > 0) {
          saveUserProfile(data.user_profile);
        }
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      })
      .catch((error) => {
        // console.log(data);

        console.log(error.response);
        dispatch({ type: 'LOGIN_ERROR', payload: 'Can not log in' })
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value })
  }

  return (
    (state.status === 'success') ? <Redirect to="/" data-test="redirect" /> :
      <>
        <div className={`tab-pane ${props.isActive ? 'active' : ''}`} id="profile" role="tabpanel" data-mh="log-tab" data-test="login-page">
          <div className="title h6">Login to your Account</div>
          <form data-test="form" className="content" onSubmit={(e) => attemptLogin(e)}>
            {showLoginError ? <NotificationComponent alertType="alert-danger" message={state.dataError} /> : ''}
            <div className="row">
              <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group label-floating is-empty">
                  <label className="control-label">Email</label>
                  <input className="form-control" placeholder="" data-test="email" id="email" name="email" type="email" onChange={(e) => handleChange(e)} required />
                </div>
                <div className="form-group label-floating is-empty">
                  <label className="control-label">Your Password</label>
                  <input className="form-control" placeholder="" data-test="password" name="password" type="password" onChange={(e) => handleChange(e)} required />
                </div>
                <div className="remember">
                  <div className="checkbox">
                    <label className="blue">
                      <input name="remember_me" type="checkbox" onChange={(e) => handleChange(e)} />
                      Remember Me
                </label>
                  </div>
                  <span className="forgot" data-toggle="modal" data-test="forgotPassword" data-target="#restore-password" style={{ cursor: 'pointer' }}>Forgot my Password</span>
                </div>

                <br />
                <button className="btn btn-lg btn-primary full-width" data-test="submitButton" type="submit">
                  Login
                </button>
                {isLoading ?
                  <Loader /> : ''}
              </div>
            </div>
          </form>
        </div>
        <ResetPasswordModal />
      </>
  )
}

export default Login