import React, {Component, useContext, useState} from 'react'
import {Link} from 'react-router-dom';
import moment from 'moment';
import {ChatContext} from "../../../../contexts/chats.context";
import {RealtimeContext} from "../../../../contexts/RealtimeContext";

export const Messages = () => {
    const {setChatWindows, chatWindows} = useContext(ChatContext);
    const {chats} = useContext(RealtimeContext);
    const messageCount = chats.filter(chat => chat.is_read === false).length;

    const RenderChatBox = (chat, index) => {
        setChatWindows(prev => [...prev, chat]);
    }

    return (
        <div className="control-icon more has-items">
            <svg className="olymp-chat---messages-icon">
                <use href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
            </svg>
            <div className="label-avatar bg-purple">{messageCount}</div>

            <div className="more-dropdown more-with-triangle triangle-top-center">
                <div className="ui-block-title ui-block-title-small">
                    <h6 className="title">Chat / Messages</h6>
                    <a href="/">Mark all as read</a>
                </div>

                <div className="mCustomScrollbar" data-mcs-theme="dark">
                    {(messageCount === 0) ? <div className="ui-block-content"><h6>No new messages</h6></div> :
                        <ul className="notification-list chat-message">
                            {
                                chats.map((chat, index) => {
                                    return (
                                        <li key={index} className="message-unread" onClick={(e) => RenderChatBox(chat, index)}>
                                            <div className="author-thumb">
                                                <img src={chat.sender_avatar} alt="author"/>
                                            </div>
                                            <div className="notification-event">
                                                <span className="h6 notification-friend">{chat.sender_name}</span>
                                                <span className="chat-message-item">{chat.message}</span>
                                                <span className="notification-date">
                                                    <time className="entry-date updated" dateTime="2004-07-24T18:18">{moment(chat.created_at.toDate()).fromNow()}</time>
                                                </span>
                                            </div>
                                            <span className="notification-icon">
                                                <svg className="olymp-chat---messages-icon"><use
                                                    href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                                              </span>
                                            <div className="more">
                                                <svg className="olymp-three-dots-icon">
                                                    <use
                                                        href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                                                </svg>
                                            </div>
                                        </li>
                                    )
                                })
                            }


                            {/*          <li>*/}
                            {/*              <div className="author-thumb">*/}
                            {/*                  <img src="img/avatar60-sm.jpg" alt="author"/>*/}
                            {/*              </div>*/}
                            {/*              <div className="notification-event">*/}
                            {/*                  <a href="/" className="h6 notification-friend">Jake Parker</a>*/}
                            {/*                  <span className="chat-message-item">Great, I’ll see you tomorrow!.</span>*/}
                            {/*                  <span className="notification-date"><time className="entry-date updated"*/}
                            {/*                                                            datetime="2004-07-24T18:18">4 hours ago</time></span>*/}
                            {/*              </div>*/}
                            {/*              <span className="notification-icon">*/}
                            {/*  <svg className="olymp-chat---messages_components-icon"><use*/}
                            {/*      href="/svg-icons/sprites/icons.svg#olymp-chat---messages_components-icon"></use></svg>*/}
                            {/*</span>*/}

                            {/*              <div className="more">*/}
                            {/*                  <svg className="olymp-three-dots-icon">*/}
                            {/*                      <use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>*/}
                            {/*                  </svg>*/}
                            {/*              </div>*/}
                            {/*          </li>*/}
                            {/*          <li>*/}
                            {/*              <div className="author-thumb">*/}
                            {/*                  <img src="img/avatar61-sm.jpg" alt="author"/>*/}
                            {/*              </div>*/}
                            {/*              <div className="notification-event">*/}
                            {/*                  <a href="/" className="h6 notification-friend">Elaine Dreyfuss</a>*/}
                            {/*                  <span className="chat-message-item">We’ll have to check that at the office and see if the client is on board with...</span>*/}
                            {/*                  <span className="notification-date"><time className="entry-date updated"*/}
                            {/*                                                            datetime="2004-07-24T18:18">Yesterday at 9:56pm</time></span>*/}
                            {/*              </div>*/}
                            {/*              <span className="notification-icon">*/}
                            {/*  <svg className="olymp-chat---messages_components-icon"><use*/}
                            {/*      href="/svg-icons/sprites/icons.svg#olymp-chat---messages_components-icon"></use></svg>*/}
                            {/*</span>*/}
                            {/*              <div className="more">*/}
                            {/*                  <svg className="olymp-three-dots-icon">*/}
                            {/*                      <use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>*/}
                            {/*                  </svg>*/}
                            {/*              </div>*/}
                            {/*          </li>*/}

                            {/*          <li className="chat-group">*/}
                            {/*              <div className="author-thumb">*/}
                            {/*                  <img src="img/avatar11-sm.jpg" alt="author"/>*/}
                            {/*                  <img src="img/avatar12-sm.jpg" alt="author"/>*/}
                            {/*                  <img src="img/avatar13-sm.jpg" alt="author"/>*/}
                            {/*                  <img src="img/avatar10-sm.jpg" alt="author"/>*/}
                            {/*              </div>*/}
                            {/*              <div className="notification-event">*/}
                            {/*                  <a href="/" className="h6 notification-friend">You, Faye, Ed &amp; Jet +3</a>*/}
                            {/*                  <span className="last-message-author">Ed:</span>*/}
                            {/*                  <span className="chat-message-item">Yeah! Seems fine by me!</span>*/}
                            {/*                  <span className="notification-date"><time className="entry-date updated"*/}
                            {/*                                                            datetime="2004-07-24T18:18">March 16th at 10:23am</time></span>*/}
                            {/*              </div>*/}
                            {/*              <span className="notification-icon">*/}
                            {/*  <svg className="olymp-chat---messages_components-icon"><use*/}
                            {/*      href="/svg-icons/sprites/icons.svg#olymp-chat---messages_components-icon"></use></svg>*/}
                            {/*</span>*/}
                            {/*              <div className="more">*/}
                            {/*                  <svg className="olymp-three-dots-icon">*/}
                            {/*                      <use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>*/}
                            {/*                  </svg>*/}
                            {/*              </div>*/}
                            {/*          </li>*/}
                        </ul>
                    }
                </div>
                <Link to="/messages" className="view-all bg-purple">View All Messages</Link>
            </div>
        </div>
    )
}