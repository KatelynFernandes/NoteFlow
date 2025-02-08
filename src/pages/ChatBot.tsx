import React, { useState } from "react";
import { useRouter } from "next/router"; // For Next.js navigation
import "../styles/ChatBot.css";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const router = useRouter(); // Hook for navigation

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">ChatBot</div>

      {/* Messages Section */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>

      {/* Back to Homepage Button */}
      <button className="back-home-button" onClick={() => router.push("/")}>
        Back to Homepage
      </button>
    </div>
  );
};

export default ChatBot;


