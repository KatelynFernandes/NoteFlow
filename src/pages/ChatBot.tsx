"use client"; // Required for Next.js client components


import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct for Next.js App Router
import styles from "../styles/ChatBot.module.css"; // Import CSS Module


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
   <div className={styles.chatContainer}>
     {/* Header */}
     <div className={styles.chatHeader}>ChatBot</div>


     {/* Messages Section */}
     <div className={styles.chatMessages}>
       {messages.map((msg, index) => (
         <div
           key={index}
           className={`${styles.message} ${
             msg.sender === "user" ? styles.userMessage : styles.botMessage
           }`}
         >
           {msg.text}
         </div>
       ))}
     </div>


     {/* Input Section */}
     <div className={styles.chatInputContainer}>
       <input
         type="text"
         className={styles.chatInput}
         placeholder="Type your message..."
         value={input}
         onChange={(e) => setInput(e.target.value)}
       />
       <button className={styles.sendButton} onClick={handleSendMessage}>
         Send
       </button>
     </div>


     {/* Back to Homepage Button */}
     <button
       className={styles.backHomeButton}
       onClick={() => router.push("/")}
     >
       Back to Homepage
     </button>
   </div>
 );
};


export default ChatBot;