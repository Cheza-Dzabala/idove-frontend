import React from "react";
import ActiveChats from "./ActiveChats";

export default function ExpandedChat(props) {
  return (
    <div className="fixed-sidebar-right sidebar--large" id="sidebar-right-1">
      <div className="mCustomScrollbar" data-mcs-theme="dark">
        <ul className="chat-users">
          <ActiveChats />
        </ul>

        <ul className="chat-users"></ul>
      </div>
      <div className="search-friend inline-items ml-2">
        <a
          href="/"
          className="js-sidebar-open mt-1"
          data-test="closeChat"
          onClick={(e) => props.modifySideBarStatus(e)}
        >
          <svg className="olymp-close-icon">
            <use href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use>
          </svg>
        </a>
        <form className="form-group">
          <input
            className="form-control"
            placeholder="Search Friends..."
            defaultValue=""
            type="text"
          />
        </form>
      </div>
      <span className="olympus-chat inline-items">
        <h6 className="olympus-chat-title">iDove CHAT</h6>
      </span>
    </div>
  );
}
