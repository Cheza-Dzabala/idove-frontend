import React, { useContext, useState } from "react";
import { RealtimeContext } from "../../../../../contexts/RealtimeContext";

export default function ActiveChatsMini() {
  const {
    chatVisibility,
    setChatVisibility,
    setChatMember,
    CometChat,
    uid,
    onlineUsers,
    setOnlineUsers,
  } = useContext(RealtimeContext);

  CometChat.addUserListener(
    uid,
    new CometChat.UserListener({
      onUserOnline: (onlineUser) => {
        /* when someuser/friend comes online, user will be received here */
        // console.log("On User Online:", { onlineUser });
        const _onlineUsers = onlineUsers;
        _onlineUsers.push(onlineUser);
        setOnlineUsers(_onlineUsers);
        // console.log('Onlineners:', onlineUsers);
      },
      onUserOffline: (offlineUser) => {
        /* when someuser/friend went offline, user will be received here */
        // console.log("On User Offline:", { offlineUser });
        const _onlineUsers = onlineUsers;
        _onlineUsers.splice(_onlineUsers.indexOf(offlineUser), 1);
        setOnlineUsers(_onlineUsers);
        // console.log('Onlineners:', onlineUsers);
      },
    })
  );
  const setChat = (e, member) => {
    if (!chatVisibility) {
      setChatVisibility(true);
    }
    setChatMember(member);
  };
  return (
    <div>
      {onlineUsers.map((member) => (
        <li
          className="inline-items js-chat-open"
          onClick={(e) => setChat(e, member)}
          key={member.uid}
        >
          <div className="author-thumb">
            <img
              alt="author"
              src={member.avatar ? member.avatar : "/img/avatar62-sm.jp"}
              className="avatar"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="icon-status online"></span>
          </div>
        </li>
      ))}
    </div>
  );
}
