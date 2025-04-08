import React, { useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';
import './Chat.css';

interface Message {
  user: boolean;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  // ⏰ Function to return time-based greeting
  const getGreetingMessage = () => {
    const hour = new Date().getHours();
  
    if (hour < 12) {
      return (
        "Good morning 🌅 I’m really glad you’re here. Mornings can be tough — if you’re feeling heavy, anxious, or just not quite yourself, I’m here to talk. You don’t have to go through this alone."
      );
    } else if (hour < 18) {
      return (
        "Good afternoon ☀️ It's okay if today hasn’t gone the way you hoped. I’m here to listen and support you. However you’re feeling — let’s talk through it, one step at a time."
      );
    } else {
      return (
        "Good evening 🌙 I know nights can feel overwhelming or lonely. You’re not alone here. I’m here to be with you, without judgment, whenever you’re ready to talk."
      );
    }
  };
  // 📥 Initialize chat with greeting
  useEffect(() => {
    const greeting = getGreetingMessage();
    const welcomeMessage: Message = {
      user: false,
      text: greeting,
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMsg: Message = { user: true, text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMsg: Message = {
        user: false,
        text: data.message || 'Sorry, something went wrong.',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: 'Server connection error. Try again later.' },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">💬 A Friend in Need</div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} isUser={msg.user} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type how you're feeling..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
