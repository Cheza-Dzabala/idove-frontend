import React, { useContext, useState, useEffect } from "react";
import { RealtimeContext } from "../../../../contexts/RealtimeContext";
import Axios from "../../../../helpers/Axios";
import { headers } from "../../../../helpers/AuthHelpers";
import Snackbar from "../../../feedback/Snackbar";

export default function Requests() {
  const { channel } = useContext(RealtimeContext);
  const [connRequests, setRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");

  const acceptRequest = (id) => {
    console.log(headers);
    Axios.patch(`/api/connections/requests/${id}/accept`, {}, { headers })
      .then((response) => {
        setSnackBarOpen(true);
        setSnackBarMessage("Successfully Accepted Connection Request");
        setSnackBarSeverity("success");
        getRequests();
      })
      .catch((error) => {
        console.log(error.response);
        setSnackBarOpen(false);
        setSnackBarMessage("Could not Accept Connection Request");
        setSnackBarSeverity("error");
      });
  };

  const getRequests = () => {
    Axios.get("/api/connections/requests", { headers })
      .then(({ data: { data } }) => {
        setRequests(data);
        setRequestCount(data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    channel.bind("App\\Events\\ConnectionRequestEvent", function (data) {
      const _connRequestsCopy = connRequests;
      _connRequestsCopy.push(data);
      setRequests(_connRequestsCopy);
      setRequestCount(requestCount + 1);
    });
    getRequests();
  }, []);

  return (
    <div className="control-icon more has-items">
      <svg className="olymp-happy-face-icon">
        <use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use>
      </svg>
      <div className="label-avatar bg-blue">{requestCount}</div>

      <div className="more-dropdown more-with-triangle triangle-top-center">
        <div className="ui-block-title ui-block-title-small">
          <h6 className="title">Connection REQUESTS</h6>
        </div>

        <div className="mCustomScrollbar" data-mcs-theme="dark">
          {requestCount === 0 ? (
            <div className="ui-block-content">
              <h6>No new requests</h6>
            </div>
          ) : (
            <ul className="notification-list friend-requests">
              {connRequests.map((request) => (
                <li>
                  <div className="author-thumb">
                    <img src={request.sender.avatar} alt="author" />
                  </div>
                  <div className="notification-event">
                    <a href="/" className="h6 notification-friend">
                      {request.sender.username}
                    </a>
                    <span className="chat-message-item">
                      4 Connections in Common
                    </span>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18"
                      >
                        {request.sent_on}
                      </time>
                    </span>
                  </div>
                  <span className="notification-icon">
                    <a
                      onClick={acceptRequest(request.id)}
                      className="accept-request"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="icon-add without-text">
                        <svg className="olymp-happy-face-icon">
                          <use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use>
                        </svg>
                      </span>
                    </a>
                    <a href="/" className="accept-request request-del">
                      <span className="icon-minus">
                        <svg className="olymp-happy-face-icon">
                          <use href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use>
                        </svg>
                      </span>
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <a href="/" className="view-all bg-blue">
          Check all your connection requests
        </a>
      </div>
      <Snackbar
        severity={snackBarSeverity}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        message={snackBarMessage}
      />
    </div>
  );
}
