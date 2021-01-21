import React, { useState, useEffect } from "react";

import Snackbar from "../feedback/Snackbar";
import Backdrop from "../feedback/Backdrop";
import StatusUpdate from "./components/statusUpdate";
import Updates from "./components/updates";
import {getNewsfeed} from './methods';

export default () => {
  const [updating, setUpdating] = useState(false);
  const [feed, setFeed] = useState([]);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");


  useEffect(() => {
    setBackdropOpen(true);
    getNewsfeed(setBackdropOpen, setFeed, setSnackBarSeverity, setSnackBarMessage, setBackdropOpen);
  }, []);

  return (
    <>
      <main className="container">
        <div className="col col-md-8 offset-2">
          <div className="row">
            <div style={{ width: "100%" }}>
              <StatusUpdate
                setUpdating={setUpdating}
                setSnackBarOpen={setSnackBarOpen}
                setSnackBarMessage={setSnackBarMessage}
                setSnackBarSeverity={setSnackBarSeverity}
                updating={updating}
                getNewsfeed={getNewsfeed}
              />
            </div>
          </div>

          <div className="row">
            <Updates
              updates={feed}
              setSnackBarOpen={setSnackBarOpen}
              setSnackBarMessage={setSnackBarMessage}
              setSnackBarSeverity={setSnackBarSeverity}
              getNewsfeed={getNewsfeed}
            />
          </div>
        </div>
      </main>
      <Snackbar
        severity={snackBarSeverity}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        message={snackBarMessage}
      />
      <Backdrop open={backdropOpen} />
    </>
  );
};
