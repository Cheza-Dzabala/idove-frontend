import React, { useState, useEffect, useReducer } from 'react'
import NotificationComponent from '../../notifications/Notification';
import Loader from 'react-spinners/RingLoader';
import Axios from '../../../helpers/Axios';

const VerifyAccount = (props) => {

  const initialState = { status: '', data: '', dataError: '' }
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
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
        return {
          status: '',
          data: '',
          dataError: ''
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.status === 'error') {
      setIsLoading(false)
      setShowError(true)
    }
    if (state.status === 'success') {
      setShowSuccess(true)
      setIsLoading(false)
    }
    if (state.status === '') {
      setShowSuccess(false);
      setShowError(false);
      setIsLoading(false)
    }
  }, [state.status])

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateVerification({
      ...verification,
      [name]: value
    })
  }
  const verifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch({});
    Axios.post('/api/activate', { ...verification, token: props.token }).then((response) => {
      const { data } = response;
      dispatch({ type: 'VERIFICATION_SUCCESS', payload: data })
    }).catch(({ response }) => {
      console.log(response.data);
      dispatch({ type: 'VERIFICATION_ERROR', payload: response.data })
    })
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
                  <h1>Verify Your Acccount</h1>
                  <p>
                    Kindly enter the passcode you received in your email, along with the email address you registered with.
                </p>
                </div>
              </div>
              <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="registration-login-form">
                  <div className="title h6">Account Verification</div>
                  <form className="content" onSubmit={(e) => verifyCode(e)} data-test="form">
                    {showError ? <NotificationComponent alertType="alert-danger" message={state.dataError.message} data-test="error" /> : ''}
                    {showSuccess ? <NotificationComponent alertType="alert-success" message={state.data.message} data-test="error" /> : ''}
                    <div className="row">
                      <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group label-floating is-empty">
                          <label className="control-label">Your email</label>
                          <input className="form-control" placeholder="" name="email" data-test="email" type="email" onChange={(e) => handleChange(e)} required />
                        </div>
                        <button href="/" className="btn btn-purple btn-lg full-width" type="submit" data-test="submitButton">
                          Verify Account
                          </button>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          {isLoading ?
                            <Loader color="#7C5AC2" size={25} /> : ''}
                        </div>
                      </div>
                    </div>
                  </form>

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