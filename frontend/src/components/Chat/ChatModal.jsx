import React, { useEffect, useState, useRef, useContext } from "react";
import { io } from "socket.io-client";
import './ChatModal.css';
import axios from "axios";
import { Context } from "../../main";

const ChatModal = ({ chatInfo, onClose }) => {
  const { user } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef(null);
  const messagesDomRef = useRef(null);
  const messagesDataRef = useRef([]);

  useEffect(() => {
    let mounted = true;
    const fetchHistoryAndConnect = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/get?employerId=${chatInfo.employerId}&jobSeekerId=${chatInfo.jobSeekerId}`, { withCredentials: true });
        if (!mounted) return;
        if (res.data.chat && res.data.chat.messages) {
          // preserve server message objects (including _id) and dedupe by _id
          const uniqueById = [];
          for (const m of res.data.chat.messages) {
            if (m._id) {
              if (!uniqueById.find(u => String(u._id) === String(m._id))) uniqueById.push(m);
            } else {
              // fallback: dedupe by sender+text+timestamp
              const key = `${String(m.senderId)}::${m.text}::${new Date(m.timestamp).toISOString()}`;
              if (!uniqueById.find(u => `${String(u.senderId)}::${u.text}::${new Date(u.timestamp).toISOString()}` === key)) uniqueById.push(m);
            }
          }
          setMessages(uniqueById);
        }

        // connect socket once
        if (!socketRef.current) {
          socketRef.current = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket'] });
        }

        // remove any previous listener to avoid duplicates
        socketRef.current.off("receiveMessage");
        socketRef.current.emit("joinChat", { employerId: chatInfo.employerId, jobSeekerId: chatInfo.jobSeekerId });
        socketRef.current.on("receiveMessage", ({ chatId, message }) => {
          // dedupe incoming message by _id if available, otherwise fallback to text+timestamp+sender
          let exists = false;
          if (message._id) {
            exists = messagesDataRef.current && messagesDataRef.current.some(m => m._id && String(m._id) === String(message._id));
          }
          if (!exists) {
            exists = messagesDataRef.current && messagesDataRef.current.some(m => String(m.senderId) === String(message.senderId) && m.text === message.text && new Date(m.timestamp).toISOString() === new Date(message.timestamp).toISOString());
          }
          if (!exists) {
            setMessages(prev => [...prev, message]);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistoryAndConnect();

    return () => {
      mounted = false;
      if (socketRef.current) {
        try { socketRef.current.off("receiveMessage"); } catch (e) {}
        try { socketRef.current.disconnect(); } catch (e) {}
        socketRef.current = null;
      }
    };
  }, [chatInfo]);

  useEffect(() => {
    if (messagesDomRef.current) messagesDomRef.current.scrollTop = messagesDomRef.current.scrollHeight;
    // keep a current copy for dedupe checks
    messagesDataRef.current = messages;
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const payload = { employerId: chatInfo.employerId, jobSeekerId: chatInfo.jobSeekerId, senderId: user._id, text };
    // emit via socket
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("sendMessage", payload);
      setText("");
    } else {
      // fallback: try to post message via REST (optional)
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/message/${chatInfo.chatId}`, { senderId: user._id, text }, { withCredentials: true });
        setText("");
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }
    // optimistic update handled via receiveMessage when saved by server
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <h4>Chat</h4>
          <button onClick={onClose}>X</button>
        </div>
  <div className="chat-messages" ref={messagesDomRef}>
          {messages.map((m, idx) => (
            <div key={m._id || `${String(m.senderId)}_${new Date(m.timestamp).getTime()}_${idx}`} className={String(m.senderId) === String(user._id) ? "bubble sender" : "bubble receiver"}>
              <div className="text">{m.text}</div>
              <div className="time">{new Date(m.timestamp).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
