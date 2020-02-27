import React from 'react'
import { userData } from '../../../../helpers/AuthHelpers';

export default () => {
  const styles = {
    caretStyle: {
      cursor: 'pointer'
    }
  }

  const basicInfo = userData();
  return (
    <div className="author-page author vcard inline-items more">
      <div className="author-thumb">
        <img alt="author" className="avatar" src={basicInfo.profilePicture ? basicInfo.profilePicture : 'svg-icons/user.svg'} />
        <span className="icon-status away"></span>
        <div className="more-dropdown more-with-triangle">
          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <div className="ui-block-title ui-block-title-small">
              <h6 className="title">Your Account</h6>
            </div>
            <ul className="account-settings">
              <li>
                <a href="/profile">
                  <svg className="olymp-menu-icon"><use href="svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
                  <span>Profile Settings</span>
                </a>
              </li>
              <li>
                <a href="/logout">
                  <svg className="olymp-logout-icon"><use href="svg-icons/sprites/icons.svg#olymp-logout-icon"></use></svg>
                  <span>Log Out</span>
                </a>
              </li>
            </ul>

            <div className="ui-block-title ui-block-title-small">
              <h6 className="title">Chat Settings</h6>
            </div>

            <ul className="chat-settings">
              <li>
                <a href="/">
                  <span className="icon-status online"></span>
                  <span>Online</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="icon-status away"></span>
                  <span>Away</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="icon-status disconected"></span>
                  <span>Disconnected</span>
                </a>
              </li>

              <li>
                <a href="/">
                  <span className="icon-status status-invisible"></span>
                  <span>Invisible</span>
                </a>
              </li>
            </ul>

            <div className="ui-block-title ui-block-title-small">
              <h6 className="title">About the platform</h6>
            </div>

            <ul>
              <li>
                <a href="/">
                  <span>Terms and Conditions</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span>FAQs</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <span className="author-name fn" style={styles.caretStyle}>
        <div className="author-title">
          {basicInfo.username} <svg className="olymp-dropdown-arrow-icon"><use href="svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use></svg>
        </div>
        <span className="author-subtitle">....</span>
      </span >
    </div >
  )
}
