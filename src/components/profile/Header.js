import React, { useState } from "react";
import { getCountry } from "../../utilities/profile/resolver";
import { userData, headers } from "../../helpers/AuthHelpers";
import Axios from "../../helpers/Axios";
import Snackbar from "../feedback/Snackbar";
import Backdrop from "../feedback/Backdrop";

export default (props) => {
  const { profile, getActive, slug } = props;
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");

  const sendRequest = () => {
    const data = {
      user_id: profile.user_id,
    };
    setSnackBarOpen(true);
    setSnackBarMessage("Sending Connection Request");
    setSnackBarSeverity("info");
    Axios.post("api/connections/requests", data, { headers })
      .then((response) => {
        setSnackBarOpen(true);
        setSnackBarMessage("Successfully Sent Connection Request");
        setSnackBarSeverity("success");
      })
      .catch((error) => {
        console.log(error.response);
        setSnackBarOpen(false);
        setSnackBarMessage("Could not Send Connection Request");
        setSnackBarSeverity("error");
      });
  };

  return (
    <div className="row">
      <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="ui-block">
          <div className="top-header">
            <div className="top-header-thumb">
              <img
                src={
                  profile.cover_image
                    ? profile.cover_image
                    : "/img/top-header1.jpg"
                }
                alt="cover_image"
              />
            </div>
            <div className="profile-section">
              <div className="row">
                <div className="col col-lg-5 col-md-5 col-sm-12 col-12">
                  <ul className="profile-menu">
                    <li>
                      <a href={`/profiles/${slug}`} className={getActive(null)}>
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/profiles/${slug}/projects/`}
                        className={getActive("projects")}
                      >
                        Projects
                      </a>
                    </li>

                    <li>
                      <a
                        href={`/profiles/${slug}/connections`}
                        className={getActive("connections")}
                      >
                        Connections
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
                  <ul className="profile-menu">
                    <li>
                      <a
                        href={`/profiles/${slug}/photos`}
                        className={getActive("photos")}
                      >
                        Photos
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/profiles/${slug}/vidoes`}
                        className={getActive("videos")}
                      >
                        Videos
                      </a>
                    </li>
                    <li>
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                        </svg>
                        <ul className="more-dropdown more-with-triangle">
                          <li>
                            <a href="photos">Report Profile</a>
                          </li>
                          <li>
                            <a href="videos">Block Profile</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="control-block-button">
                {profile.user.id !== userData().id ? (
                  <>
                    {!profile.connection.status &&
                    !profile.connection.transacting ? (
                      <>
                        <a
                          onClick={sendRequest}
                          className="btn btn-control bg-blue"
                        >
                          <svg className="olymp-happy-face-icon">
                            <use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use>
                          </svg>
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                    {profile.connection.status &&
                    profile.connection.transacting ? (
                      <>
                        <a href="/" className="btn btn-control bg-purple">
                          <svg className="olymp-chat---messages-icon">
                            <use href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
                          </svg>
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <a
                    className="btn btn-control bg-primary"
                    href="/dashboard/profile"
                  >
                    <svg className="olymp-settings-icon">
                      <use href="/svg-icons/sprites/icons.svg#olymp-settings-icon"></use>
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <div className="top-header-author">
              <a href="/" className="author-thumb">
                <img
                  src={
                    profile && profile.avatar
                      ? profile.avatar
                      : "/img/author-main1.jpg"
                  }
                  style={{ height: "124px", width: "124px" }}
                  alt="author"
                />
              </a>
              <div className="author-content">
                <a href="/" className="h4 author-name">
                  {profile.user.first_name} {profile.user.last_name}
                </a>
                <div className="country">
                  {getCountry(profile.country_of_residence)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        severity={snackBarSeverity}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        message={snackBarMessage}
      />
    </div>
  );
};
