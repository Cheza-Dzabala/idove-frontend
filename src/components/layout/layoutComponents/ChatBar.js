import React, { useState } from "react";
import CollapsedChat from "./chatComponents/collapsedComponents/CollapsedChat";
import ExpandedChat from "./chatComponents/expandedComponents/ExpandedChat";

const ChatBar = (props) => {
  return (
    <div>
      <div className={`fixed-sidebar right`}>
        <CollapsedChat />
      </div>
      {/* Fixed Sidebar Right-Responsive */}
      <div
        className={`fixed-sidebar right fixed-sidebar-responsive`}
      >
        <div
          className="fixed-sidebar-right sidebar--small"
          id="sidebar-right-responsive"
        >
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
