import React from 'react'

export default function ActiveChats() {
  return (
    <li className="inline-items js-chat-open">
      <div className="author-thumb">
        <img alt="author" src="img/avatar72-sm.jpg" className="avatar" />
        <span className="icon-status away"></span>
      </div>
      <div className="author-status">
        <a href="/" className="h6 author-name">Chris Greyson</a>
        <span className="status">AWAY</span>
      </div>
      <div className="more"><svg className="olymp-three-dots-icon"><use href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
        <ul className="more-icons">
          <li>
            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" className="olymp-comments-post-icon"><use href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
          </li>

          <li>
            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" className="olymp-add-to-conversation-icon"><use href="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
          </li>

          <li>
            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" className="olymp-block-from-chat-icon"><use href="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
          </li >
        </ul >

      </div >
    </li >
  )
}
