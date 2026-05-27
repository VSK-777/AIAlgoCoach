import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axiosConfig';
import { Bot, Send, Sparkles, User as UserIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AiInsights = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [recommendations, setRecommendations] = useState('');
    const [loadingRecs, setLoadingRecs] = useState(true);
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', content: "Hi! I'm AIAlgoCoach. I have analyzed your Codeforces profile. Ask me anything about your practice strategy!" }
    ]);
    const [message, setMessage] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!user.codeforcesHandle) return;
            try {
                const res = await api.get(`/ai/recommendations/${user.codeforcesHandle}`);
                setRecommendations(res.data.content);
            } catch (err) {
                setRecommendations('Failed to load recommendations. Please try again later.');
            } finally {
                setLoadingRecs(false);
            }
        };
        fetchRecommendations();
    }, [user.codeforcesHandle]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg = message.trim();
        setMessage('');
        setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
        setChatLoading(true);

        try {
            const res = await api.post(`/ai/chat/${user.codeforcesHandle}`, { message: userMsg });
            setChatHistory(prev => [...prev, { role: 'ai', content: res.data.content }]);
        } catch (err) {
            setChatHistory(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
            {/* Recommendations Panel */}
            <div className="glass-card flex flex-col h-full overflow-hidden">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">AI Analysis & Roadmap</h2>
                        <p className="text-sm text-slate-500">Personalized strategy based on your profile</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-4">
                    {loadingRecs ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                            <p className="text-slate-500 animate-pulse">Generating your personalized roadmap...</p>
                        </div>
                    ) : (
                        <div className="prose prose-slate prose-headings:text-slate-800 prose-a:text-primary max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{recommendations}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>

            {/* Interactive Chat Panel */}
            <div className="glass-card flex flex-col h-full overflow-hidden">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">AI Mentor Chat</h2>
                        <p className="text-sm text-slate-500">Ask specific questions about your weak topics</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4 mb-4">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary text-white'
                            }`}>
                                {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                                msg.role === 'user' 
                                    ? 'bg-primary text-white rounded-tr-none' 
                                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                            }`}>
                                <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'}`}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    {chatLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
                                <Bot size={16} />
                            </div>
                            <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-100 border border-slate-200">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="relative mt-auto">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask AIAlgoCoach..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-4 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-inner text-slate-700"
                        disabled={chatLoading}
                    />
                    <button 
                        type="submit"
                        disabled={!message.trim() || chatLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AiInsights;
