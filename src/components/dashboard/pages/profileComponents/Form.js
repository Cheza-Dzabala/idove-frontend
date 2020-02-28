import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import SelectComponent from '../../../formComponents/SelectComponent';
import { areaOfExpertise, genders, maritalStatus } from '../../../../helpers/formPopulators/Profile';

export default ({ profileData, handleChange, countries, operation, updateProfile, cancelSubmit, createProfile, uploadImage }) => {

    return (
        <form _lpchecked="1" onSubmit={
            operation === 'update'
                ? updateProfile
                : operation === 'create'
                    ? createProfile
                    : cancelSubmit
        }>
            <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <label className="control-label">Phone Number
                    <span className="text-danger"> *
                    </span>
                    </label>
                    <PhoneInput
                        country={'us'}
                        value={profileData.phone_number}
                        onChange={(phone) => handleChange({ target: { name: 'phone_number', value: phone } })}
                        required
                    />
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <SelectComponent
                        name="gender"
                        label="Gender"
                        handleChange={handleChange}
                        value={profileData.gender}
                        options={genders()}
                    />
                </div>

                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <SelectComponent
                        name="marital_status"
                        label="Marital Statis"
                        handleChange={handleChange}
                        value={profileData.marital_status}
                        options={maritalStatus()}
                    />
                </div>

                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <SelectComponent
                        name="area_of_expertise"
                        label="Area of Expertise"
                        value={profileData.area_of_expertise}
                        handleChange={handleChange}
                        options={areaOfExpertise()}
                    />
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <SelectComponent
                        name="nationality"
                        label="Nationality"
                        handleChange={handleChange}
                        value={profileData.nationality}
                        options={
                            countries.map((country, key) => {
                                return <option
                                    value={country.value} key={key}
                                >{country.label}</option>
                            })
                        }
                    />
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <SelectComponent
                        name="country_of_residence"
                        label="Country Of Residence"
                        handleChange={handleChange}
                        value={profileData.country_of_residence}
                        options={
                            countries.map((country, key) => {
                                return (<option value={country.value} key={key}>{country.label}</option>)
                            })
                        }
                    />
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <label className="control-label">City Of Residence
                    <span className="text-danger"> *
                    </span></label>
                    <input className="form-control" style={{ height: '21px' }} placeholder="" name="city_of_residence" required onChange={handleChange}
                        defaultValue={profileData.city_of_residence ? profileData.city_of_residence : ''}
                    />
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Physical Address
                        <span className="text-danger"> *
                        </span>
                        </label>
                        <input className="form-control" style={{ height: '21px' }} placeholder="" name="physical_address" required onChange={handleChange}
                            defaultValue={profileData.physical_address ? profileData.physical_address : ''}
                        />
                        <span className="material-input"></span></div>
                </div>

                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <label className="control-label">Date Of Birth
                    <span className="text-danger"> *
                        </span></label>
                    <input type="date" name="date_of_birth" required onChange={(e) => handleChange(e)}
                        className="date-input"
                        value={profileData.date_of_birth ? profileData.date_of_birth : new Date()} />
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Religion</label>
                        <input className="form-control" style={{ height: '21px' }} placeholder="" name="religion" required onChange={handleChange}
                            defaultValue={profileData.religion ? profileData.religion : ''}
                        />
                        <span className="material-input"></span></div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <label className="control-label">When did you Join iDove?
                    <span className="text-danger"> *
                        </span></label>
                    <input type="date" name="date_joined" required onChange={handleChange}
                        className="date-input"
                        value={profileData.date_joined ? profileData.date_joined : new Date()} />
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <label htmlFor="avatar">Select an avatar:
                    <span className="text-danger"> *
                        </span></label>
                    <input type="file" id="avatar" name="avatar" required={profileData.avatar ? false : true} accept="image/png, image/jpeg" onChange={e => uploadImage(e)}></input>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <label htmlFor="cover_image">Select a cover image:
                    <span className="text-danger"> *
                        </span>
                    </label>
                    <input type="file" id="cover_image" name="cover_image" required={profileData.cover_image ? false : true} accept="image/png, image/jpeg" onChange={e => uploadImage(e)}></input>
                </div>

                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ marginTop: '20px' }}>
                    <div><label>Profile Summary
                    <span className="text-danger"> *
                        </span>
                    </label></div>
                    <div className="input-instructions">
                        Fill in your profile information. Take adventage of styling your profile to make it look the absolute best. Profile template can be found <a href="/" target="_blank">here</a>
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <TrixEditor name="summary" value={profileData.summary ? profileData.summary : ''} required className="form-control trixy" onChange={(e) => {
                            handleChange({ target: { name: 'summary', value: e } })
                        }} />
                    </div>
                </div>

                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div><label>PVE Work
                    <span className="text-danger"> *
                        </span>
                    </label></div>
                    <div className="input-instructions">
                        Details about your PVE work
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <TrixEditor name="pve_work" value={profileData.pve_work ? profileData.pve_work : ''} className="form-control trixy" onChange={(e) => {
                            handleChange({ target: { name: 'pve_work', value: e } })
                        }} />
                    </div>
                </div>

                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div><label>Hobbies
                        </label></div>
                    <div className="input-instructions">
                        Tell Us all about the fun things you  like to do?
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <TrixEditor name="hobbies" value={profileData.hobbies ? profileData.hobbies : ''} className="form-control trixy" onChange={(e) => {
                            handleChange({ target: { name: 'hobbies', value: e } })
                        }} />
                    </div>
                </div>

                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div><label>Favourite TV shows</label></div>
                    <div className="input-instructions">
                        Let others know about all the TV things you like to watch when you're free.
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <TrixEditor name="favourite_tv_shows" value={profileData.favourite_tv_shows ? profileData.favourite_tv_shows : ''} className="form-control trixy" onChange={(e) => {
                            handleChange({ target: { name: 'favourite_tv_shows', value: e } })
                        }} />
                    </div>
                </div>

                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div><label>Favourite Movies</label></div>
                    <div className="input-instructions">
                        Let others know about all the movies you like to watch when you're free
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <TrixEditor name="favourite_movies" value={profileData.favourite_movies ? profileData.favourite_movies : ''} className="form-control trixy" onChange={(e) => {
                            handleChange({ target: { name: 'favourite_movies', value: e } })
                        }} />
                    </div>
                </div>

                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div><label>Favourite Music</label></div>
                    <div className="input-instructions">
                        What kind of music are you into? Who are your favourite artists?
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <TrixEditor name="favourite_music_bands" value={profileData.favourite_music_bands ? profileData.favourite_music_bands : ''} className="form-control trixy" onChange={(e) => {
                            handleChange({ target: { name: 'favourite_music_bands', value: e } })
                        }} />
                    </div>
                </div>

                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div><label>Favourite Books</label></div>
                    <div className="input-instructions">
                        Any books you love to read? Tell the community about them.
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <TrixEditor name="favourite_books" value={profileData.favourite_books ? profileData.favourite_books : ''} className="form-control trixy" onChange={(e) => {
                            handleChange({ target: { name: 'favourite_books', value: e } })
                        }} />
                    </div>
                </div>

                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div><label>Favourite Games</label></div>
                    <div className="input-instructions">
                        Any games you love to play? Team building games or otherwise.
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <TrixEditor name="favourite_games" value={profileData.favourite_games ? profileData.favourite_games : ''} className="form-control trixy" onChange={(e) => {
                            handleChange({ target: { name: 'favourite_games', value: e } })
                        }} />
                    </div>
                </div>
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="form-group with-icon label-floating">
                        <input className="form-control" onChange={handleChange} value={profileData.facebook ? profileData.facebook : ''} name="facebook" type="text" />
                        <svg className="svg-inline--fa fa-facebook-f fa-w-10 c-facebook"
                            onChange={handleChange}
                            name="facebook_page" required
                            aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                        </svg>
                        <i className="fab fa-facebook-f c-facebook" aria-hidden="true"></i>
                        <span className="material-input"></span></div>
                    <div className="form-group with-icon label-floating">
                        <input className="form-control" name="twitter" onChange={handleChange} value={profileData.twitter ? profileData.twitter : ''} requiredtype="text" />
                        <svg className="svg-inline--fa fa-twitter fa-w-16 c-twitter" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                        </svg> <i className="fab fa-twitter c-twitter" aria-hidden="true"></i>
                        <span className="material-input"></span></div>
                    <div className="form-group with-icon label-floating">
                        <input className="form-control" type="text" name="instagram" value={profileData.instagram ? profileData.instagram : ''} onChange={handleChange} />
                        <svg width="256px" height="256px" className="svg-inline--fa fa-instagram fa-w-16 c-instagram" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                        </svg> <i className="fab fa-instagram c-instagram" aria-hidden="true"></i>
                        <span className="material-input"></span></div>
                    <div className="form-group with-icon label-floating">
                        <input className="form-control" type="text" name="linked_in" value={profileData.linked_in ? profileData.linked_in : ''} onChange={handleChange} />
                        <svg width="256px" height="256px" className="svg-inline--fa fa-linkedin fa-w-16 c-linkedin" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                        </svg> <i className="fab fa-linkedin c-linkedin" aria-hidden="true"></i>
                        <span className="material-input"></span></div>
                    <div className="form-group with-icon label-floating">
                        <input className="form-control" type="text" name="website" value={profileData.website ? profileData.website : ''} onChange={handleChange} />
                        <svg width="256px" height="256px" className="svg-inline--fa fa-globe fa-w-16 c-linkedin" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="globe" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                        </svg> <i className="fab fa-globe c-globe" aria-hidden="true"></i>
                        <span className="material-input"></span></div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <button className="btn btn-primary btn-lg full-width" type="submit">Save all Changes</button>
                </div>
            </div>
        </form>
    );
}