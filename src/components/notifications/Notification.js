import React from 'react'

export default function NotificationComponent(props) {
  return (
    <div>
      <div className={`alert ${props.alertType} alert-dismissible fade show`} role="alert" notification-type={`${props.alertType}`} data-test="notificationMessage">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" >
          <span aria-hidden="true" style={{ fontSize: '15px' }}>&times;</span>
        </button>
        {props.message}
      </div>

    </div>
  )
}
