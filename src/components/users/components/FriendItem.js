import React from "react";
import { getCountry } from "../../../utilities/profile/resolver";
import Popover from "@material-ui/core/Popover";
import { Link } from "react-router-dom";

export default ({ user }) => {
  const { profile } = user;
  return (
    <div className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
      <div className="ui-block">
        <div className="friend-item">
          <div className="friend-header-thumb">
            <img
              src={
                profile.cover_image ? profile.cover_image : "/img/friend1.jpg"
              }
              alt="friend"
            />
          </div>
          <div className="friend-item-content">
            <div className="more">
              <svg className="olymp-three-dots-icon">
                <use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
              </svg>
              <ul className="more-dropdown">
                <li>
                  <a href="/">Report Profile</a>
                </li>
                <li>
                  <a href="/">Block Profile</a>
                </li>
                <li>
                  <a href="/">Turn On Notifications</a>
                </li>
              </ul>
            </div>
            <div className="friend-avatar">
              <Link className="author-thumb" to={`/profiles/${profile.slug}`}>
                <img
                  src={profile.avatar ? profile.avatar : "/img/avatar1.jpg"}
                  style={{ height: "92px", width: "92px" }}
                  alt="author"
                />
              </Link>
              <div className="author-content">
                <a href="/" className="h5 author-name">
                  {user.first_name} {user.last_name}
                </a>
                <div className="country">
                  {profile.city_of_residence},{" "}
                  {getCountry(profile.country_of_residence)}
                </div>
              </div>
            </div>

            <div
              className={`swiper-container swiper-swiper-unique-id-${user.id} initialized swiper-container-horizontal`}
              data-slide="fade"
              id={`swiper-unique-id-${user.id}`}
            >
              <div
                className="swiper-wrapper"
                style={{
                  width: "972px",
                  transform: "translate3d(-243px, 0px, 0px)",
                  transitionDuration: "0ms",
                }}
              >
                <div
                  className="swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-duplicate-next"
                  data-swiper-slide-index="0"
                  style={{ width: "243px" }}
                >
                  <p
                    className="friend-about"
                    data-swiper-parallax="-500"
                    style={{
                      transform: "translate3d(-500px, 0px, 0px)",
                      transitionDuration: "0ms",
                    }}
                  >
                    Hi!, I’m Marina and I’m a Community Manager for “Gametube”.
                    Gamer and full-time mother.
                  </p>

                  <div
                    className="friend-since"
                    data-swiper-parallax="-100"
                    style={{
                      transform: "translate3d(-100px, 0px, 0px)",
                      transitionDuration: "0ms",
                    }}
                  >
                    <span>Joined:</span>
                    <div className="h6">{profile.date_joined}</div>
                  </div>
                </div>
                <div
                  className="swiper-slide swiper-slide-active"
                  data-swiper-slide-index="1"
                  style={{ width: "243px" }}
                >
                  <div
                    className="friend-count"
                    data-swiper-parallax="-500"
                    style={{
                      transform: "translate3d(0px, 0px, 0px)",
                      transitionDuration: "0ms",
                    }}
                  >
                    <a href="/" className="friend-count-item">
                      <div className="h6">52</div>
                      <div className="title">Connections</div>
                    </a>
                    <a href="/" className="friend-count-item">
                      <div className="h6">240</div>
                      <div className="title">Photos</div>
                    </a>
                    <a href="/" className="friend-count-item">
                      <div className="h6">16</div>
                      <div className="title">Videos</div>
                    </a>
                  </div>
                  <div
                    className="control-block-button"
                    data-swiper-parallax="-100"
                    style={{
                      transform: " translate3d(0px, 0px, 0px)",
                      transitionDuration: "0ms",
                    }}
                  >
                    <a href="/" className="btn btn-control bg-blue">
                      <svg className="olymp-happy-face-icon">
                        <use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use>
                      </svg>
                    </a>

                    <a href="/" className="btn btn-control bg-purple">
                      <svg className="olymp-chat---messages-icon">
                        <use href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
                      </svg>
                    </a>
                  </div>
                </div>

                <div
                  className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev"
                  data-swiper-slide-index="0"
                  style={{ width: "243px" }}
                >
                  <p
                    className="friend-about"
                    data-swiper-parallax="-500"
                    style={{
                      transform: "translate3d(500px, 0px, 0px)",
                      transitionDuration: "0ms",
                    }}
                  >
                    Hi!, I’m Marina and I’m a Community Manager for “Gametube”.
                    Gamer and full-time mother.
                  </p>

                  <div
                    className="friend-since"
                    data-swiper-parallax="-100"
                    style={{
                      transform: "translate3d(100px, 0px, 0px)",
                      transitionDuration: "0ms",
                    }}
                  >
                    <span>Joined:</span>
                    <div className="h6">{profile.date_joined}</div>
                  </div>
                </div>
                <div
                  className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                  data-swiper-slide-index="1"
                  style={{ width: "243px" }}
                >
                  <div
                    className="friend-count"
                    data-swiper-parallax="-500"
                    style={{
                      transform: "translate3d(500px, 0px, 0px)",
                      transitionDuration: "0ms",
                    }}
                  >
                    <a href="/" className="friend-count-item">
                      <div className="h6">52</div>
                      <div className="title">Connections</div>
                    </a>
                    <a href="/" className="friend-count-item">
                      <div className="h6">240</div>
                      <div className="title">Photos</div>
                    </a>
                    <a href="/" className="friend-count-item">
                      <div className="h6">16</div>
                      <div className="title">Videos</div>
                    </a>
                  </div>
                  <div
                    className="control-block-button"
                    data-swiper-parallax="-100"
                    style={{
                      transform: "translate3d(100px, 0px, 0px)",
                      transitionDuration: "0ms",
                    }}
                  >
                    <a href="/" className="btn btn-control bg-blue">
                      <svg className="olymp-happy-face-icon">
                        <use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use>
                      </svg>
                    </a>
                    <Popover>
                      <span className="btn btn-control bg-purple">
                        <svg className="olymp-chat---messages-icon">
                          <use href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>
                        </svg>
                      </span>
                    </Popover>
                  </div>
                </div>
              </div>
              {/* If we need pagination */}
              <div
                className={`swiper-pagination pagination-swiper-unique-id-${user.id} swiper-pagination-clickable swiper-pagination-bullets`}
              >
                <span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
                <span className="swiper-pagination-bullet"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
