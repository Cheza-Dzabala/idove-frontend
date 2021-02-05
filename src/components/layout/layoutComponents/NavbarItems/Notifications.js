import React, { useState, useEffect, useContext } from 'react';
import dotenv from 'dotenv';
import { RealtimeContext } from '../../../../contexts/RealtimeContext';
import moment from 'moment';
import Axios from '../../../../helpers/Axios';
import { headers } from '../../../../helpers/AuthHelpers';
import { Link } from 'react-router-dom';


export default () => {
  const { channel } = useContext(RealtimeContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Axios.get('api/notifications', { headers })
      .then(({ data }) => {
        // console.log(data);
        data.data.forEach(notification => {
          const _notificationsCopy = notifications;
          _notificationsCopy.push(notification);
          setNotifications(_notificationsCopy);
          setNotificationCount(notifications.length);
        });
      })
      .catch(error => {
        // console.log(error)
      });

    channel.bind('App\\Events\\NotificationEvent', function (data) {
      console.log(data);
      const notification = {
        message: data.message,
        _source: data.source,
        entity: data.entity,
        time: data.time,
      }
      const _notificationsCopy = notifications;
      _notificationsCopy.push(notification);
      setNotifications(_notificationsCopy);
      setNotificationCount(notificationCount + 1);
    });


  }, []);

  // console.log('Notifications-->', notifications);
  return (
    <div className="control-icon more has-items">
      <svg className="olymp-thunder-icon"><use href="/svg-icons/sprites/icons.svg#olymp-thunder-icon"></use></svg>

      <div className="label-avatar bg-primary">{notificationCount}</div>

      <div className="more-dropdown more-with-triangle triangle-top-center">
        <div className="ui-block-title ui-block-title-small">
          <h6 className="title">Notifications</h6>
          <a href="/">Mark all as read</a>
          <a href="/">Settings</a>
        </div>
        <div className="mCustomScrollbar" data-mcs-theme="dark">
          {notificationCount === 0 ? <div className="ui-block-content"><h6>No new notifications</h6></div> :
            <ul className="notification-list">
              {
                notifications.map(notification =>
                  < >
                    <li className="un-read" key={notification.id}>
                      <div className="author-thumb">
                        <img src={`${notification._source.profile ? notification._source.profile.avatar : ''}`} alt="author" />
                      </div>
                      <div className="notification-event">
                        <div>
                          <Link to={`/profiles/${notification._source.profile ? notification._source.profile.slug : ''}`} className="h6 notification-friend">
                            {`${notification._source.first_name} ${notification._source.last_name}`}</Link>
                          {notification.message}
                        </div>
                        <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">{moment(notification.time ? notification.time : notification.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</time></span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-comments-post-icon"><use href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                      </span>

                      <div className="more">
                        <svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                        <svg className="olymp-little-delete"><use href="/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                      </div>
                    </li>
                    {/* <li className="with-comment-photo">
                      <div className="author-thumb">
                        <img src="img/avatar64-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        <div><a href="/" className="h6 notification-friend">Sarah Hetfield</a> commented on your <a href="/" className="notification-link">photo</a>.</div>
                        <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">Yesterday at 5:32am</time></span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-comments-post-icon"><use href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                      </span>

                      <div className="comment-photo">
                        <img src="img/comment-photo1.jpg" alt="author" />
                        <span>“She looks incredible in that outfit! We should see each...”</span>
                      </div>

                      <div className="more">
                        <svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                        <svg className="olymp-little-delete"><use href="/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                      </div>
                    </li > */}
                  </>
                )
              }
              {/* 
              <li className="un-read">
                <div className="author-thumb">
                  <img src="img/avatar63-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <div>You and <a href="/" className="h6 notification-friend">Nicholas Grissom</a> just became friends. Write on <a href="/" className="notification-link">his wall</a>.</div>
                  <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">9 hours ago</time></span>
                </div>
                <span className="notification-icon">
                  <svg className="olymp-happy-face-icon"><use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                </span>

                <div className="more">
                  <svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                  <svg className="olymp-little-delete"><use href="/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                </div>
              </li >

              <li className="with-comment-photo">
                <div className="author-thumb">
                  <img src="img/avatar64-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <div><a href="/" className="h6 notification-friend">Sarah Hetfield</a> commented on your <a href="/" className="notification-link">photo</a>.</div>
                  <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">Yesterday at 5:32am</time></span>
                </div>
                <span className="notification-icon">
                  <svg className="olymp-comments-post-icon"><use href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                </span>

                <div className="comment-photo">
                  <img src="img/comment-photo1.jpg" alt="author" />
                  <span>“She looks incredible in that outfit! We should see each...”</span>
                </div>

                <div className="more">
                  <svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                  <svg className="olymp-little-delete"><use href="/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                </div>
              </li >

              <li>
                <div className="author-thumb">
                  <img src="img/avatar65-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <div><a href="/" className="h6 notification-friend">Green Goo Rock</a> invited you to attend to his event Goo in <a href="/" className="notification-link">Gotham Bar</a>.</div>
                  <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">March 5th at 6:43pm</time></span>
                </div>
                <span className="notification-icon">
                  <svg className="olymp-happy-face-icon"><use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                </span>

                <div className="more">
                  <svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                  <svg className="olymp-little-delete"><use href="/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                </div >
              </li >

              <li>
                <div className="author-thumb">
                  <img src="img/avatar66-sm.jpg" alt="author" />
                </div>
                <div className="notification-event">
                  <div><a href="/" className="h6 notification-friend">James Summers</a> commented on your new <a href="/" className="notification-link">profile status</a>.</div>
                  <span className="notification-date"><time className="entry-date updated" dateTime="2004-07-24T18:18">March 2nd at 8:29pm</time></span>
                </div>
                <span className="notification-icon">
                  <svg className="olymp-heart-icon"><use href="/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                </span>

                <div className="more">
                  <svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                  <svg className="olymp-little-delete"><use href="/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                </div>
              </li> */}
            </ul>
          }
        </div>
        <a href="/" className="view-all bg-primary">View All Notifications</a>
      </div >
    </div >
  )
}