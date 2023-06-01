// import logo from './logo.svg';
import "./normal.css";
import "./App.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ppIcon from "./images/chatgpt-icon.png"

function App() {
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("ada");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can I help you today?",
    },
    {
      user: "me",
      message: "I want to use ChatgGpt today",
    },
  ]);
  //clear chats
  function clearChat() {
    setChatLog([]);
  }

  const getEngines = async () => {
    try {
      const res = await axios.get("http://localhost:8000/models");
      console.log(res.data);
      setModels(res.data.models);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEngines();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("\n");
    const response = await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      }),
    });
    const data = await response.json();
    setChatLog([...chatLog, { user: "gpt", message: `${data.message}` }]);
  }

  return (
    <div className="App">
      <aside className="sidemenu" onClick={clearChat}>
        <div className="side-menu-button">
          <span>+</span>
          New chat
        </div>
        <div className="models">
          <select onChange={(e) => setCurrentModel(e.target.value)}>
            <option value={""}>Select Model</option>
            {models.map((model, index) => (
              <option key={model?.id} value={model.id}>
                {model?.id}
              </option>
            ))}
          </select>
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              row="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`chat-message-chatgpt ${(message.user = "gpt" && "chatgpt")}`}
    >
      <div className="chat-message-center">
        <div className={`avatar ${(message.user = "gpt" && "chatgpt")}`}>
          {(message.user = "gpt" && (<img width={41} height={41} src={ppIcon} />))}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default App;
