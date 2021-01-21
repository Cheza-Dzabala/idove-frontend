import React, { useContext } from 'react';
import { RealtimeContext } from '../../contexts/RealtimeContext';



export default ({ sendMessage, handleChange, typedMessage, uid }) => {
    const { callUser } = useContext(RealtimeContext);

    return (
        <form onSubmit={sendMessage}>
            <div className="form-group" style={{ padding: '0 10px 0 5px' }}>
                <input className="form-control" placeholder="Say something nice..." style={{ margin: '0 10px 0 5px' }} value={typedMessage} onChange={e => handleChange(e)} />
                <button type="submit" className="btn btn-info" style={{ backgroundColor: '#ff5e3a', margin: '5px 3px' }}>Send</button>
                <button type="button" className="btn btn-info" style={{ backgroundColor: '#ff5e3a', margin: '5px 3px' }} onClick={() => callUser(uid)}>Call</button>
                <div className="add-options-message">
                    <span className="options-message">
                        <svg className="olymp-computer-icon"><use href="/svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
                    </span>
                    <div className="options-message smile-block">
                        <svg className="olymp-happy-sticker-icon"><use href="/svg-icons/sprites/icons.svg#olymp-happy-sticker-icon"></use></svg>
                        <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat1.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat2.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat3.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat4.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat5.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat6.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat7.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat8.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/img/icon-chat9.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat10.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat11.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat12.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat13.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat14.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat15.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat16.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat17.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat18.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat19.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat20.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat21.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat22.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat23.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat24.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat25.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat26.png" alt="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="i/mg/icon-chat27.png" alt="icon" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    );
}