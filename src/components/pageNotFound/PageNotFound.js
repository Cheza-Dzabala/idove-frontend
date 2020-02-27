import React from 'react'

export default function PageNotFound() {
  return (
    <>
      <section className="medium-padding120" data-test="not-found">
        <div className="container">
          <div className="row">
            <div className="col col-xl-6 m-auto col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="page-404-content">
                <img src="img/404.png" alt="page not found" />
                <div className="crumina-module crumina-heading align-center">
                  <h2 className="h1 heading-title">A <span className="c-primary">wild ghost</span> appears! Sadly, not what you were looking for...</h2>
                  <p className="heading-text">Sorry! The page you were looking for has been moved or doesn’t exist.
                         If you like, you can return to our homepage, or if the problem persists, send us an email at: <a href="/">support@idove.au.int</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
