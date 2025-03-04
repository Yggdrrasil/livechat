import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from './features/chatSlice';
import socket from './services/socket';

function App() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [inputValue, setInputValue] = useState('');

  // Escuchar mensajes del servidor
  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message)); // Añadir el mensaje al estado de Redux
    });

    return () => {
      socket.off('newMessage'); // Limpiar el listener al desmontar el componente
    };
  }, [dispatch]);

  // Enviar mensaje al servidor
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      socket.emit('sendMessage', inputValue); // Enviar el mensaje al servidor
      setInputValue(''); // Limpiar el input
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chat en Tiempo Real</h1>
      <div style={styles.chatBox}>
        <ul style={styles.messageList}>
          {messages.map((msg, index) => (
            <li key={index} style={styles.message}>{msg}</li>
          ))}
        </ul>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage} style={styles.button}>
          Enviar Mensaje
        </button>
      </div>
    </div>
  );
}

// Estilos básicos
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  chatBox: {
    width: '300px',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    overflowY: 'auto',
    marginBottom: '10px',
  },
  messageList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  message: {
    padding: '8px',
    marginBottom: '5px',
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
  },
  inputContainer: {
    display: 'flex',
    width: '300px',
  },
  input: {
    flex: '1',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default App;