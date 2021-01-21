import {createContext} from "react";

export const ChatContext = createContext({
    chatWindows: [],
    setChatWindows: () => {}
});
