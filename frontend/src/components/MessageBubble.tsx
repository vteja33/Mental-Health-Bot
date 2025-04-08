// components/MessageBubble.tsx
import React from 'react';
import './MessageBubble.css';

interface Props {
  text: string;
  isUser: boolean;
}

const MessageBubble: React.FC<Props> = ({ text, isUser }) => {
  return (
    <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
      {text}
    </div>
  );
};

export default MessageBubble;
