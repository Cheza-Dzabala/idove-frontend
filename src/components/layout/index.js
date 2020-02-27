import React from 'react';
import Search from './layoutComponents/NavbarItems/Search'
import Requests from './layoutComponents/NavbarItems/Requests'
import Messages from './layoutComponents/NavbarItems/Messages'
import Notifications from './layoutComponents/NavbarItems/Notifications'
import Account from './layoutComponents/NavbarItems/Account'
import Menu from './layoutComponents/Menu'
import ChatBar from './layoutComponents/ChatBar'
import PageHeader from './../shared/PageHeader'
import PageSpacer from '../shared/PageSpacer';



export default function Index(props) {
  const { children } = props;
  const { props: { hasBackground, backgroundType, title, description } } = children;
  return (
    <div>
      <Menu />
      <ChatBar />
      <header className="header" id="site-header" style={{ backgroundColor: '#135160' }} data-test="header">
        <div className="page-title">
          <h6>Home</h6>
        </div>
        <div className="header-content-wrapper">
          <Search />
          <div className="control-block">
            <Requests />
            <Messages />
            <Notifications />
            <Account />
          </div>
        </div>
      </header>
      {hasBackground ?
        <PageHeader backgroundType={backgroundType} title={title} description={description} /> :
        <PageSpacer />}
      <div className="container">
        <div className="row">
          {children}
        </div>
      </div>
      <a className="back-to-top" href="/">
        <img src="svg-icons/back-to-top.svg" alt="arrow" className="back-icon" />
      </a>
    </div>
  )
}

