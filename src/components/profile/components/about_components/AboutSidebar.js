import React from 'react';
import { getCountry, getGender } from '../../../../utilities/profile/resolver';

export default ({ profile }) => {

    return (
        <div className="col col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12">
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title">Personal Info</h6>
                </div>
                <div className="ui-block-content">
                    <ul className="widget w-personal-info">
                        <li>
                            <span className="title">Birthday:</span>
                            <span className="text">{profile.date_of_birth}</span>
                        </li>
                        <li>
                            <span className="title">Nationality:</span>
                            <span className="text">{getCountry(profile.nationality)}</span>
                        </li>
                        <li>
                            <span className="title">Lives in:</span>
                            <span className="text">{profile.city_of_residence}, {getCountry(profile.country_of_residence)}</span>
                        </li>
                        <li>
                            <span className="title">Occupation:</span>
                            <span className="text">UI/UX Designer</span>
                        </li>
                        <li>
                            <span className="title">Joined:</span>
                            <span className="text">April 31st, 2014</span>
                        </li>
                        <li>
                            <span className="title">Gender:</span>
                            <span className="text">{getGender(profile.gender)}</span>
                        </li>
                        <li>
                            <span className="title">Status:</span>
                            <span className="text">{profile.marital_status}</span>
                        </li>
                        <li>
                            <span className="title">Email:</span>
                            <span href="#" className="text">{profile.user.email}</span>
                        </li>
                        <li>
                            <span className="title">Website:</span>
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text">{profile.website}</a>
                        </li>
                        <li>
                            <span className="title">Phone Number:</span>
                            <span className="text">{profile.phone_number}</span>
                        </li>
                        <li>
                            <span className="title">Religious Belifs:</span>
                            <span className="text">{profile.religion}</span>
                        </li>
                    </ul>

                    <div className="widget w-socials">
                        <h6 className="title">Social Networks:</h6>
                        <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="social-item bg-facebook">
                            <i className="fab fa-facebook-f" aria-hidden="true"></i>
                            Facebook
                        </a>
                        <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="social-item bg-twitter">
                            <i className="fab fa-twitter" aria-hidden="true"></i>
                            Twitter
                        </a>

                        <a href={profile.linked_in} target="_blank" rel="noopener noreferrer" className="social-item bg-blue">
                            <i className="fab fa-linkedin" aria-hidden="true"></i>
                            LinkedIn
                        </a>

                        <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="social-item bg-danger">
                            <i className="fab fa-instagram" aria-hidden="true"></i>
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
}