import React, { useState } from 'react';
import Register from './Register/Register';
import Login from './Login/Login';

export default function Main() {
  const [loginActive, setLoginActiveTab] = useState(true);
  const [registerActive, setRegisterActive] = useState(false);

  return (
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
                <h1>Welcome to the largest P.V.E communications hub in the world!</h1>
                <p>
                  Please complete your registration here. All accounts are moderated and approved before they become active.
                  Please use the email address that you communicate with iDove using inorder to register
                </p>
              </div>
            </div>
            <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">

              <div className="registration-login-form">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className={`nav-link ${loginActive ? 'active' : ''}`} data-toggle="tab" href="#home" role="tab" data-test="loginLink" onClick={() => {
                      setLoginActiveTab(true)
                      setRegisterActive(false)
                    }}>
                      <svg className="olymp-login-icon"><use href="svg-icons/sprites/icons.svg#olymp-login-icon"></use></svg>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link ${registerActive ? 'active' : ''}`} data-toggle="tab" href="#profile" role="tab" data-test="registerLink" onClick={() => {
                      setLoginActiveTab(false)
                      setRegisterActive(true)
                    }}>
                      <svg className="olymp-register-icon"><use href="svg-icons/sprites/icons.svg#olymp-register-icon"></use></svg>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <Register isActive={registerActive} data-test="registerTab" />
                  <Login isActive={loginActive} data-test="loginTab" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}