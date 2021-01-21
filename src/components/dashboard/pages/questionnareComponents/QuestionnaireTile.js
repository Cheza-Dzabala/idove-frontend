import React from 'react';
import { Link } from 'react-router-dom';


export default (props) => {
    console.log(props);
    return (
        <div className="row border-left">
            <div className="col-9 pt-2 mr-auto">
                <h4>{props.title}</h4>
                <p>{props.summary}</p>
                <p className="mono-space">Length: {props.numberOfQuestions} Questions</p>
            </div>
            <div className="col-auto pt-4">
                <Link to={`/dashboard/questionnaires/${props.id}/respond`} className={`btn btn-primary btn-sm ${props.hasFilled ? 'disabled' : ''} text-white`}>
                    Respond
                </Link>
            </div>
        </div>
    );
}