// App.tsx
import React, { useState } from 'react';
import './App.css';
import Landing from './components/Landing';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started ? (
        <Landing onStart={() => setStarted(true)} />
      ) : (
        <Chat />
      )}
    </>
  );
};

export default App;
