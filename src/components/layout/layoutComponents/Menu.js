import React, { useState } from 'react';

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
          <a href="/" className="logo">
            <div className="img-wrap">
              <img src="img/logo.png" alt="Olympus" />
            </div>
          </a>
          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <ul className="left-menu">
              <li>
                <a href="/" className="js-sidebar-open" data-test="hamburger" onClick={(e) => modifyPanel(e)}>
                  <svg className="olymp-popup-right-arrow left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="OPEN MENU"><use href="svg-icons/sprites/icons.svg#olymp-popup-right-arrow"></use></svg>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-menu-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="HOME"><use href="svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
                </a>
              </li>

              <li>
                <a href="/">
                  <svg className="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="NEWSFEED"><use href="svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use></svg>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-accordion-open-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CREATE PROJECT"><use href="svg-icons/sprites/icons.svg#olymp-accordion-open-icon"></use></svg>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-status-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FORUMS"><use href="svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="YOUR GROUPS"><use href="svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use></svg>
                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-calendar-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CALENDAR AND EVENTS"><use href="svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>
                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-badge-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Community Badges"><use href="svg-icons/sprites/icons.svg#olymp-badge-icon"></use></svg>
                </a>
              </li >

              <li>
                <a href="/">
                  <svg className="olymp-stats-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Account Stats"><use href="svg-icons/sprites/icons.svg#olymp-stats-icon"></use></svg>
                </a>
              </li >
            </ul >
          </div >
        </div >

        <div className="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
          <a href="/" className="logo">
            <div className="title-block">
              <h6 className="logo-title">iDove Connection Hub</h6>
            </div>
          </a>

          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <ul className="left-menu">
              <li>
                <a href="/" className="js-sidebar-open" data-test="hamburger-close" onClick={(e) => modifyPanel(e)}>
                  <svg className="olymp-close-icon left-menu-icon"><use href="svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                  <span className="left-menu-title">Collapse Menu</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-menu-icon  left-menu-icon"><use href="svg-icons/sprites/icons.svg#olymp-menu-icon "></use></svg>
                  <span className="left-menu-title">Home</span>
                </a>
              </li>

              <li>
                <a href="/">
                  <svg className="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="NEWSFEED"><use href="svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use></svg>
                  <span className="left-menu-title">Newsfeed</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-accordion-open-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CREATE PROJECT"><use href="svg-icons/sprites/icons.svg#olymp-accordion-open-icon"></use></svg>
                  <span className="left-menu-title">Create Project</span>
                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-status-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FORUMS"><use href="svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
                  <span className="left-menu-title">Forums</span>
                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FRIEND GROUPS"><use href="svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use></svg>
                  <span className="left-menu-title">Your Groups</span>
                </a>
              </li >
              <li>
                <a href="/">
                  <span className="author-thumb">
                    <div className="label-avatar bg-events">2</div>
                  </span>
                  <svg className="olymp-calendar-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CALENDAR AND EVENTS">
                    <use href="svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>

                  <span className="left-menu-title">Calendar and Events</span>


                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-badge-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Community Badges"><use href="svg-icons/sprites/icons.svg#olymp-badge-icon"></use></svg>
                  <span className="left-menu-title">Community Badges</span>
                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-stats-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Account Stats"><use href="svg-icons/sprites/icons.svg#olymp-stats-icon"></use></svg>
                  <span className="left-menu-title">Account Stats</span>
                </a>
              </li >
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

              <span>Complete <a href="/">your profile</a> so people and organizations can get involved!</span>

            </div>
          </div >
        </div >
      </div >
      <div className={`fixed-sidebar fixed-sidebar-responsive ${panelStatus ? 'open' : ''}`}>
        <div className="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
          <a href="/" className="logo js-sidebar-open" onClick={(e) => modifyPanel(e)}>
            <img src="img/logo.png" alt="Olympus" />
          </a>
        </div>
        <div className="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
          <a href="/" className="logo">
            <div className="title-block">
              <h6 className="logo-title">iDove Connection Hub</h6>
            </div>
          </a>
          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <ul className="left-menu">
              <li>
                <a href="/" className="js-sidebar-open" onClick={(e) => modifyPanel(e)}>
                  <svg className="olymp-close-icon left-menu-icon"><use href="svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                  <span className="left-menu-title">Collapse Menu</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-menu-icon  left-menu-icon"><use href="svg-icons/sprites/icons.svg#olymp-menu-icon "></use></svg>
                  <span className="left-menu-title">Home</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="NEWSFEED"><use href="svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use></svg>
                  <span className="left-menu-title">Newsfeed</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-accordion-open-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CREATE PROJECT"><use href="svg-icons/sprites/icons.svg#olymp-accordion-open-icon"></use></svg>
                  <span className="left-menu-title">Create Project</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-status-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FORUMS"><use href="svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
                  <span className="left-menu-title">Forums</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <svg className="olymp-happy-faces-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="FRIEND GROUPS"><use href="svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use></svg>
                  <span className="left-menu-title">Your Groups</span>
                </a>
              </li >
              <li>
                <a href="/">
                  <span className="author-thumb">
                    <div className="label-avatar bg-events">2</div>
                  </span>
                  <svg className="olymp-calendar-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="CALENDAR AND EVENTS">
                    <use href="svg-icons/sprites/icons.svg#olymp-calendar-icon"></use></svg>

                  <span className="left-menu-title">Calendar and Events</span>


                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-badge-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Community Badges"><use href="svg-icons/sprites/icons.svg#olymp-badge-icon"></use></svg>
                  <span className="left-menu-title">Community Badges</span>
                </a>
              </li >
              <li>
                <a href="/">
                  <svg className="olymp-stats-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="Account Stats"><use href="svg-icons/sprites/icons.svg#olymp-stats-icon"></use></svg>
                  <span className="left-menu-title">Account Stats</span>
                </a>
              </li >
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

              <span>Complete <a href="/">your profile</a> so people and organizations can get involved!</span>

            </div>
          </div >
        </div >
      </div >
    </>
  )
}
