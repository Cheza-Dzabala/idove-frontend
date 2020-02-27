import React from 'react'
import ActiveChats from './ActiveChats'

export default function CollapsedChat(props) {
  return (
    <div className="fixed-sidebar-right sidebar--small" id="sidebar-right">
      <div className="mCustomScrollbar" data-mcs-theme="dark">
        <ul className="chat-users">
          <ActiveChats />
        </ul>
      </div>

      <div className="search-friend inline-items">
        <a href="/" className="js-sidebar-open" data-test="openChat" onClick={(e) => props.modifySideBarStatus(e)}>
          <svg className="olymp-menu-icon"><use href="svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
        </a>
      </div>
      <span className="olympus-chat inline-items js-chat-open">
        <svg className="olymp-chat---messages-icon"><use href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
      </span>
    </div>
  )
}
