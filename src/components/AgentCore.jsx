import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Send, Cpu } from 'lucide-react';

const AgentCore = ({ activeRole }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'system', text: 'SYSTEM: Agent Core initialized.' },
        { type: 'bot', text: `Hello. I am the AI Assistant for ${activeRole.label}. How can I help you explore this profile?` }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        setMessages(prev => [...prev, { type: 'user', text: input }]);
        const userQuery = input;
        setInput('');

        // Simulate a thinking delay then responding
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                type: 'bot', 
                text: `Executing query for: "${userQuery}". As a ${activeRole.label}, my knowledge base is currently restricted to this resume domain.` 
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-mono">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`mb-4 w-80 sm:w-96 rounded-2xl border ${activeRole.borderFocusClass} overflow-hidden shadow-2xl glass-panel p-0`}
                        style={{ boxShadow: `0 0 30px ${activeRole.glowColor}` }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <div className="flex items-center gap-2">
                                <Terminal size={18} className={activeRole.accentClass} />
                                <span className="font-bold text-sm tracking-widest text-white">AGENT_CORE_v1.0</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="h-64 md:h-80 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-thin scrollbar-thumb-white/10">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`text-sm ${msg.type === 'user' ? 'self-end text-right' : 'self-start'} max-w-[85%]`}>
                                    <span className={`inline-block px-3 py-2 rounded-lg ${
                                        msg.type === 'system' ? 'text-slate-500 text-xs uppercase tracking-wider' :
                                        msg.type === 'user' ? 'bg-white/10 text-white rounded-br-none' :
                                        `${activeRole.accentClass} bg-black/40 border border-white/5 rounded-bl-none`
                                    }`}>
                                        {msg.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
                            <span className={activeRole.accentClass}>{'>'}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter query..."
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm focus:ring-0"
                            />
                            <button type="submit" className={`p-1.5 rounded-lg text-slate-400 hover:${activeRole.accentClass} transition-colors`}>
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${activeRole.gradient} text-white shadow-lg cursor-pointer ml-auto`}
                style={{ boxShadow: `0 0 20px ${activeRole.glowColor}` }}
            >
                {isOpen ? <X size={24} /> : <Cpu size={24} />}
            </motion.button>
        </div>
    );
};

export default AgentCore;
