import React, { useState, useEffect } from "react";
import SocketIO from "socket.io-client";

import logo from "./logo.svg";
import "./App.css";

const serverUrl = "http://localhost:4000";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = SocketIO(serverUrl);

    socket.on("chatting", (msg) => {
      setMessages((prevState) => [msg, ...prevState]);
    });

    return () => socket.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = SocketIO(serverUrl);

    socket.emit("chatting", inputValue);
    setInputValue("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {messages.map((msg, i) => {
          return (
            <div key={i}>
              <p>{msg}</p>
            </div>
          );
        })}

        <form onSubmit={handleSubmit}>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
