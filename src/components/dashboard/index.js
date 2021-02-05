import React from 'react'
import Sidebar from './components/sidebar';
import ProfileInformation from './pages/profile';
import Questionnaire from './pages/Questionnaire';
import { Route } from 'react-router-dom';
import QuestionnaireResponseForm from './pages/questionnareComponents/QuestionnaireResponseForm';

export default function Main() {
  return (
    <div className="row" style={{ width: '100%' }}>
      <div className="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12">
        <div className="ui-block">
          <Sidebar />
        </div>
      </div>
      <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
        <div className="ui-block">
          <Route exact path="/dashboard/profile" component={ProfileInformation} />
          <Route exact path="/dashboard/questionnaires" component={Questionnaire} />
          <Route exact path="/dashboard/questionnaires/:id/respond" component={QuestionnaireResponseForm} />
        </div>
      </div>
    </div>
  )
}
