import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { WidgetCard } from './DashboardWidgets';

const MessagingCorner = ({ user, className = "" }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey! Anyone doing a grocery run today?", sender: "Sarah", avatar: "Sarah", time: "10:30 AM", isMe: false },
        { id: 2, text: "I am! Need anything?", sender: "Mike", avatar: "Mike", time: "10:32 AM", isMe: false },
        { id: 3, text: "Yeah, could you grab some milk? 🥛", sender: "Sarah", avatar: "Sarah", time: "10:33 AM", isMe: false },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: Date.now(),
            text: newMessage,
            sender: user?.name?.split(' ')[0] || "Me",
            avatar: user?.name || "Me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        setMessages([...messages, message]);
        setNewMessage("");
    };

    return (
        <WidgetCard title="Roommate Chat" icon={MessageSquare} color="violet" className={`h-[400px] flex flex-col ${className}`}>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-violet-200 hover:scrollbar-thumb-violet-300 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.avatar}`}
                            alt={msg.sender}
                            className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0"
                        />
                        <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                            <div className={`px-3 py-2 rounded-2xl text-sm ${msg.isMe
                                ? 'bg-violet-500 text-white rounded-tr-none'
                                : 'bg-gray-100 text-gray-700 rounded-tl-none'
                                }`}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 px-1">
                                {msg.sender} • {msg.time}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                />
                <button
                    type="submit"
                    className="p-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 active:scale-95 transition-all shadow-sm shadow-violet-200"
                >
                    <Send size={18} />
                </button>
            </form>
        </WidgetCard>
    );
};

export default MessagingCorner;
