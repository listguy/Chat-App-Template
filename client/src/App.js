import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const randomNumber = Math.random() * 20;
    setUser("Guest#" + randomNumber);
    setInterval(async () => {
      const { data } = await axios.get("/messages");
      // console.log(data);
      setMessages(data);
    }, 1000);
  }, []);

  const postMessage = (e) => {
    console.log("!");
    axios.post("/messages", { body: inputValue, user: user });
    e.preventDefault();
    setInputValue("");
  };
  return (
    <div>
      <form onSubmit={postMessage}>
        <input
          id="messageInput"
          required={true}
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
        />
        <button id="sendButton" type="submit">
          {"Send"}
        </button>
        <input
          id="changeUserInput"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <div id="messagesContainer">
          {messages.map((mes, i) => (
            <div
              className={mes.user === user ? "my-msg msg" : "other-msg msg"}
              key={i}
            >
              <div>
                {mes.user === user ? <strong>{mes.user}</strong> : mes.user}
              </div>
              <div>{mes.body}</div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default App;
