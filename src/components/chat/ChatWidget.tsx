
"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Hello! I am the Digihub AI assistant. How can I help you today with our services or pricing?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    // Initialize session on first open
    useEffect(() => {
        if (isOpen && !sessionId) {
            const initSession = async () => {
                try {
                    const res = await fetch('/api/v1/sessions', {
                        method: 'POST',
                        body: JSON.stringify({ channel: 'web' }),
                    });
                    const data = await res.json();
                    if (data.session_id) {
                        setSessionId(data.session_id);
                    }
                } catch (error) {
                    console.error('Failed to init session:', error);
                }
            };
            initSession();
        }
    }, [isOpen, sessionId]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        let currentSessionId = sessionId;

        if (!currentSessionId) {
            console.log("No session ID, attempting to initialize...");
            try {
                const res = await fetch('/api/v1/sessions', {
                    method: 'POST',
                    body: JSON.stringify({ channel: 'web' }),
                });
                const data = await res.json();
                if (data.session_id) {
                    setSessionId(data.session_id);
                    currentSessionId = data.session_id;
                } else {
                    console.error("Failed to recover session:", data);
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: "I'm having trouble connecting to the server. Please refresh the page."
                    }]);
                    return;
                }
            } catch (err) {
                console.error("Session init error:", err);
                return;
            }
        }

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue.trim()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/v1/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: currentSessionId,
                    message: userMsg.content
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Chat API Error:", errorData);
                throw new Error(errorData.details || "Failed to send message");
            }

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botResponse = '';
            const botMsgId = (Date.now() + 1).toString();

            // Add empty bot message to start streaming into
            setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const text = decoder.decode(value, { stream: true });
                botResponse += text;

                // Strip [[LEAD_DATA:...]] from displayed content in real-time
                const cleanContent = botResponse.replace(/\[\[LEAD_DATA:[\s\S]*?\]\]/g, '').trim();

                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === botMsgId ? { ...msg, content: cleanContent } : msg
                    )
                );
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again later."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5" />
                                <h3 className="font-semibold text-sm">Digihub Assistant</h3>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-primary-foreground hover:bg-primary/20 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <Minimize2 className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30" ref={scrollRef}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-max max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                        msg.role === 'user'
                                            ? "ml-auto bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground"
                                    )}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="flex items-center gap-1.5 mb-0.5 opacity-70 text-[10px] uppercase font-bold tracking-wider">
                                            <Bot className="w-3 h-3" /> AI
                                        </div>
                                    )}
                                    <div className="whitespace-pre-wrap">{msg.content.replace(/\[\[LEAD_DATA:[\s\S]*?\]\]/g, '').trim()}</div>
                                </div>
                            ))}
                            {isTyping && messages[messages.length - 1].role === 'user' && (
                                <div className="flex w-max max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted text-foreground">
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-xs opacity-70">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-background shrink-0">
                            <form
                                onSubmit={handleSendMessage}
                                className="flex items-center gap-2"
                            >
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1"
                                    disabled={isTyping}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!inputValue.trim() || isTyping}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center pointer-events-auto hover:bg-primary/90 transition-colors"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
