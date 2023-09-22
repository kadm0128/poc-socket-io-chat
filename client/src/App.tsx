import { io } from 'socket.io-client';
import {useEffect, useState} from "react";

const socket = io('http://localhost:3200', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
}); // Replace with your server URL9

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on('message', (message) => {
      console.log("===message===", message);
      setMessages([...messages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Real-Time Chat App</h1>
      <div className="chat">
        <div className="messages">
          {messages.map((msg: string, index: number) => (
              <div key={index}>{msg}</div>
          ))}
        </div>
        <div className="input-container">
          <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
