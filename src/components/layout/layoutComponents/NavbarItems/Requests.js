import React from 'react'

export default function Requests() {
  const requestCount = () => {
    return 0
  }

  return (
    <div className="control-icon more has-items">
      <svg className="olymp-happy-face-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
      <div className="label-avatar bg-blue">{requestCount()}</div>

      <div className="more-dropdown more-with-triangle triangle-top-center">
        <div className="ui-block-title ui-block-title-small">
          <h6 className="title">Connection REQUESTS</h6>
        </div>

        <div className="mCustomScrollbar" data-mcs-theme="dark">
          {requestCount() === 0 ? <div className="ui-block-content"><h6>No new requests</h6></div> :
            <ul className="notification-list friend-requests">
              <li>
                <div className="author-thumb">
                  <img src="img/avatar55-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="/" className="h6 notification-friend">Tamara Romanoff</a>
                  <span className="chat-message-item">Mutual Connection: Sarah Hetfield</span>
                </div>
                <span className="notification-icon">
                  <a href="/" className="accept-request">
                    <span className="icon-add without-text">
                      <svg className="olymp-happy-face-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                    </span>
                  </a>

                  <a href="/" className="accept-request request-del">
                    <span className="icon-minus">
                      <svg className="olymp-happy-face-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                    </span>
                  </a>

                </span>

                <div className="more">
                  <svg className="olymp-three-dots-icon"><use href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                </div>
              </li>

              <li>
                <div className="author-thumb">
                  <img src="img/avatar56-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="/" className="h6 notification-friend">Tony Stevens</a>
                  <span className="chat-message-item">4 Connections in Common</span>
                </div>
                <span className="notification-icon">
                  <a href="/" className="accept-request">
                    <span className="icon-add without-text">
                      <svg className="olymp-happy-face-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                    </span>
                  </a>

                  <a href="/" className="accept-request request-del">
                    <span className="icon-minus">
                      <svg className="olymp-happy-face-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                    </span>
                  </a>

                </span>

                <div className="more">
                  <svg className="olymp-three-dots-icon"><use href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                </div>
              </li >

              <li className="accepted">
                <div className="author-thumb">
                  <img src="img/avatar57-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  New Project Support Request from <a href="/" className="h6 notification-friend">Mary Jane Stark</a>. <a href="/" className="notification-link">View Proposal</a>.
                  </div>
                <a href="/" className="accept-request">
                  <span className="icon-add without-text">
                    <svg className="olymp-happy-face-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                  </span>
                </a>

              </li>

              <li>
                <div className="author-thumb">
                  <img src="img/avatar58-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <a href="/" className="h6 notification-friend">Stagg Investment Group</a>
                  <span className="chat-message-item">9 Connections in Common</span>
                </div>
                <span className="notification-icon">
                  <a href="/" className="accept-request">
                    <span className="icon-add without-text">
                      <svg className="olymp-happy-face-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                    </span>
                  </a>

                  <a href="/" className="accept-request request-del">
                    <span className="icon-minus">
                      <svg className="olymp-happy-face-icon"><use href="svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                    </span>
                  </a>
                </span>

                <div className="more">
                  <svg className="olymp-three-dots-icon"><use href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                </div >
              </li>

            </ul>
          }
        </div>
        <a href="/" className="view-all bg-blue">Check all your connection requests</a>
      </div>
    </div >

  )
}
