'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, User, Mail, Phone, Globe, Target, TrendingUp, Calendar, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    created_at: string;
}

interface ChatConversation {
    id: string;
    session_id: string;
    visitor_name: string | null;
    visitor_email: string | null;
    visitor_phone: string | null;
    visitor_business: string | null;
    visitor_website: string | null;
    visitor_city: string | null;
    visitor_goal: string | null;
    status: 'active' | 'lead_captured' | 'closed';
    lead_score: number;
    created_at: string;
    updated_at: string;
    messages?: ChatMessage[];
}

export default function ChatConversationsPage() {
    const [conversations, setConversations] = useState<ChatConversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'lead_captured' | 'closed'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await fetch('/api/admin/chat-conversations');
            const data = await response.json();
            setConversations(data.conversations || []);
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchConversationMessages = async (conversationId: string) => {
        try {
            const response = await fetch(`/api/chat?conversationId=${conversationId}`);
            const data = await response.json();

            setSelectedConversation((prev) =>
                prev ? { ...prev, messages: data.messages } : null
            );
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const selectConversation = (conversation: ChatConversation) => {
        setSelectedConversation(conversation);
        fetchConversationMessages(conversation.id);
    };

    const filteredConversations = conversations
        .filter((conv) => filter === 'all' || conv.status === filter)
        .filter((conv) => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                conv.visitor_name?.toLowerCase().includes(query) ||
                conv.visitor_email?.toLowerCase().includes(query) ||
                conv.visitor_business?.toLowerCase().includes(query) ||
                conv.session_id.toLowerCase().includes(query)
            );
        })
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const getLeadScoreColor = (score: number) => {
        if (score >= 40) return 'text-green-600 bg-green-100';
        if (score >= 20) return 'text-yellow-600 bg-yellow-100';
        return 'text-gray-600 bg-gray-100';
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            active: 'bg-blue-100 text-blue-700',
            lead_captured: 'bg-green-100 text-green-700',
            closed: 'bg-gray-100 text-gray-700',
        };
        return badges[status as keyof typeof badges] || badges.active;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat Conversations</h1>
                    <p className="text-gray-600">Monitor and manage AI chatbot conversations</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Chats</p>
                                <p className="text-2xl font-bold text-gray-900">{conversations.length}</p>
                            </div>
                            <MessageCircle className="w-10 h-10 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {conversations.filter((c) => c.status === 'active').length}
                                </p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Leads Captured</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {conversations.filter((c) => c.status === 'lead_captured').length}
                                </p>
                            </div>
                            <Target className="w-10 h-10 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Avg Lead Score</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {Math.round(
                                        conversations.reduce((sum, c) => sum + c.lead_score, 0) / conversations.length || 0
                                    )}
                                </p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, business..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {(['all', 'active', 'lead_captured', 'closed'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === status
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Conversations List */}
                    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-900">Conversations ({filteredConversations.length})</h2>
                        </div>
                        <div className="overflow-y-auto max-h-[600px]">
                            {filteredConversations.map((conversation) => (
                                <motion.div
                                    key={conversation.id}
                                    whileHover={{ backgroundColor: '#f9fafb' }}
                                    onClick={() => selectConversation(conversation)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {conversation.visitor_name || conversation.visitor_email || 'Anonymous'}
                                            </p>
                                            {conversation.visitor_business && (
                                                <p className="text-sm text-gray-600">{conversation.visitor_business}</p>
                                            )}
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeadScoreColor(conversation.lead_score)}`}>
                                            {conversation.lead_score}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(conversation.status)}`}>
                                            {conversation.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {new Date(conversation.created_at).toLocaleString()}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Conversation Details */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        {selectedConversation ? (
                            <>
                                {/* Visitor Info */}
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Conversation Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedConversation.visitor_name && (
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">Name:</span>
                                                <span className="text-sm font-medium text-gray-900">{selectedConversation.visitor_name}</span>
                                            </div>
                                        )}
                                        {selectedConversation.visitor_email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">Email:</span>
                                                <span className="text-sm font-medium text-gray-900">{selectedConversation.visitor_email}</span>
                                            </div>
                                        )}
                                        {selectedConversation.visitor_phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">Phone:</span>
                                                <span className="text-sm font-medium text-gray-900">{selectedConversation.visitor_phone}</span>
                                            </div>
                                        )}
                                        {selectedConversation.visitor_website && (
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">Website:</span>
                                                <span className="text-sm font-medium text-gray-900">{selectedConversation.visitor_website}</span>
                                            </div>
                                        )}
                                        {selectedConversation.visitor_goal && (
                                            <div className="flex items-center gap-2">
                                                <Target className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">Goal:</span>
                                                <span className="text-sm font-medium text-gray-900">{selectedConversation.visitor_goal}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="p-6 overflow-y-auto max-h-[500px]">
                                    <h3 className="font-semibold text-gray-900 mb-4">Messages</h3>
                                    <div className="space-y-4">
                                        {selectedConversation.messages?.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === 'user'
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                        {new Date(message.created_at).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full p-12">
                                <div className="text-center">
                                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Select a conversation to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
