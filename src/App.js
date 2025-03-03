import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from './features/chatSlice';
import socket from './services/socket';

function App() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    socket.emit('sendMessage', inputValue);
    setInputValue('');
  };

  return (
    <div>
      <h1>Chat en Tiempo Real</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSendMessage}>Enviar Mensaje</button>
    </div>
  );
}

export default App;