import React, {useContext, useState} from 'react';
import {Phone, Videocam, Close, AttachFile, InsertEmoticon} from '@material-ui/icons';
import Picker from 'emoji-picker-react';
import {ChatWidgetContext} from './../layout/contexts/chatWidgetContext';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "react-chat-window/lib/components/icons/SendIcon";
import {ChatContext} from "../../contexts/chats.context";

export default (props) => {

    // Initialize required states
    const {chatWindows, setChatWindows} = useContext(ChatContext);

    const [chosenEmoji, setChosenEmoji] = useState(null);

    const [emojiPickerStatus, setEmojiPickerStatus] = useState(false);

    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        // e.preventDefault();
        console.log('Sending');
        const messageBox = document.getElementById(`messages-${id}`);
        console.log(message);
        messageBox.innerHTML += {message};
        setMessage('');
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const unplugChatWidget = () => {
        const newWidgets = chatWindows.filter((widget, index, arr ) => {
            return widget.conversation_id != props.id;
        });
        setChatWindows(newWidgets);
    }

    const onEmojiClick = async (event, emojiObject) => {
        console.log(emojiObject);
        await setChosenEmoji(emojiObject);
        console.log(`Chosen Emoji ${chosenEmoji}`);
        await setMessage(`${message}${emojiObject.emoji}`);
        console.log(`Message ${message}`);
        setEmojiPickerStatus(false);
    };

    const openForm = (id) => {
        const chatWindow = document.getElementById(`myForm-${id}`);
        const chatButton = document.getElementById(`open-button-${id}`);
        if (chatWindow != null) {
            chatWindow.style.display = "block"
        }

        if (chatButton != null) {
            chatButton.style.visibility = "hidden";
        }
    }

    const closeForm = (id) => {
        const element = document.getElementById(`myForm-${id}`);
        const chatButton = document.getElementById(`open-button-${id}`);
        if (chatButton != null) {
            chatButton.style.visibility = "visible";
        }
        if (element != null) {
            element.style.display = "none"
        }

    }

    const {id, properties} = props;
    return <>
        <div className={`open-button-${id}`} id={`open-button-${id}`}>
            <a onClick={() => openForm(id)}>{properties.sender_name}</a>
            <Close onClick={() => unplugChatWidget()}/>
        </div>
        <div className={`chat-popup-${id}`} id={`myForm-${id}`}>
            <FormControl className={`form-container-${id}`} onSubmit={() => sendMessage()}>
                <div className="window-header">
                    <p className="user-name">{properties.sender_name}</p>
                    <span className="action-icons">
                        <Phone/>
                         <Videocam/>
                         <Close onClick={() => closeForm(id)}/>
                    </span>
                </div>
                <div className="messages" id={`messages-${id}`}/>
                <OutlinedInput
                    id="outlined-adornment-message"
                    value={message}
                    onChange={(e) => handleChange(e)}
                    endAdornment={
                        <InputAdornment position="end" >
                            <IconButton
                                aria-label="Send Message"
                                type="submit"
                                edge="end"
                                name="message"
                                onClick={() => sendMessage()}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={0}
                />
                <div id={`emoji-picker-${id}`} style={{'display': emojiPickerStatus ? 'block' : 'none'}}>
                    <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} />
                </div>
                <div className="chat-window-toolbar">
                    <div className="attach-file-chat">
                        <label htmlFor="file-input" >
                            <AttachFile/>
                        </label>
                        <input type="file" id="file-input" style={{'display': 'none'}}/>
                    </div>
                    <InsertEmoticon onClick={() => setEmojiPickerStatus(!emojiPickerStatus)}/>
                </div>
            </FormControl>
        </div>
        <style> {`
          .open-button-${id} {
            background-color: white;
            font-weight: 500;
            color: black;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
            position: fixed;
            bottom: 0;
            width: 150px;
            box-shadow: 0px 1px 13px 1px #00000030;
            border-radius: 10px 10px 0 0;
            width: 250px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
            .chat-popup-${id} {
            display: none;
            position: fixed;
            bottom: 0px;
            border: 3px solid #f1f1f1;
            z-index: 9;
            box-shadow: 0px 1px 13px 1px #00000030;
        }
        
            .messages {
            height: 250px;
            border: 1px solid #efefef;
            background-color: white;
        }

            /* Add styles to the form container */
            .form-container-${id} {
            min-width: 250px;
            max-width: 300px;
            padding: 10px;
            background-color: white;
        }

            /* Full-width textarea */
            .form-container-${id} textarea {
            width: 100%;
            padding: 15px;
            margin: 5px 0 22px 0;
            border: none;
            background: #f1f1f1;
            resize: none;
            min-height: 200px;
        }
        
        .window-header {
            display: flex;
            width: 100%;
            justify-content: space-between;
        }
        
        .user-name {
            flex: 1;
        }
        
        .action-icons {
            display: flex;
           flex: 1;
           justify-content: flex-end;
        }
        
        .action-icons svg{
            margin: 0 10px
            cursor: pointer;
        }
        
        .message-input {
            height: 10px;
            margin: 10px 0;
        }
        
        .chat-window-toolbar {
        display: flex;
            height: 10px;
            margin: 10px 0;
        }
        
        .chat-window-toolbar  svg{
        cursor: pointer;
        }
            /* When the textarea gets focus, do something */
            .form-container-${id} textarea:focus {
            background-color: #ddd;
            outline: none;
        }

            /* Set a style for the submit/send button */
            .form-container-${id} .btn-${id} {
            background-color: #4CAF50;
            color: white;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
            width: 100%;
            margin-bottom:10px;
            opacity: 0.8;
        }

            /* Add a red background color to the cancel button */
            .form-container-${id} .cancel-${id} {
            background-color: red;
        }

            /* Add some hover effects to buttons */
            .form-container-${id} .btn-${id}:hover, .open-button-${id}:hover {
            opacity: 1;
        }
        `}
        </style>
    </>;
}