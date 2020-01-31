import React, { useState, useEffect, useReducer } from 'react'
import { Redirect } from 'react-router-dom';
import NotificationComponent from '../../notifications/Notification';
import Loader from 'react-spinners/RingLoader';
import Axios from '../../../helpers/Axios';
import { saveToken } from '../../../helpers/AuthHelpers';

const VerifyAccount = () => {

  const initialState = { status: '', data: '', dataError: '' }
  const [showError, setShowError] = useState(false)
  const [verification, updateVerification] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'VERIFICATION_SUCCESS':
        return {
          status: 'success',
          data: action.payload
        }
      case 'VERIFICATION_ERROR':
        return {
          status: 'error',
          dataError: action.payload
        }
      default:
        return { ...state }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.status === 'error') {
      setIsLoading(false)
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [state.status])

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateVerification({
      ...verification,
      [name]: value
    })
  }
  const verifyCode = (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch({})
    Axios.post('/auth/verify/', { ...verification }).then((response) => {
      const { data } = response;
      saveToken(data.token)
      dispatch({ type: 'VERIFICATION_SUCCESS', payload: data })
    }).catch((error) => {
      dispatch({ type: 'VERIFICATION_ERROR', payload: error.response.data.detail })
    })
    setIsLoading(false)
  }

  return (
    state.status === 'success' ? <Redirect to="/" /> :
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
                    <h1>Verify Your Acccount</h1>
                    <p>
                      Kindly enter the passcode you received in your email, along with the email address you registered with.
                </p>
                  </div>
                </div>
                <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="registration-login-form">
                    <form className="content" onSubmit={(e) => verifyCode(e)} data-test="form">
                      {showError ? <NotificationComponent alertType="alert-danger" message={state.dataError} data-test="error" /> : ''}
                      <div className="title h6">Verify Your Account</div>
                      <hr />
                      <div className="row">
                        <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group label-floating is-empty">
                            <label className="control-label">Your email</label>
                            <input className="form-control" placeholder="" name="email" data-test="email" type="email" onChange={(e) => handleChange(e)} required />
                          </div>
                          <div className="form-group label-floating is-empty">
                            <label className="control-label">Passcode</label>
                            <input className="form-control" placeholder="" name="passcode" data-test="passcode" type="number" maxLength="4" minLength="4" onChange={(e) => handleChange(e)} required />
                          </div>
                          <button href="/" className="btn btn-purple btn-lg full-width" type="submit" data-test="submitButton">
                            Verify Account
                      </button>

                        </div>
                      </div>
                    </form>
                    {isLoading ?
                      <Loader color="#7C5AC2" /> : ''}
                    <div className="or"></div>
                    <div>
                      <a href="/login">LOGIN INSTEAD</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>

  )
}
export default VerifyAccount;