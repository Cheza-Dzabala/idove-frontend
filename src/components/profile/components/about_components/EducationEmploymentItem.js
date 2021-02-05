
import React from 'react';


export default ({ educationItem }) => {
    return (
        <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
            <ul class="widget w-personal-info item-block">
                <li>
                    <span class="title">{educationItem.institution}</span>
                    <span class="date">{educationItem.start_date} - {educationItem.end_date}</span>
                    <span class="text">{educationItem.job_description}</span>
                </li>
            </ul>
        </div>
    );
}