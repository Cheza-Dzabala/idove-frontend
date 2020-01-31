import React, { useState } from 'react'
import CollapsedChat from './chatComponents/collapsedComponents/CollapsedChat';
import ExpandedChat from './chatComponents/expandedComponents/ExpandedChat';

const ChatBar = (props) => {
  const [sidebarStatus, changeSidebarState] = useState(false);

  const modifySideBarStatus = (e) => {
    e.preventDefault()
    changeSidebarState(!sidebarStatus)
  }

  return (
    <div>
      <div className={`fixed-sidebar right ${sidebarStatus ? 'open' : ''}`} >
        <CollapsedChat modifySideBarStatus={modifySideBarStatus} />
        <ExpandedChat modifySideBarStatus={modifySideBarStatus} />
      </div >
      {/* Fixed Sidebar Right-Responsive */}
      <div className={`fixed-sidebar right fixed-sidebar-responsive ${sidebarStatus ? 'open' : ''}`}>
        <div className="fixed-sidebar-right sidebar--small" id="sidebar-right-responsive">
          <a href="/" className="olympus-chat inline-items js-chat-open" onClick={(e) => modifySideBarStatus(e)}>
            <svg className="olymp-chat---messages-icon"><use href="svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
          </a>
        </div>
      </div>

      {/* Window-popup-CHAT for responsive min-width: 768px */}
      <div className="ui-block popup-chat popup-chat-responsive" tabIndex="-1" role="dialog" aria-labelledby="update-header-photo" aria-hidden="true">
        <div className="modal-content">
          <div className="modal-header">
            <span className="icon-status online"></span>
            <h6 className="title">Chat</h6>
            <div className="more">
              <svg className="olymp-three-dots-icon"><use href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
              <svg className="olymp-little-delete js-chat-open"><use href="svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
            </div>
          </div>

          <div className="modal-body">
            <div className="mCustomScrollbar">
              <ul className="notification-list chat-message chat-message-field">
                <li>
                  <div className="author-thumb">
                    <img src="img/avatar14-sm.jpg" alt="author" className="mCS_img_loaded" />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac convallis sem. Sed aliquam, enim ac venenatis porta, nibh ex varius magna, at auctor nisi metus sed quam. Nullam congue et arcu sed accumsan. Suspendisse potenti. Nulla facilisi. Vivamus blandit massa id egestas mattis. Suspendisse potenti. Nunc placerat pellentesque lectus, consequat viverra mauris aliquam nec. Nam sagittis lacus posuere, bibendum tortor eget, luctus quam. Pellentesque ut lacus a ex faucibus consequat sed eget dolor. Duis auctor orci at tempus sodales. Etiam a massa vitae quam venenatis sagittis.
                            </span>
                    <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
                  </div>
                </li>

                <li>
                  <div className="author-thumb">
                    <img src="img/author-page.jpg" alt="author" className="mCS_img_loaded" />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">Don’t worry Mathilda!</span>
                    <span className="chat-message-item">Will attend</span>
                    <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">Yesterday at 8:29pm</time></span>
                  </div>
                </li>

                <li>
                  <div className="author-thumb">
                    <img src="img/avatar14-sm.jpg" alt="author" className="mCS_img_loaded" />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac convallis sem. Sed aliquam, enim ac venenatis porta, nibh ex varius magna, at auctor nisi metus sed quam. Nullam congue et arcu sed accumsan. Suspendisse potenti. Nulla facilisi. Vivamus blandit massa id egestas mattis. Suspendisse potenti. Nunc placerat pellentesque lectus, consequat viverra mauris aliquam nec. Nam sagittis lacus posuere, bibendum tortor eget, luctus quam. Pellentesque ut lacus a ex faucibus consequat sed eget dolor. Duis auctor orci at tempus sodales. Etiam a massa vitae quam venenatis sagittis.
                            </span>
                    <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
                  </div>
                </li>
              </ul>
            </div>

            <form className="need-validation">

              <div className="form-group label-floating is-empty">
                <label className="control-label">Press enter to post...</label>
                <textarea className="form-control" placeholder=""></textarea>
                <div className="add-options-message">
                  <a href="/" className="options-message">
                    <svg className="olymp-computer-icon"><use href="svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
                  </a>
                  <div className="options-message smile-block">

                    <svg className="olymp-happy-sticker-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-sticker-icon"></use></svg>

                    <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                      <li>
                        <a href="/">
                          <img src="img/icon-chat1.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat2.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat3.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat4.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat5.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat6.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat7.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat8.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat9.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat10.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat11.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat12.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat13.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat14.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat15.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat16.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat17.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat18.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat19.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat20.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat21.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat22.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat23.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat24.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat25.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat26.png" alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <img src="img/icon-chat27.png" alt="icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ChatBar;