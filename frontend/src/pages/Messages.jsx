import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Avatar, IconButton, TextField, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { fetchConversations, fetchMessages } from '../api';

const socket = io('http://localhost:5001');

function Messages() {
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const currentUser = JSON.parse(localStorage.getItem('profile'))?.user;

    useEffect(() => {
        fetchConversations().then(res => setConversations(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedChat) {
            fetchMessages(selectedChat._id).then(res => setMessages(res.data)).catch(console.error);
            socket.emit('join_room', selectedChat._id);
        }
    }, [selectedChat]);

    useEffect(() => {
        socket.on('receive_message', (message) => {
            if (message.conversationId === selectedChat?._id) {
                setMessages(prev => [...prev, message]);
            }
            // Update last message in conversation list
            setConversations(prev => prev.map(conv => conv._id === message.conversationId ? { ...conv, lastMessage: message.text } : conv));
        });
        return () => socket.off('receive_message');
    }, [selectedChat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat) return;

        const messageData = {
            conversationId: selectedChat._id,
            sender: currentUser.id,
            text: newMessage
        };

        socket.emit('send_message', messageData);
        setNewMessage("");
    };

    return (
        <div className="flex h-[calc(100vh-80px)] bg-white border border-gray-200 rounded-xl overflow-hidden m-4 shadow-sm">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-100 flex flex-col">
                <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                    <Typography variant="h6" className="!font-bold">{currentUser?.username}</Typography>
                </div>
                <List className="flex-1 overflow-y-auto hide-scrollbar">
                    {conversations.map(conv => {
                        const otherUser = conv.participants.find(p => p._id !== currentUser.id);
                        return (
                            <ListItem 
                                key={conv._id} 
                                button 
                                onClick={() => setSelectedChat(conv)}
                                selected={selectedChat?._id === conv._id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <ListItemAvatar>
                                    <Avatar src={otherUser?.profilePic} />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={otherUser?.username} 
                                    secondary={conv.lastMessage}
                                    primaryTypographyProps={{ className: "!text-sm !font-semibold" }}
                                    secondaryTypographyProps={{ className: "!text-xs truncate" }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar src={selectedChat.participants.find(p => p._id !== currentUser.id)?.profilePic} className="w-8 h-8" />
                                <Typography className="!font-bold !text-sm">{selectedChat.participants.find(p => p._id !== currentUser.id)?.username}</Typography>
                            </div>
                            <IconButton size="small"><InfoOutlinedIcon /></IconButton>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-gray-50/10">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                                        msg.sender === currentUser.id 
                                        ? 'bg-pink-600 text-white rounded-br-none' 
                                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1">
                                <TextField
                                    fullWidth
                                    placeholder="Message..."
                                    variant="standard"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    InputProps={{ disableUnderline: true, className: "!text-sm" }}
                                />
                                <IconButton type="submit" size="small" className={newMessage.trim() ? "!text-pink-600" : "!text-gray-300"}>
                                    <SendIcon fontSize="small" />
                                </IconButton>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                        <div className="p-6 rounded-full border-2 border-black">
                            <SendIcon sx={{ fontSize: 40 }} />
                        </div>
                        <div>
                            <Typography variant="h6" className="!font-bold">Your Messages</Typography>
                            <Typography variant="body2" className="text-gray-500">Send private photos and messages to a friend.</Typography>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages;
