import React from 'react'

export default function PageHeader(props) {
  return (
    <div className="main-header">
      <div className={`content-bg-wrap ${props.backgroundType ? props.backgroundType : 'bg-account'}`}></div>
      <div className="container">
        <div className="row">
          <div className="col col-lg-8 m-auto col-md-8 col-sm-12 col-12">
            <div className="main-header-content" style={{ padding: '30px' }}>
              <h1>{props.title}</h1>
              <p>{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
