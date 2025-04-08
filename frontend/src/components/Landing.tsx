// Landing.tsx
import React from 'react';
import './Landing.css';

const Landing: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="landing-page">
      <div>
        <h1>A Friend in Need 🤝</h1>
        <p>Welcome. This space is here for you whenever you’re feeling down, anxious, or just need someone to talk to.</p>
        <p>You’re not alone. Let’s talk.</p>
        <button className="start-button" onClick={onStart}>
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default Landing;
