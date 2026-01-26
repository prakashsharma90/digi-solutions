'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Minimize2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [hasNewMessage, setHasNewMessage] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = {
            id: `msg_${Date.now()}`,
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    message: content.trim(),
                    conversationId,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setConversationId(data.conversationId);

                const assistantMessage: Message = {
                    id: `msg_${Date.now()}_ai`,
                    role: 'assistant',
                    content: data.response,
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, assistantMessage]);

                // Show notification if chat is minimized
                if (isMinimized || !isOpen) {
                    setHasNewMessage(true);
                }
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error: any) {
            console.error('Failed to send message:', error);
            const errorMessage: Message = {
                id: `msg_${Date.now()}_error`,
                role: 'assistant',
                content: error.message || 'Sorry, I encountered an error. Please try again or contact us directly.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const openChat = () => {
        setIsOpen(true);
        setIsMinimized(false);
        setHasNewMessage(false);

        // Send initial greeting if no messages
        if (messages.length === 0) {
            setTimeout(() => {
                sendMessage('Hello');
            }, 500);
        }
    };

    const closeChat = () => {
        setIsOpen(false);
        setIsMinimized(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
        if (isMinimized) {
            setHasNewMessage(false);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openChat}
                        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                        aria-label="Open chat"
                    >
                        <MessageCircle className="w-6 h-6" />
                        {hasNewMessage && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? '60px' : '600px'
                        }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ maxHeight: '90vh' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Digihub Assistant</h3>
                                    <p className="text-xs text-white/80">Your Digital Growth Consultant</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleMinimize}
                                    className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                                    aria-label="Minimize chat"
                                >
                                    <Minimize2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={closeChat}
                                    className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                    : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                                    {message.content}
                                                </p>
                                                <p
                                                    className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                                                        }`}
                                                >
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                                    <span className="text-sm text-gray-600">Typing...</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="submit"
                                            disabled={!inputValue.trim() || isLoading}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                                            aria-label="Send message"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 text-center">
                                        Powered by Digihub AI • We typically reply in seconds
                                    </p>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
