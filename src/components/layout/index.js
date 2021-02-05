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
import ChatWindow from './../chat/chatWindow';
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {ChatContext} from '../../contexts/chats.context';

export default function Index(props) {
    let ws = new WebSocket('ws://localhost:9090');
    let connected_user;

    const send = (message) => {
        ws.send(JSON.stringify(message));
    }
    const userInfo = userData();
    const uid = userInfo.id.toString();
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

    setTimeout(function () {
        if (ws.readyState === 1) {
            if (uid !== null) {
                send({
                    type: "login",
                    userInfo: uid,
                });
            }
        } else {
            alert("Connection Could Not Be Established");
        }
    }, 1000);
    useEffect(() => {
        ws.onopen = () => {
            console.log('Connected');
        }

        ws.onclose = () => {
            console.log('Lost connection');
        }

        ws.onmessage = ({data}) => {
            const event = JSON.parse(data);
            // console.log(`data received:: ${JSON.parse(message)}`)
            switch (event.type) {
                case 'login':
                    if (data.success === false) {
                       console.log('already logged in');
                    } else {
                        console.log('Im in!');
                    }
            }
        }
    },[]);


    const handleClose = () => {
        setCalling(false);
    };


    return (
        <ChatContext.Provider value={chatValue}>
            <>
                <RealtimeContext.Provider
                    value={{
                        uid,
                        onlineUsers,
                        setOnlineUsers,
                        allUsers,
                    }}
                >
                    <Menu/>
                    {/*<ChatBar/>*/}
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
                            {/*<div className="control-block">*/}
                            {/*    <Requests/>*/}
                            {/*    <Messages/>*/}
                            {/*    <Notifications/>*/}
                            {/*    <Account/>*/}
                            {/*</div>*/}
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

                        {/*<div className="row">{children}</div>*/}
                        <div></div>
                        {/*<Snackbar*/}
                        {/*    anchorOrigin={{*/}
                        {/*        vertical: "bottom",*/}
                        {/*        horizontal: "left",*/}
                        {/*    }}*/}
                        {/*    open={calling}*/}
                        {/*    onClose={handleClose}*/}
                        {/*    message={`Incoming call from ${callerName}`}*/}
                        {/*    action={*/}
                        {/*        <React.Fragment>*/}
                        {/*            <Button color="primary" size="small" onClick={acceptCall}>*/}
                        {/*                Accept*/}
                        {/*            </Button>*/}
                        {/*            <Button color="secondary" size="small">*/}
                        {/*                Reject*/}
                        {/*            </Button>*/}
                        {/*            <IconButton*/}
                        {/*                size="small"*/}
                        {/*                aria-label="close"*/}
                        {/*                color="inherit"*/}
                        {/*                onClick={handleClose}*/}
                        {/*            >*/}
                        {/*                <CloseIcon fontSize="small"/>*/}
                        {/*            </IconButton>*/}
                        {/*        </React.Fragment>*/}
                        {/*    }*/}
                        {/*/>*/}

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
