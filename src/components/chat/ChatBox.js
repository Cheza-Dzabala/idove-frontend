import React, { useContext, useState, useEffect } from 'react';
import { RealtimeContext } from '../../contexts/RealtimeContext';
import Input from './Input';
import { userData } from '../../helpers/AuthHelpers';
import { Launcher } from 'react-chat-window';
import moment from 'moment';



export default () => {
    const [messageList, setmessageList] = useState([]);
    const [text, setText] = useState('');
    const { chatVisibility, setChatVisibility, chatMember, CometChat, uid } = useContext(RealtimeContext);
    // console.log(chatMember);
    const updateMessages = (message) => {
        const _messageListCopy = messageList;
        _messageListCopy.push(message);
        setmessageList(_messageListCopy);
        // console.log('Updated');
    }
    useEffect(() => {

    }, [])



    CometChat.addMessageListener(
        uid,
        new CometChat.MessageListener({
            onTextMessageReceived: textMessage => {
                console.log("Text message received successfully", textMessage);
                console.log(textMessage.text);
                console.log(textMessage.sender.uid);
                console.log(moment.unix(textMessage.sentAt).format("YYYY-MM-DD HH:mm"));

                updateMessages({
                    sentBy: textMessage.sender.uid,
                    sent: moment.unix(textMessage.sentAt).format("DD-MM-YYYY HH:mm"),
                    text: textMessage.text
                })
                console.log(messageList);
                // Handle text message
            },
            onMediaMessageReceived: mediaMessage => {
                console.log("Media message received successfully", mediaMessage);
                // Handle media message
            },
            onCustomMessageReceived: customMessage => {
                console.log("Custom message received successfully", customMessage);
                // Handle custom message
            }
        })
    );

    const closeChatBox = (e) => {
        e.preventDefault();
        setChatVisibility(false);
    }

    const handleChange = ({ target }) => {
        const { value } = target;
        setText(value);
    };

    const _sendMessage = (e) => {
        e.preventDefault();
        document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight;

        var receiverID = chatMember.uid;
        var messageText = text;
        var receiverType = CometChat.RECEIVER_TYPE.USER;
        var textMessage = new CometChat.TextMessage(
            receiverID,
            messageText,
            receiverType
        );

        CometChat.sendMessage(textMessage).then(
            message => {
                console.log("Message sent successfully:", message);
            },
            error => {
                console.log("Message sending failed with error:", error);
            }
        );
        if (text !== '') {
            const message = {
                text,
                sent: 'recently',
                sentBy: userData().id
            }
            updateMessages(message);
            setText('')
        }
    }

    return (
        chatVisibility ?
            <div className="chat-box-olympus">
                <div className="ui-block popup-chat">
                    <div className="ui-block-title">
                        <span className="icon-status online"></span>
                        <h6 className="title">{chatMember.name}</h6>
                        <a href="/" onClick={closeChatBox}>
                            <svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>
                    </div>
                    <div className="mCustomScrollbar ps ps--theme_default ps--active-y"
                        data-mcs-theme="dark" data-ps-id="d21ba94a-c4da-8e48-1751-a057d09327ea" style={{ height: '450px' }}>
                        <ul className="notification-list chat-message chat-message-field" style={{ overflow: 'scroll' }} id="messageBox">
                            {
                                messageList.map(message => (
                                    <li key={message.index}>
                                        <div className={`author-thumb ${message.sentBy === userData().id ? 'sent' : ''}`}>
                                            <img src="/img/avatar14-sm.jpg" alt="author" />
                                        </div>
                                        <div className={`notification-event ${message.sentBy === userData().id ? 'sent' : ''}`}>
                                            <span className="chat-message-item" style={{ width: '100%' }}>{message.text}</span>
                                            <br />
                                            <span className={`notification-date ${message.sentBy === userData().id ? 'sent' : ''}`}>
                                                <time className="entry-date updated" dateTime="2004-07-24T18:18">{message.sent}</time>
                                            </span>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="ps__scrollbar-x-rail" style={{ left: '0px', bottom: '-89px' }}>
                            <div className="ps__scrollbar-x" tabIndex="0" style={{ left: '0px', width: '0px' }}>
                            </div>
                        </div>
                        <div className="ps__scrollbar-y-rail" style={{ top: '89px', height: '350px', right: '0px', }}>
                            <div className="ps__scrollbar-y" tabIndex="0" style={{ top: '71px', height: '279px', }}></div></div></div>
                    <Input sendMessage={_sendMessage} handleChange={handleChange} typedMessage={text} uid={chatMember.uid} />
                </div>
            </div > : null
    );
}