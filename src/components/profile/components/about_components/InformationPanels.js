import React from 'react';
import EducationEmploymentItem from './EducationEmploymentItem';


export default ({ profile }) => {
    return (
        <>
            <div class="col col-xl-12 col-lg-12  col-md-12 col-sm-12 col-12">
                <div class="ui-block">
                    <div class="ui-block-title">
                        <h6 class="title">My P.V.E Work</h6>
                    </div>
                    <div class="ui-block-content">
                        <div class="row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xs-12 col-xl-12" dangerouslySetInnerHTML={{
                                __html: profile.pve_work
                            }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col col-xl-8 order-xl-2 col-lg-8 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div class="ui-block">
                    <div class="ui-block-title">
                        <h6 class="title">Hobbies and Interests</h6>
                        <a href="/" class="more"><svg class="olymp-three-dots-icon"><use href="#olymp-three-dots-icon"></use></svg></a>
                    </div>
                    <div class="ui-block-content">
                        <div class="row">
                            <div class="col col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 class="title">About Me:</h6>
                                <span className="text" dangerouslySetInnerHTML={{
                                    __html: profile.summary
                                }} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                                <ul class="widget w-personal-info item-block">
                                    <li>
                                        <span class="title">Hobbies:</span>
                                        <span class="text" dangerouslySetInnerHTML={{
                                            __html: profile.hobbies
                                        }}>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="title">Favourite TV Shows:</span>
                                        <span class="text" dangerouslySetInnerHTML={{
                                            __html: profile.favourite_tv_shows
                                        }} />
                                    </li>
                                    <li>
                                        <span class="title">Favourite Movies:</span>
                                        <span class="text" dangerouslySetInnerHTML={{
                                            __html: profile.favourite_movies
                                        }} />
                                    </li>
                                    <li>
                                        <span class="title">Favourite Games:</span>
                                        <span class="text" dangerouslySetInnerHTML={{
                                            __html: profile.favourite_games
                                        }} />
                                    </li>
                                </ul>

                            </div>
                            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                                <ul class="widget w-personal-info item-block">
                                    <li>
                                        <span class="title">Favourite Music Bands / Artists:</span>
                                        <span class="text" dangerouslySetInnerHTML={{
                                            __html: profile.favourite_music_bands
                                        }} />
                                    </li>
                                    <li>
                                        <span class="title">Favourite Books:</span>
                                        <span class="text" dangerouslySetInnerHTML={{
                                            __html: profile.favourite_books
                                        }} />
                                    </li>
                                    <li>
                                        <span class="title">Favourite Writers:</span>
                                        <span class="text" dangerouslySetInnerHTML={{
                                            __html: profile.favourite_writers
                                        }} />
                                    </li>
                                    <li>
                                        <span class="title">Other Interests:</span>
                                        <span class="text">{profile.other_interests}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ui-block">
                    <div class="ui-block-title">
                        <h6 class="title">Education and Employement</h6>
                        <a href="/" class="more"><svg class="olymp-three-dots-icon"><use href="#olymp-three-dots-icon"></use></svg></a>
                    </div>
                    <div class="ui-block-content">
                        <div class="row">
                            {
                                profile.work_and_education.map(educationItem => {
                                    return <EducationEmploymentItem educationItem={educationItem} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}