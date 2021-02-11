import React, { useState, useContext, useEffect } from "react";
import Search from "./layoutComponents/NavbarItems/Search";

import Account from "./layoutComponents/NavbarItems/Account";
import Menu from "./layoutComponents/Menu";
import ChatBar from "./layoutComponents/ChatBar";
import PageHeader from "./../shared/PageHeader";
import PageSpacer from "../shared/PageSpacer";
import { RealtimeContext } from "../../contexts/RealtimeContext";
import ChatWindow from "./../chat/chatWindow";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "../../index.css";
import { ChatContext } from "../../contexts/chats.context";
import { Jutsu } from "react-jutsu";
import { ParseContext, LiveQueryContext } from "../../contexts/RealtimeContext";

export default function Index(props) {
  const Parse = useContext(ParseContext);
  const Client = useContext(LiveQueryContext);
  const [apollo, setApollo] = useState(false);
  const [dialling, setDialling] = useState({
    isOpen: false,
    message: "",
  });
  const [incomingCall, setIncomingCall] = useState({
    callIncoming: false,
    callObject: null,
  });
  const [call, setCall] = useState({
    active: false,
    room: null,
  });

  const { children } = props;
  const {
    props: { hasBackground, backgroundType, title, description },
  } = children;

  setInterval(async function () {
    let heart;
    const Heartbeat = Parse.Object.extend("Heartbeat");
    const query = new Parse.Query(Heartbeat);
    query.equalTo("user", Parse.User.current());
    const heartbeat = await query.find();
    if (heartbeat.length === 0) {
      heart = new Heartbeat();
    } else {
      heart = heartbeat[0];
      // console.log(`heart ${heart}`);
    }
    heart.set("user", Parse.User.current());
    heart
      .save()
      .then((beat) => {
        // console.log("My Heart Beating");
      })
      .catch((err) => {
        console.log("MY Hearbeat Flatlined: ", err);
      });
  }, 10 * 1000);
  useEffect(() => {
    Client.open();
    callListener();
  }, []);

  // const userInfo = userData();
  // const uid = userInfo.id.toString();

  const callListener = async () => {
    const query = new Parse.Query("Call");
    query.equalTo("target", Parse.User.current());
    query.equalTo("cancelled", false);
    query.equalTo("accepted", false);
    query.equalTo("ignored", false);
    query.equalTo("rejected", false);
    query.find();

    const subscription = await query.subscribe();

    subscription.on("open", () => console.log("Listening for in coming calls"));

    subscription.on("create", (res) => {
      setIncomingCall({
        callIncoming: true,
        callObject: res,
      });
    });
  };

  const acceptCall = async () => {
    const query = new Parse.Query("Call");
    const { id } = incomingCall.callObject;
    query.equalTo("objectId", id);
    query.limit(1);
    const res = await query.find();
    console.log("Accepted Call Result", res);
    res[0].set("accepted", true);
    res[0]
      .save()
      .then((response) => {
        setIncomingCall({
          callIncoming: false,
          callObject: null,
        });
        setCall({
          active: true,
          room: res[0].attributes.meetingRoom,
        });
      })
      .catch((err) => {
        console.log("Error when Accepting call", err);
      });
  };

  const [chatWindows, setChatWindows] = useState([]);

  const subscribeToCall = async (outgoingCall) => {
    const query = new Parse.Query("Call");
    query.equalTo("objectId", outgoingCall.id);
    query.find();
    const subscription = await query.subscribe();
    subscription.on("open", (res) => {
      console.log("call subscription opened", res);
    });
    subscription.on("update", async (object) => {
      const callUpdate = object.attributes;
      if (callUpdate.accepted) {
        setCall({
          active: true,
          room: object.attributes.meetingRoom,
        });
        setDialling({
          isOpen: false,
          message: "",
        });

        unsubscribeToSubcription(subscription);
      } else if (callUpdate.ignored) {
        setDialling({
          isOpen: true,
          message: `${callUpdate.target.attributes.username} did not pick up.`,
        });
        unsubscribeToSubcription(subscription);
      } else if (callUpdate.rejected) {
        setDialling({
          isOpen: true,
          message: `${callUpdate.target.attributes.username} can't pick up right now`,
        });
        unsubscribeToSubcription(subscription);
      }
    });
  };

  const unsubscribeToSubcription = (subscription) => {
    subscription.unsubscribe();
  };

  const handleClose = () => {
    setDialling({
      isOpen: false,
      message: "",
    });
    setIncomingCall({
      callIncoming: false,
      callObject: null,
    });
  };

  const chatValue = {
    chatWindows,
    setChatWindows,
    dialling,
    setDialling,
    subscribeToCall,
  };

  return (
    <ChatContext.Provider value={chatValue}>
      <>
        <Menu />
        <ChatBar />
        <header
          className="header"
          id="site-header"
          style={{ backgroundColor: "#135160" }}
          data-test="header"
        >
          <div className="page-title">
            <h6>Home</h6>
          </div>
          <div className="header-content-wrapper">
            <Search />
            <div className="control-block">
              {/*    <Requests/>*/}
              {/*    <Messages/>*/}
              {/*    <Notifications/>*/}
              <Account />
            </div>
          </div>
        </header>
        {hasBackground ? (
          <PageHeader
            backgroundType={backgroundType}
            title={title}
            description={description}
          />
        ) : (
          <PageSpacer />
        )}
        <div className="container p-2">
          {call.active && (
            <div id="callScreen p-20">
              <Jutsu
                roomName={call.room}
                displayName={Parse.User.current().attributes.username}
                domain="apollo-meet.dev"
                containerStyles={{ width: "800px", height: "500px" }}
                onMeetingEnd={() =>
                  setCall({
                    active: false,
                    room: null,
                  })
                }
                loadingComponent={
                  <p className="text-black text-lg">loading ...</p>
                }
                errorComponent={<p>Oops, something went wrong</p>}
              />
            </div>
          )}
          {incomingCall.callIncoming && (
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open
              message="Incoming call from ....."
              color="#ffffff"
              action={
                <React.Fragment>
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => acceptCall()}
                  >
                    Accept
                  </Button>
                  <Button color="secondary" size="small">
                    Reject
                  </Button>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => handleClose()}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          )}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={dialling.isOpen}
            message={dialling.message}
            color="#ffffff"
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
          <div className="w-full flex flex-row-reverse px-72">
            {chatWindows &&
              chatWindows.map((widget) => {
                return (
                  <div key={widget.id}>
                    <ChatWindow id={widget.id} properties={widget} />
                  </div>
                );
              })}
          </div>
        </div>
      </>
    </ChatContext.Provider>
  );
}
