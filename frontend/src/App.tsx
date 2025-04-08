import React, { useState } from 'react'
import './App.css'

interface Message {
  user: boolean;
  text: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = async() => {
    if (input.trim() !== '') {
      const userMessage: Message = { user:true, text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      try{
        const response = await fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });
  
        const data = await response.json();
        console.log('API response:', data);
        if (data.message) {
          const botMessage = { user: false, text: data.message };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          throw new Error(data.error || 'Unknown error');
        }  
      } catch (error) {
          console.error('Error: ', error);
          const errorMessage: Message = { 
            user: false, text: 'Sorry, I am having trouble connecting to the server. Please try again later.' 
          };
          setMessages((prev) => [...prev, errorMessage]);
      };  
    }
  };

  return (
    <div className="app">
        <div className="chat-window">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.user ? 'user-message' : 'bot-message'}
                >
                    {msg.text}
                </div>
            ))}
        </div>
        <div className="input-area">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
);
};

export default App
