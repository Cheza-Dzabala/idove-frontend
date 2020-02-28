import React, { useState, useEffect } from "react";
import CountryList from "react-select-country-list";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import {
  getProfile,
  saveProfile,
  updateProfile,
} from "../../../actions/profileActions";
import { TrixEditor } from "react-trix";
import { evaluate_response } from "../../../utilities/profile/statusCodeEval";
import { objectMapper } from "../../../utilities/profile/resolver";
import { uploadAttachment } from "../../../utilities/trix/attachmentListeners";
import Skeleton from "../../shared/Skeleton";
import { userProfile, headers } from "../../../helpers/AuthHelpers";
import Form from "./profileComponents/Form";
import { TextField } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import {
  areaOfExpertise,
  genders,
  maritalStatus,
} from "../../../helpers/formPopulators/Profile";
import Axios from "../../../helpers/Axios";
import Snackbar from "../../feedback/Snackbar";
import Backdrop from "../../feedback/Backdrop";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(4),
    width: "100%",
    height: 35,
    borderColor: "#c2c2c2",
    fillOpacity: 1,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const [profileData, setProfileData] = useState({});
  const [action, setAction] = useState("");
  const [imagePreviews, setImagePreviews] = useState({});
  const countries = CountryList().getData();
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");

  const getProfile = () => {
    Axios.get("/api/profile", { headers })
      .then((response) => {
        console.log(response.data);
        setProfileData(response.data.data);
        setAction("update");
        setBackdropOpen(false);
      })
      .catch(({ response }) => {
        console.log(response);
        setAction("create");
        setBackdropOpen(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const _profileDataCopy = profileData;
    _profileDataCopy[name] = value;
    setProfileData(_profileDataCopy);
    console.log("Profile", profileData);
  };

  const uploadImage = (e) => {
    const { name, files } = e.target;
    const _profileDataCopy = profileData;
    _profileDataCopy[name] = files[0];
    setProfileData(_profileDataCopy);

    const _imagePreviesCopy = imagePreviews;
    _imagePreviesCopy[name] = URL.createObjectURL(files[0]);
    setImagePreviews(_imagePreviesCopy);
    console.log(imagePreviews);
  };

  const createProfile = async (e) => {
    e.preventDefault();
    setBackdropOpen(true);
    const formData = objectMapper(profileData);
    Axios.post("/api/profile", formData, { headers })
      .then((response) => {
        setBackdropOpen(false);
        setSnackBarSeverity("success");
        setSnackBarMessage("Successfully created profile");
        setSnackBarOpen(true);
      })
      .catch((error) => {
        console.log(error.response);
        setBackdropOpen(false);
        setSnackBarSeverity("error");
        setSnackBarMessage("Unable to create profile");
        setSnackBarOpen(true);
      });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = objectMapper(profileData);
    Axios.patch(`/api/profile/${profileData.slug}`, formData, { headers })
      .then((response) => {
        setBackdropOpen(false);
        setSnackBarSeverity("success");
        setSnackBarMessage("Successfully updated profile");
        setSnackBarOpen(true);
      })
      .catch((error) => {
        console.log(error.response);
        setBackdropOpen(false);
        setSnackBarSeverity("error");
        setSnackBarMessage("Unable to update profile");
        setSnackBarOpen(true);
      });
  };

  useEffect(() => {
    document.addEventListener("trix-attachment-add", uploadAttachment);
    setBackdropOpen(true);
    getProfile();
  }, []);

  return (
    <div>
      <div className="ui-block-title">
        <h6>Profile Information</h6>
      </div>
      <div className="ui-block-content">
        <form onSubmit={action === "create" ? createProfile : updateProfile}>
          <div className="row">
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-basic"
                  name="phone_number"
                  label="Phone Number"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Nationality</InputLabel>
                <Select
                  required
                  value={profileData.nationality}
                  name="nationality"
                  onChange={handleChange}
                >
                  {countries.map((country, key) => (
                    <MenuItem value={country.value}>{country.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  required
                  value={profileData.country}
                  name="marital_status"
                  onChange={handleChange}
                >
                  {maritalStatus().map((status) => (
                    <MenuItem value={status.value}>{status.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  id="outlined-basic"
                  name="city_of_residence"
                  variant="outlined"
                  label="City of Residence"
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Gender</InputLabel>
                <Select
                  required
                  defaultValue={profileData.gender}
                  name="gender"
                  onChange={handleChange}
                >
                  {genders().map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Area of Experties</InputLabel>
                <Select
                  required
                  value={profileData.area_of_expertise}
                  name="area_of_expertise"
                  onChange={handleChange}
                  label="Country"
                >
                  {areaOfExpertise().map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Country of Residence</InputLabel>
                <Select
                  required
                  value={profileData.country_of_residence}
                  name="country_of_residence"
                  onChange={handleChange}
                >
                  {countries.map((country, key) => (
                    <MenuItem value={country.value}>{country.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="physical_address"
                  onChange={handleChange}
                  label="Physical Address"
                  required
                />
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  id="outlined-basic"
                  name="religion"
                  variant="outlined"
                  label="Religion"
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>
          </div>
          <div className="row" style={{ marginTop: "50px" }}>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group ">
                <label htmlFor="date_of_birth">
                  Date of Birth
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  required
                  onChange={(e) => handleChange(e)}
                  className="date-input"
                  style={{ height: "55px" }}
                />
              </div>
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <label htmlFor="date_joined">
                Date you joined iDove?
                <span className="text-danger"> *</span>
              </label>
              <div className="form-group ">
                <input
                  type="date"
                  name="date_joined"
                  required
                  onChange={(e) => handleChange(e)}
                  className="date-input"
                  style={{ height: "55px" }}
                />
              </div>
            </div>
          </div>
          <div className="row mt-10">
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <label htmlFor="avatar">
                Select an avatar:
                <span className="text-danger"> *</span>
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                required={profileData.avatar ? false : true}
                accept="image/png, image/jpeg"
                onChange={(e) => uploadImage(e)}
              ></input>
              <img src={imagePreviews.avatar} />
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <label htmlFor="cover_image">
                Select a cover image:
                <span className="text-danger"> *</span>
              </label>
              <input
                type="file"
                id="cover_image"
                name="cover_image"
                required={profileData.cover_image ? false : true}
                accept="image/png, image/jpeg"
                onChange={(e) => uploadImage(e)}
              ></input>
              <img src={imagePreviews.cover_image} />
            </div>
          </div>
          <div className="row">
            <div
              className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
              style={{ marginTop: "20px" }}
            >
              <div>
                <label>
                  Profile Summary
                  <span className="text-danger"> *</span>
                </label>
              </div>
              <div className="input-instructions">
                Fill in your profile information. Take adventage of styling your
                profile to make it look the absolute best. Profile template can
                be found{" "}
                <a href="/" target="_blank">
                  here
                </a>
                <br />
                <br />
              </div>
              <div className="form-group">
                <TrixEditor
                  name="summary"
                  value={profileData.summary ? profileData.summary : ""}
                  required
                  className="form-control trixy"
                  onChange={(e) => {
                    handleChange({ target: { name: "summary", value: e } });
                  }}
                />
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div>
                <label>
                  PVE Work
                  <span className="text-danger"> *</span>
                </label>
              </div>
              <div className="input-instructions">
                Details about your PVE work
                <br />
                <br />
              </div>
              <div className="form-group">
                <TrixEditor
                  name="pve_work"
                  value={profileData.pve_work ? profileData.pve_work : ""}
                  className="form-control trixy"
                  onChange={(e) => {
                    handleChange({ target: { name: "pve_work", value: e } });
                  }}
                />
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div>
                <label>Hobbies</label>
              </div>
              <div className="input-instructions">
                Tell Us all about the fun things you like to do?
                <br />
                <br />
              </div>
              <div className="form-group">
                <TrixEditor
                  name="hobbies"
                  value={profileData.hobbies ? profileData.hobbies : ""}
                  className="form-control trixy"
                  onChange={(e) => {
                    handleChange({ target: { name: "hobbies", value: e } });
                  }}
                />
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div>
                <label>Favourite TV shows</label>
              </div>
              <div className="input-instructions">
                Let others know about all the TV things you like to watch when
                you're free.
                <br />
                <br />
              </div>
              <div className="form-group">
                <TrixEditor
                  name="favourite_tv_shows"
                  value={
                    profileData.favourite_tv_shows
                      ? profileData.favourite_tv_shows
                      : ""
                  }
                  className="form-control trixy"
                  onChange={(e) => {
                    handleChange({
                      target: { name: "favourite_tv_shows", value: e },
                    });
                  }}
                />
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div>
                <label>Favourite Movies</label>
              </div>
              <div className="input-instructions">
                Let others know about all the movies you like to watch when
                you're free
                <br />
                <br />
              </div>
              <div className="form-group">
                <TrixEditor
                  name="favourite_movies"
                  value={
                    profileData.favourite_movies
                      ? profileData.favourite_movies
                      : ""
                  }
                  className="form-control trixy"
                  onChange={(e) => {
                    handleChange({
                      target: { name: "favourite_movies", value: e },
                    });
                  }}
                />
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div>
                <label>Favourite Music</label>
              </div>
              <div className="input-instructions">
                What kind of music are you into? Who are your favourite artists?
                <br />
                <br />
              </div>
              <div className="form-group">
                <TrixEditor
                  name="favourite_music_bands"
                  value={
                    profileData.favourite_music_bands
                      ? profileData.favourite_music_bands
                      : ""
                  }
                  className="form-control trixy"
                  onChange={(e) => {
                    handleChange({
                      target: { name: "favourite_music_bands", value: e },
                    });
                  }}
                />
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div>
                <label>Favourite Books</label>
              </div>
              <div className="input-instructions">
                Any books you love to read? Tell the community about them.
                <br />
                <br />
              </div>
              <div className="form-group">
                <TrixEditor
                  name="favourite_books"
                  value={
                    profileData.favourite_books
                      ? profileData.favourite_books
                      : ""
                  }
                  className="form-control trixy"
                  onChange={(e) => {
                    handleChange({
                      target: { name: "favourite_books", value: e },
                    });
                  }}
                />
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div>
                <label>Favourite Games</label>
              </div>
              <div className="input-instructions">
                Any games you love to play? Team building games or otherwise.
                <br />
                <br />
              </div>
              <div className="form-group">
                <TrixEditor
                  name="favourite_games"
                  value={
                    profileData.favourite_games
                      ? profileData.favourite_games
                      : ""
                  }
                  className="form-control trixy"
                  onChange={(e) => {
                    handleChange({
                      target: { name: "favourite_games", value: e },
                    });
                  }}
                />
              </div>
            </div>
            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group with-icon label-floating">
                <input
                  className="form-control"
                  onChange={handleChange}
                  value={profileData.facebook ? profileData.facebook : ""}
                  name="facebook"
                  type="text"
                />
                <svg
                  className="svg-inline--fa fa-facebook-f fa-w-10 c-facebook"
                  onChange={handleChange}
                  name="facebook_page"
                  required
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook-f"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  data-fa-i2svg=""
                ></svg>
                <i
                  className="fab fa-facebook-f c-facebook"
                  aria-hidden="true"
                ></i>
                <span className="material-input"></span>
              </div>
              <div className="form-group with-icon label-floating">
                <input
                  className="form-control"
                  name="twitter"
                  onChange={handleChange}
                  value={profileData.twitter ? profileData.twitter : ""}
                  requiredtype="text"
                />
                <svg
                  className="svg-inline--fa fa-twitter fa-w-16 c-twitter"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="twitter"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                ></svg>{" "}
                <i className="fab fa-twitter c-twitter" aria-hidden="true"></i>
                <span className="material-input"></span>
              </div>
              <div className="form-group with-icon label-floating">
                <input
                  className="form-control"
                  type="text"
                  name="instagram"
                  value={profileData.instagram ? profileData.instagram : ""}
                  onChange={handleChange}
                />
                <svg
                  width="256px"
                  height="256px"
                  className="svg-inline--fa fa-instagram fa-w-16 c-instagram"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="instagram"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                ></svg>{" "}
                <i
                  className="fab fa-instagram c-instagram"
                  aria-hidden="true"
                ></i>
                <span className="material-input"></span>
              </div>
              <div className="form-group with-icon label-floating">
                <input
                  className="form-control"
                  type="text"
                  name="linked_in"
                  value={profileData.linked_in ? profileData.linked_in : ""}
                  onChange={handleChange}
                />
                <svg
                  width="256px"
                  height="256px"
                  className="svg-inline--fa fa-linkedin fa-w-16 c-linkedin"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="linkedin"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                ></svg>{" "}
                <i
                  className="fab fa-linkedin c-linkedin"
                  aria-hidden="true"
                ></i>
                <span className="material-input"></span>
              </div>
              <div className="form-group with-icon label-floating">
                <input
                  className="form-control"
                  type="text"
                  name="website"
                  value={profileData.website ? profileData.website : ""}
                  onChange={handleChange}
                />
                <svg
                  width="256px"
                  height="256px"
                  className="svg-inline--fa fa-globe fa-w-16 c-linkedin"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="globe"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                ></svg>{" "}
                <i className="fab fa-globe c-globe" aria-hidden="true"></i>
                <span className="material-input"></span>
              </div>
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <button
                className="btn btn-primary btn-lg full-width"
                type="submit"
              >
                Save all Changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <Snackbar
        severity={snackBarSeverity}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        message={snackBarMessage}
      />
      <Backdrop open={backdropOpen} />
    </div>
  );
};
