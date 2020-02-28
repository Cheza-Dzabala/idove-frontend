import React from 'react'
import ActiveChats from './ActiveChats'

export default function CollapsedChat() {
  return (
    <div className="fixed-sidebar-right sidebar--small" id="sidebar-right">
      <div className="mCustomScrollbar" data-mcs-theme="dark">
        <ul className="chat-users" style={{'overflow': 'scroll'}}>
          <ActiveChats />
        </ul>
      </div>
    </div>
  )
}
