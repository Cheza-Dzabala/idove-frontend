import React from 'react'
import ActiveChats from './ActiveChats'

export default function ExpandedChat(props) {
  return (
    <div className="fixed-sidebar-right sidebar--large" id="sidebar-right-1">
      <div className="mCustomScrollbar" data-mcs-theme="dark">
        <div className="ui-block-title ui-block-title-small">
          <a href="/" className="title">Sponsors & Support</a>
          <a href="/">Settings</a>
        </div>
        <ul className="chat-users">
          <ActiveChats />
        </ul >
        <div className="ui-block-title ui-block-title-small">
          <a href="/" className="title">Organizations</a>
          <a href="/">Settings</a>
        </div>
        <ul className="chat-users">
        </ul >
        <div className="ui-block-title ui-block-title-small">
          <a href="/" className="title">Project Partners</a>
          <a href="/">Settings</a>
        </div>
        <ul className="chat-users">
        </ul >
        <div className="ui-block-title ui-block-title-small">
          <a href="/" className="title">UNCATEGORIZED</a>
          <a href="/">Settings</a>
        </div>
        <ul className="chat-users">
        </ul >
      </div >
      <div className="search-friend inline-items">
        <form className="form-group" >
          <input className="form-control" placeholder="Search Friends..." defaultValue="" type="text" />
        </form>
        <a href="/" className="js-sidebar-open" data-test="closeChat" onClick={(e) => props.modifySideBarStatus(e)}>
          <svg className="olymp-close-icon"><use href="svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
        </a>
      </div >
      <span className="olympus-chat inline-items">
        <h6 className="olympus-chat-title">iDove CHAT</h6>
      </span>
    </div >
  )
}
