import React, { useContext } from 'react'
import { RealtimeContext } from '../../../../../contexts/RealtimeContext';

export default function ActiveChats() {
  const { chatVisibility, setChatVisibility, setChatMember, onlineUsers } = useContext(RealtimeContext);


  const setChat = (e, member) => {
    e.preventDefault()
    setChatMember(member)
    if (!chatVisibility) {
      setChatVisibility(true)
    }
  }


  return (
    onlineUsers.map(member => (
      <li className="inline-items js-chat-open" onClick={e => setChat(e, member)} key={member.id}>
        <div className="author-thumb">
          <img alt="author" src={member.avatar ? member.avatar : 'img/avatar62-sm.jp'} className="avatar" style={{ width: '50px', height: '50px' }} />
          <span className="icon-status away"></span>
        </div>
        <div className="author-status">
          <a href="/" className="h6 author-name">{member.name}</a>
          <span className="status">ONLINE</span>
        </div>
        <div className="more"><svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
          <ul className="more-icons">
            <li>
              <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" className="olymp-comments-post-icon"><use href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
            </li>

            <li>
              <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" className="olymp-add-to-conversation-icon"><use href="/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
            </li>

            <li>
              <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" className="olymp-block-from-chat-icon"><use href="/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
            </li >
          </ul >
        </div >
      </li >
    ))
  )
}
