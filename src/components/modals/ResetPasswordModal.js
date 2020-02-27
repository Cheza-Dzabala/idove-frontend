import React, { useState, useReducer } from 'react';
import Axios from './../../helpers/Axios';
import NotificationComponent from './../notifications/Notification';
import Loader from '../shared/Loader';

const ResetPasswordModal = () => {
  const initialState = { status: '', dataError: '' };
  const [email, setEmail] = useState({})
  const [isLoading, setLoading] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'EMAIL_REQUEST_SUCCESS':
        return {
          status: 'success'
        };
      case 'EMAIL_REQUEST_FAIL':
        return {
          status: 'error',
          dataError: action.payload
        };
      case 'EMAIL_REQUEST_CLEAR':
        return {
          status: '',
          dataError: ''
        };
      default:
        return {
          ...state
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({ [name]: value })
  }

  const requestCode = (e) => {
    dispatch({})
    e.preventDefault();
    setLoading(true);
    dispatch({ type: 'EMAIL_REQUEST_CLEAR' })
    Axios.post('/auth/password_reset/', { ...email }).then((response) => {
      dispatch({ type: 'EMAIL_REQUEST_SUCCESS' })
      setLoading(false);
    }).catch((error) => {
      const errorEntries = Object.entries(error.response.data);
      dispatch({ type: 'EMAIL_REQUEST_FAIL', payload: errorEntries[0][1] })
      setLoading(false);
    })
  }

  return (
    <div className="modal fade" id="restore-password" data-test="reset-modal" tabIndex="-1" role="dialog" aria-labelledby="restore-password" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md restore-password-popup" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <span href="#" className="close icon-close" data-dismiss="modal" aria-label="Close">
              <svg className="olymp-close-icon"><use href="svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
            </span>
          </div>
          <div className="modal-body">
            <form data-test="reset-modal-form" onSubmit={(e) => requestCode(e)}>
              <p>Please enter the email you used to register. You will receive a password reset link. Please follow that link and you should be a-okay!</p>
              <br />
              {
                state.status === 'success' ? <NotificationComponent
                  alertType="alert-success"
                  message="Successfully requested a password reset code. Please check your email"
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
              <div className="form-group label-floating">
                <label className="control-label">Your Email</label>
                <input className="form-control" placeholder="" data-test="reset-modal-email" name="email" type="email" onChange={(e) => handleChange(e)} required />
              </div>
              <button className="btn btn-purple btn-lg full-width" data-test="reset-modal-submitButton" type="submit">Send me the Code</button>
              {isLoading ? <Loader color="#7C5AC2" /> : ''}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordModal;
