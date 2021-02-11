import React, { useContext, useState, useEffect } from "react";
import { ParseContext } from "../../../../../contexts/RealtimeContext";
import { ChatContext } from "../../../../../contexts/chats.context";
import chatWindow from "../../../../chat/chatWindow";
import placeholder from "./avatar62-sm.jpg";

export default function ActiveChatsMini() {
  let [activeUsers, setActiveUsers] = useState([]);
  let [receivedBeats, setReceivedBeats] = useState([]);
  const chatWindowContext = useContext(ChatContext);

  const Parse = useContext(ParseContext);
  let subscription;

  const subscribeToHeartbeat = async () => {
    let query = new Parse.Query("Heartbeat");
    query.include("user");
    query.find();
    subscription = await query.subscribe();
    subscription.on("open", (res) => {
      console.log("subscription opened", res);
    });
    subscription.on("leave", (object) => {
      console.log("object deleted", JSON.stringify(object));
    });
    subscription.on("delete", (object) => {
      console.log("object deleted", JSON.stringify(object));
    });

    subscription.on("create", (object) => {
      console.log("object created", object);
      // console.log("object created Strung", JSON.stringify(object));
    });
    subscription.on("update", async (object) => {
      const user = object.attributes.user;
      setReceivedBeats((arr) => [...arr, user]);
    });
  };

  useEffect(() => {
    console.log(activeUsers);
  }, [activeUsers]);

  useEffect(() => {
    if (receivedBeats.length - 1 > -1) {
      if (
        !activeUsers.some(
          (usr) => usr.id === receivedBeats[receivedBeats.length - 1].id
        ) &&
        receivedBeats[receivedBeats.length - 1].id !== Parse.User.current().id
      ) {
        setActiveUsers((arr) => [
          ...arr,
          receivedBeats[receivedBeats.length - 1],
        ]);
      }
    }
  }, [receivedBeats]);

  useEffect(() => {
    subscribeToHeartbeat();
  }, []);
  // console.log(`Subscription ${subscription}`);
  return (
    <div className="flex flex-col items-center py-2 cursor-pointer space-y-2">
      {activeUsers.map((member) => (
        <div
          className="inline-items js-chat-open "
          onClick={(e) =>
            chatWindowContext.setChatWindows([
              ...chatWindowContext.chatWindows,
              member,
            ])
          }
          key={member.id}
        >
          <div className="author-thumb">
            <img
              alt={`${member.attributes.username}`}
              src={placeholder}
              className="avatar"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="icon-status online"></span>
            <h6 className="font-medium text-xs">{`${member.attributes.username}`}</h6>
          </div>
        </div>
      ))}
    </div>
  );
}
