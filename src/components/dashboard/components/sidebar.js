import React, { useEffect, useState } from 'react'
import Axios from '../../../helpers/Axios';
import { getToken } from '../../../helpers/AuthHelpers';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const headers = {
    'Authorization': 'Bearer ' + getToken()
  }
  const [questionnaireCount, setQuestionnaireCount] = useState(0);

  useEffect(() => {
    Axios.get('/api/questionnaires/count_unfilled', { headers }).then(({ data: { data } }) => {
      setQuestionnaireCount(data);
    }).catch(({ response }) => {
      setQuestionnaireCount('Error: Reload');
    })
  });

  return (
    <div className="your-profile">
      <div className="ui-block-title ui-block-title-small">
        <h6 className="title">Your Dashboard</h6>
      </div>
      <div className="ui-block-title">
        <Link to="/dashboard/profile" className="h6 title">Profile</Link>
      </div>
      <div className="ui-block-title">
        <Link to="/dashboard/questionnaires" className="h6 title">Questionnaries</Link>
        {
          questionnaireCount === 0 ? '' : (
            <span href="#" className="items-round-little bg-purple">{questionnaireCount}</span>
          )
        }
      </div>
      <div className="ui-block-title">
        <Link href="/profile" className="h6 title">Connection Requests</Link>
        {/* <span href="#" className="items-round-little bg-blue">4</span> */}
      </div>
    </div>
  )
}

export default Sidebar;