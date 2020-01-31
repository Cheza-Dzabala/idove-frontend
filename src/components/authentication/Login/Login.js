import React, { useState, useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import NotificationComponent from '../../notifications/Notification';
import ResetPasswordModal from '../../modals/ResetPasswordModal';
import { validateEmail } from '../../../helpers/regexTests';
import Loader from '../../shared/Loader';
import Axios from '../../../helpers/Axios';
import { saveToken } from '../../../helpers/AuthHelpers';

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
        return { ...state }
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    if (state.status === 'error') {
      setShowLoginError(true)
      setLoading(false)
    } else {
      setShowLoginError(false)
    }
  }, [state.status])

  const attemptLogin = (e) => {
    dispatch({})
    e.preventDefault();
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
    Axios.post('/auth/login/', { ...credentials })
      .then((response) => {
        const { data } = response;
        saveToken(data.token)
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.detail })
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
                  <label className="control-label">Username or Email</label>
                  <input className="form-control" placeholder="" data-test="email" id="email" name="email" type="text" onChange={(e) => handleChange(e)} required />
                </div>
                <div className="form-group label-floating is-empty">
                  <label className="control-label">Your Password</label>
                  <input className="form-control" placeholder="" data-test="password" name="password" type="password" onChange={(e) => handleChange(e)} required />
                </div>
                <div className="remember">
                  <div className="checkbox">
                    <label className="blue">
                      <input name="optionsCheckboxes" type="checkbox" />
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