import React, { useState, useReducer } from 'react';
import Axios from '../../../helpers/Axios';
import NotificationComponent from '../../notifications/Notification'
import Loader from '../../shared/Loader';

export default function ConfirmPassword(props) {
  const token = props.token;
  const initialState = { status: '', data: '', dataError: null }
  const [credentials, updateCeredentials] = useState({ });
  const [isLoading, setIsLoading] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'RESET_SUCCESS':
        return {
          status: 'success',
          data: action.payload
        };
      case 'RESET_FAIL':
        return {
          status: 'error',
          dataError: action.payload
        };

      case 'RESET_CLEAR':
        return {
          status: '',
          dataError: null,
          data: ''
        };
      default:
        return {
          ...state
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCeredentials({ ...credentials, [name]: value });
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    await setIsLoading(true)
    dispatch({ type: 'RESET_CLEAR' });
    if (credentials.password !== credentials.password_confirmation) {
      dispatch({ type: 'RESET_FAIL', payload: 'Passwords Do Not Match' })
      setIsLoading(false)
    } else {
      Axios.post(`api/auth/reset_password/confirm/${token}`, {...credentials}).then((response) => {
        dispatch({ type: 'RESET_SUCCESS', payload: response.data.message })
        setIsLoading(false)
      }).catch((error) => {
        dispatch({ type: 'RESET_FAIL', payload: error.response.data.message})
        setIsLoading(false)
      })
    }
  }

  return (
    <div role="tabpanel" data-mh="log-tab">
      <div className="landing-page">
        <div className="content-bg-wrap"></div>
        <br />
        <div className="header--standard header--standard-landing" id="header--standard"></div>
        <div className="container">
          <div className="header--standard-wrap">
            <a href="/" className="logo">
              <div className="title-block">
                <h6 className="logo-title">iDove</h6>
                <div className="sub-title">Communications Hub</div>
              </div>
            </a>
          </div>
          <div className="header-spacer--standard"></div>
          <div className="container">
            <div className="row display-flex">
              <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="landing-content">
                  <h1>Reset Your Password</h1>
                  <p>
                    Enter your new password. Don't worry, if you lose it again, we're more than happy to help yopu reset it! :)
              </p>
                </div>
              </div>
              <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="registration-login-form">
                  <form className="content" data-test="form" onSubmit={resetPassword}>
                    <div className="title h6">Reset Account Password</div>
                    <hr />
                    {
                      state.status === 'success' ? <NotificationComponent
                        alertType="alert-success"
                        message={`${state.data}`}
                        data-test="success" />
                        : ''
                    }
                    {
                      state.status === 'error' ? <NotificationComponent
                        alertType="alert-danger"
                        message={`${state.dataError}`}
                        data-test="error" />
                        : ''
                    }
                    <div className="row">
                      <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group label-floating is-empty">
                          <label className="control-label">Password</label>
                          <input className="form-control" placeholder="" name="password" data-test="password" type="password" onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className="form-group label-floating is-empty">
                          <label className="control-label">Confirm Password</label>
                          <input className="form-control" placeholder="" name="password_confirmation" data-test="password-confirm" type="password" onChange={(e) => handleChange(e)} required />
                        </div>
                        <button href="/" className="btn btn-purple btn-lg full-width" type="submit" data-test="submitButton">
                          Reset Password
                          </button>
                      </div>
                      <div className="or"></div>
                      <div>
                        <a href="/login">LOGIN INSTEAD</a>
                      </div>
                    </div>
                  </form>
                  {isLoading ?
                    <Loader color="#7C5AC2" /> : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}
