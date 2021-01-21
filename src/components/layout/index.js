import React, {useState, useEffect} from "react";
import Search from "./layoutComponents/NavbarItems/Search";
import Requests from "./layoutComponents/NavbarItems/Requests";
import {Messages} from "./layoutComponents/NavbarItems/Messages";
import Notifications from "./layoutComponents/NavbarItems/Notifications";
import Account from "./layoutComponents/NavbarItems/Account";
import Menu from "./layoutComponents/Menu";
import ChatBar from "./layoutComponents/ChatBar";
import PageHeader from "./../shared/PageHeader";
import PageSpacer from "../shared/PageSpacer";
import {RealtimeContext} from "../../contexts/RealtimeContext";
import {userData} from "../../helpers/AuthHelpers";
import {CometChat} from "@cometchat-pro/chat";
import ChatWindow from './../chat/chatWindow';
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Pusher from "pusher-js";
import {ChatContext} from '../../contexts/chats.context';
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {PUSHER_CONFIG, COMETCHAT_CONFIG} from "../../config";

export default function Index(props) {

    const {children} = props;
    const {
        props: {hasBackground, backgroundType, title, description},
    } = children;

    const [calling, setCalling] = useState(false);
    const [onGoingCall, setOnGoingCall] = useState(false);
    const [dialling, setDialling] = useState(false);
    const [callerName, setCallerName] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [callSessionId, setCallSessionId] = useState("");

    const [chatWindows, setChatWindows] = useState([]);

    const chatValue = {chatWindows, setChatWindows};

    const userInfo = userData();
    const chatRef = useFirestore()
        .collection("messages").where('participants', 'array-contains', userInfo.email);
    const chats = useFirestoreCollectionData(chatRef);

    const pusher = new Pusher(PUSHER_CONFIG.APP_KEY, {
        cluster: PUSHER_CONFIG.CLUSTER,
    });

    const channel = pusher.subscribe(`App.User.${userInfo.id.toString()}`);

    const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(COMETCHAT_CONFIG.REGION)
        .build();

    const uid = userInfo.id.toString();

    const user = new CometChat.User(uid);

    useEffect(() => {
        console.log(chatWindows);
    }, [chatWindows]);


    const callUser = (receiverId) => {
        var receiverID = receiverId;
        var callType = CometChat.CALL_TYPE.AUDIO;
        var receiverType = CometChat.RECEIVER_TYPE.USER;
        var call = new CometChat.Call(receiverID, callType, receiverType);
        CometChat.initiateCall(call).then(
            (outGoingCall) => {
                // console.log("Call initiated successfully:", outGoingCall);
                // perform action on success. Like show your calling screen.
                setDialling(true);
            },
            (error) => {
                // console.log("Call initialization failed with exception:", error);
            }
        );
    };
    const acceptCall = () => {
        var sessionID = callSessionId;

        CometChat.acceptCall(sessionID).then(
            (call) => {
                // console.log("Call accepted successfully:", call);
                setCalling(false);
                setOnGoingCall(true);
                CometChat.startCall(
                    sessionID,
                    document.getElementById("callScreen"),
                    new CometChat.OngoingCallListener({
                        onUserJoined: (user) => {
                            /* Notification received here if another user joins the call. */
                            console.log("User joined call:", user);

                            /* this method can be use to display message or perform any actions if someone joining the call */
                        },
                        onUserLeft: (user) => {
                            /* Notification received here if another user left the call. */
                            console.log("User left call:", user);
                            /* this method can be use to display message or perform any actions if someone leaving the call */
                        },
                        onCallEnded: (call) => {
                            /* Notification received here if current ongoing call is ended. */
                            console.log("Call ended:", call);
                            setOnGoingCall(false);
                            /* hiding/closing the call screen can be done here. */
                        },
                    })
                );
            },
            (error) => {
                console.log("Call acceptance failed with error", error);
                // handle exception
            }
        );
    };

    const listnerID = `CALL_${uid}`;
    CometChat.addCallListener(
        listnerID,
        new CometChat.CallListener({
            onIncomingCallReceived(call) {
                console.log("Incoming call:", call);
                setCallerName(call.sender.name);
                setCallSessionId(call.sessionId);
                setCalling(true);
                // Handle incoming call
            },
            onOutgoingCallAccepted(call) {
                console.log("Outgoing call accepted:", call);
                setDialling(false);
                setOnGoingCall(true);
                CometChat.startCall(
                    call.sessionId,
                    document.getElementById("callScreen"),
                    new CometChat.OngoingCallListener({
                        onUserJoined: (user) => {
                            /* Notification received here if another user joins the call. */
                            console.log("User joined call:", user);

                            /* this method can be use to display message or perform any actions if someone joining the call */
                        },
                        onUserLeft: (user) => {
                            /* Notification received here if another user left the call. */
                            console.log("User left call:", user);
                            /* this method can be use to display message or perform any actions if someone leaving the call */
                        },
                        onCallEnded: (call) => {
                            /* Notification received here if current ongoing call is ended. */
                            console.log("Call ended:", call);
                            setOnGoingCall(false);
                            /* hiding/closing the call screen can be done here. */
                        },
                    })
                );
                // Outgoing Call Accepted
            },
            onOutgoingCallRejected(call) {
                console.log("Outgoing call rejected:", call);
                // Outgoing Call Rejected
            },
            onIncomingCallCancelled(call) {
                console.log("Incoming call calcelled:", call);
            },
        })
    );

    const handleClose = () => {
        setCalling(false);
    };


    return (
        <ChatContext.Provider value={chatValue}>
            <>
                <RealtimeContext.Provider
                    value={{
                        CometChat,
                        uid,
                        onlineUsers,
                        setOnlineUsers,
                        allUsers,
                        channel,
                        chats,
                    }}
                >
                    <Menu/>
                    <ChatBar/>
                    <header
                        className="header"
                        id="site-header"
                        style={{backgroundColor: "#135160"}}
                        data-test="header"
                    >
                        <div className="page-title">
                            <h6>Home</h6>
                        </div>
                        <div className="header-content-wrapper">
                            <Search/>
                            <div className="control-block">
                                <Requests/>
                                <Messages/>
                                <Notifications/>
                                <Account/>
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
                        <PageSpacer/>
                    )}
                    <div className="container">

                        <div className="row">{children}</div>
                        <div></div>
                        <Snackbar
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            open={calling}
                            onClose={handleClose}
                            message={`Incoming call from ${callerName}`}
                            action={
                                <React.Fragment>
                                    <Button color="primary" size="small" onClick={acceptCall}>
                                        Accept
                                    </Button>
                                    <Button color="secondary" size="small">
                                        Reject
                                    </Button>
                                    <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={handleClose}
                                    >
                                        <CloseIcon fontSize="small"/>
                                    </IconButton>
                                </React.Fragment>
                            }
                        />

                        <Snackbar
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            open={onGoingCall}
                            action={<div id="callScreen"></div>}
                        />
                        <Snackbar
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            open={dialling}
                            message="Dialling...."
                            color="#ffffff"
                            action={
                                <React.Fragment>
                                    <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={handleClose}
                                    >
                                        <CloseIcon fontSize="small"/>
                                    </IconButton>
                                </React.Fragment>
                            }
                        />
                        <div className="chat-widgets">
                            {
                                chatWindows.map(widget => {
                                    return <div key={widget.conversation_id}>
                                        <ChatWindow id={widget.conversation_id} properties={widget}/>
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                </RealtimeContext.Provider>
            </>
        </ChatContext.Provider>
    );
}
