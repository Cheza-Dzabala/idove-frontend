import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {

  const [panelStatus, setPanelStatus] = useState(false);

  const modifyPanel = (e) => {
    e.preventDefault()
    setPanelStatus(!panelStatus)
  }

  return (
    <>
      <div className={`fixed-sidebar ${panelStatus ? 'open' : ''}`}>
        <div className="fixed-sidebar-left sidebar--small" id="sidebar-left">
          <Link to="/" className="logo">
            <div className="img-wrap">
              <img src="/img/logo.png" alt="idove" />
            </div>
          </Link>
          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <ul className="left-menu">
              <li>
                <Link to="/" className="js-sidebar-open" data-test="hamburger" onClick={(e) => modifyPanel(e)}>
                  <svg className="olymp-popup-right-arrow left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="OPEN MENU"><use href="/svg-icons/sprites/icons.svg#olymp-popup-right-arrow"></use></svg>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <svg className="olymp-menu-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="HOME"><use href="/svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
                </Link>
              </li>

              <li>
                <Link to="/newsfeed">
                  <svg className="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="NEWSFEED"><use href="/svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use></svg>
                </Link>
              </li>
              <li>
                <Link to="/projects">
                  <svg className="olymp-accordion-open-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CREATE PROJECT"><use href="/svg-icons/sprites/icons.svg#olymp-accordion-open-icon"></use></svg>
                </Link>
              </li>
              <li>
                <Link to="/forums">
                  <svg className="olymp-status-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FORUMS"><use href="/svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
                </Link>
              </li >
              <li>
                <Link to="/users">
                  <svg className="olymp-status-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="USERS"><use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                </Link>
              </li >
              <li>
                <Link to="/groups">
                  <svg className="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="YOUR GROUPS"><use href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use></svg>
                </Link>
              </li >
              {/* <li>
                <Link to="/">
                  <svg className="olymp-calendar-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CALENDAR AND EVENTS"><use href="/svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>
                </Link>
              </li >
              <li>
                <Link to="/">
                  <svg className="olymp-badge-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Community Badges"><use href="/svg-icons/sprites/icons.svg#olymp-badge-icon"></use></svg>
                </Link>
              </li >

              <li>
                <Link to="/">
                  <svg className="olymp-stats-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Account Stats"><use href="/svg-icons/sprites/icons.svg#olymp-stats-icon"></use></svg>
                </Link>
              </li > */}
            </ul >
          </div >
        </div >

        <div className="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
          <Link to="/" className="logo">
            <div className="title-block">
              <h6 className="logo-title">iDove Connection Hub</h6>
            </div>
          </Link>

          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <ul className="left-menu">
              <li>
                <Link to="/" className="js-sidebar-open" data-test="hamburger-close" onClick={(e) => modifyPanel(e)}>
                  <svg className="olymp-close-icon left-menu-icon"><use href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                  <span className="left-menu-title">Collapse Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <svg className="olymp-menu-icon  left-menu-icon"><use href="/svg-icons/sprites/icons.svg#olymp-menu-icon "></use></svg>
                  <span className="left-menu-title">Home</span>
                </Link>
              </li>

              <li>
                <Link to="/newsfeed">
                  <svg className="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="NEWSFEED"><use href="/svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use></svg>
                  <span className="left-menu-title">Newsfeed</span>
                </Link>
              </li>
              <li>
                <Link to="/projects">
                  <svg className="olymp-accordion-open-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CREATE PROJECT"><use href="/svg-icons/sprites/icons.svg#olymp-accordion-open-icon"></use></svg>
                  <span className="left-menu-title">Create Project</span>
                </Link>
              </li >
              <li>
                <Link to="/forums">
                  <svg className="olymp-status-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FORUMS"><use href="/svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
                  <span className="left-menu-title">Forums</span>
                </Link>
              </li >
              <li>
                <Link to="/users">
                  <svg className="olymp-status-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="USERS"><use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                  <span className="left-menu-title">Users</span>
                </Link>
              </li >
              <li>
                <Link to="/groups">
                  <svg className="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FRIEND GROUPS"><use href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use></svg>
                  <span className="left-menu-title">Your Groups</span>
                </Link>
              </li >
              {/* <li>
                <Link to="/">
                  <span className="author-thumb">
                    <div className="label-avatar bg-events">2</div>
                  </span>
                  <svg className="olymp-calendar-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CALENDAR AND EVENTS">
                    <use href="/svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>

                  <span className="left-menu-title">Calendar and Events</span>


                </Link>
              </li >
              <li>
                <Link to="/">
                  <svg className="olymp-badge-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Community Badges"><use href="/svg-icons/sprites/icons.svg#olymp-badge-icon"></use></svg>
                  <span className="left-menu-title">Community Badges</span>
                </Link>
              </li >
              <li>
                <Link to="/">
                  <svg className="olymp-stats-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Account Stats"><use href="/svg-icons/sprites/icons.svg#olymp-stats-icon"></use></svg>
                  <span className="left-menu-title">Account Stats</span>
                </Link>
              </li > */}
            </ul >

            <div className="profile-completion">

              <div className="skills-item">
                <div className="skills-item-info">
                  <span className="skills-item-title">Profile Completion</span>
                  <span className="skills-item-count"><span className="count-animate" data-speed="1000" data-refresh-interval="50" data-to="76" data-from="0"></span><span className="units">76%</span></span>
                </div>
                <div className="skills-item-meter">
                  <span className="skills-item-meter-active bg-primary" style={{ width: '76%' }}></span>
                </div>
              </div>

              <span>Complete<Link to="/">your profile</Link> so people and organizations can get involved!</span>

            </div>
          </div >
        </div >
      </div >
      <div className={`fixed-sidebar fixed-sidebar-responsive ${panelStatus ? 'open' : ''}`}>
        <div className="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
          <Link to="/" className="logo js-sidebar-open" onClick={(e) => modifyPanel(e)}>
            <img src="img/logo.png" alt="Olympus" />
          </Link>
        </div>
        <div className="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
          <Link to="/" className="logo">
            <div className="title-block">
              <h6 className="logo-title">iGNITE</h6>
            </div>
          </Link>
          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <ul className="left-menu">
              <li>
                <Link to="/" className="js-sidebar-open" onClick={(e) => modifyPanel(e)}>
                  <svg className="olymp-close-icon left-menu-icon"><use href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                  <span className="left-menu-title">Collapse Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <svg className="olymp-menu-icon  left-menu-icon"><use href="/svg-icons/sprites/icons.svg#olymp-menu-icon "></use></svg>
                  <span className="left-menu-title">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/newsfeed">
                  <svg className="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="NEWSFEED"><use href="/svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use></svg>
                  <span className="left-menu-title">Newsfeed</span>
                </Link>
              </li>
              <li>
                <Link to="/projects">
                  <svg className="olymp-accordion-open-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CREATE PROJECT"><use href="/svg-icons/sprites/icons.svg#olymp-accordion-open-icon"></use></svg>
                  <span className="left-menu-title">Create Project</span>
                </Link>
              </li>
              <li>
                <Link to="/forums">
                  <svg className="olymp-status-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FORUMS"><use href="/svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
                  <span className="left-menu-title">Forums</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <svg className="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FRIEND GROUPS"><use href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use></svg>
                  <span className="left-menu-title">Your Groups</span>
                </Link>
              </li >
              {/* <li>
                <Link to="/">
                  <span className="author-thumb">
                    <div className="label-avatar bg-events">2</div>
                  </span>
                  <svg className="olymp-calendar-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CALENDAR AND EVENTS">
                    <use href="/svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>

                  <span className="left-menu-title">Calendar and Events</span>


                </Link>
              </li >
              <li>
                <Link to="/">
                  <svg className="olymp-badge-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Community Badges"><use href="/svg-icons/sprites/icons.svg#olymp-badge-icon"></use></svg>
                  <span className="left-menu-title">Community Badges</span>
                </Link>
              </li >
              <li>
                <Link to="/">
                  <svg className="olymp-stats-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Account Stats"><use href="/svg-icons/sprites/icons.svg#olymp-stats-icon"></use></svg>
                  <span className="left-menu-title">Account Stats</span>
                </Link>
              </li > */}
            </ul >

            <div className="profile-completion">

              <div className="skills-item">
                <div className="skills-item-info">
                  <span className="skills-item-title">Profile Completion</span>
                  <span className="skills-item-count"><span className="count-animate" data-speed="1000" data-refresh-interval="50" data-to="76" data-from="0"></span><span className="units">76%</span></span>
                </div>
                <div className="skills-item-meter">
                  <span className="skills-item-meter-active bg-primary" style={{ width: '76%' }}></span>
                </div>
              </div>

              <span>Complete<Link to="/">your profile</Link> so people and organizations can get involved!</span>

            </div>
          </div >
        </div >
      </div >
    </>
  )
}
