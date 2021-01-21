import React, {useCallback, useState} from "react";
import {RealtimeContext} from "../contexts/RealtimeContext";

export const useRealtime = () => {
    const  [chatWindows, setChatWindows] = useState([]);
    const setCurrentChatWindows = useCallback(chatWidgets => {
        setChatWindows(chatWidgets);
    }, []);

    return {
        chatWindows,
        setCurrentChatWindows
    }
}