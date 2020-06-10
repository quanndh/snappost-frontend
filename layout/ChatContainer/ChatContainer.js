import React from 'react';
import useContactBarResize from '../../hooks/useContactBarSize';
import ChatBox from '../../components/ChatBox/ChatBox';

const ChatContainer = () => {

    let [width, height] = useContactBarResize();

    return (
        <div className="chat-container" style={{ right: width - 50 }}>
            <ChatBox />
        </div>
    )
}

export default ChatContainer