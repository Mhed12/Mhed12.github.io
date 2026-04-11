import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Send, Cpu, Loader, ChevronDown } from 'lucide-react';

// API key is strictly loaded from the environment
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// ─────────────────────────────────────────────
// Resume knowledge base injected as system prompt
// ─────────────────────────────────────────────
const RESUME_SYSTEM_PROMPT = `You are an AI assistant embedded in Mohammed B. Dela Cruz's interactive resume. 
Your ONLY job is to answer questions about Mohammed's professional background, skills, and experiences.
Keep responses concise (2–4 sentences max) and conversational. Use a slightly technical, professional tone that fits the dark industrial UI of this resume.
If asked something unrelated to Mohammed's profile, politely redirect.

=== MOHAMMED B. DELA CRUZ — RESUME DATA ===

CONTACT:
- Email: mohammeddelacruz712@gmail.com
- Location: General Trias City, Cavite, Philippines
- LinkedIn: linkedin.com/in/mohammeddelacruz/
- GitHub: github.com/Mhed12

CURRENT ROLE:
- AI/ML Computational Science Sr Analyst at Accenture Inc. (Oct 2025 – Present)
  • Architecting and developing autonomous AI agent systems to optimize complex enterprise workflows
  • Designing and implementing scalable agents using Google ADK and Python
  • Integrating LLMs with Function Calling (Tool Use) to automate multi-step business processes
  • Architecting Retrieval-Augmented Generation (RAG) pipelines for dynamic domain knowledge
  • Implementing agent memory, reasoning mechanisms, and safety guardrails

WORK EXPERIENCE:
1. Junior Reports Developer — Viventis Interim Inc. (Deployed at Schneider Electric) | Jan 2023 – Oct 2025
   • Developed Tableau Dashboard Templates used by global teams
   • Built and maintained reports using Tableau, SSIS, Databricks, Microsoft SQL Server
   • Collaborated with cross-functional teams for data requirements
   • Designed and Data Engineered the sustainability dashboards for Schneider Electric

2. Technical Staff (Job Order) — TESDA | Jan 2020 – Dec 2022
   • Upgraded monitoring systems from spreadsheets to automated reporting with data viz
   • Deployed TESDA TVET Partnership Monitoring System (TTPMS) v3
   • Maintained PLO database and monitored 7 Delivery Modes under EBT Program
   • Created Google Data Studio reports for TESDA Partnership

3. Junior Web Developer (Intern) — Ateneo de Naga University | Nov 2018 – Mar 2019
   • Full-stack web development using Bootstrap, PHP, MySQL
   • Designed and implemented database systems

EDUCATION:
- Bachelor of Science in Information Technology
- Ateneo de Naga University, Naga City, Camarines Sur | Graduated 2019

TECHNICAL SKILLS:
- AI & Agent Automation: Python, Google ADK, Autonomous Agents, RAG, Function Calling, LLM Integration, Prompt Engineering, API Integration
- Data & BI: Tableau, Databricks, SSIS, Google Data Studio, Excel, Tableau Prep
- Data Analysis: ETL Processes, Reporting, Business Intelligence, Data Visualization
- Databases: SQL, T-SQL, Microsoft SQL Server, MySQL
- Web: PHP, HTML/CSS, Bootstrap
- Currently active in: AI Agent Automation Development

PROFESSIONAL IDENTITIES (roles he can present):
1. AI Agent Automation Developer — focused on Google ADK, Python, Autonomous Agents, RAG, Function Calling, LLM Integration
2. Data Engineer — focused on Databricks, SSIS, SQL, ETL
3. BI Developer — focused on Tableau, reporting, data visualization
===`;

// ─────────────────────────────────────────────
// Suggested quick-reply prompts
// ─────────────────────────────────────────────
const QUICK_PROMPTS = [
  "What's his current role?",
  "What tools does he know?",
  "Tell me about his Tableau work",
  "What AI skills does he have?",
];

const callGemini = async (contents, apiKey, attempt = 0) => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: RESUME_SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
    }),
  });

  // Retry on 429 (rate limit) with exponential backoff — max 3 attempts
  if (response.status === 429 && attempt < 3) {
    const waitMs = 2000 * Math.pow(2, attempt); // 2s, 4s, 8s
    await new Promise((res) => setTimeout(res, waitMs));
    return callGemini(contents, apiKey, attempt + 1);
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit reached. Please wait a moment and try again.");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const AgentCore = ({ activeRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Agent Core online. I have full access to Mohammed's profile — ask me anything about his experience, skills, or background.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

  const sendMessage = useCallback(async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    setInput('');
    setShowQuick(false);
    setMessages((prev) => [...prev, { type: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const apiKey = GEMINI_API_KEY;

      // Build message history for the Gemini API
      const contents = messages
        .filter((m) => m.type === 'user' || m.type === 'bot')
        .map((m) => ({
          role: m.type === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      // Append the new user message
      contents.push({ role: 'user', parts: [{ text: userText }] });

      const data = await callGemini(contents, apiKey);
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Signal lost. Please try again.";

      setMessages((prev) => [...prev, { type: 'bot', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: error.message || 'Connection error. Please check your network and try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleQuickCommand = useCallback((prompt) => sendMessage(prompt), [sendMessage]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    sendMessage();
  }, [sendMessage]);

  // Accent colors derived from activeRole
  const { accent, gradient, glow } = useMemo(() => ({
    accent: activeRole?.accentClass || 'text-purple-400',
    gradient: activeRole?.gradient || 'from-purple-500 to-indigo-600',
    glow: activeRole?.glowColor || 'rgba(139, 92, 246, 0.15)'
  }), [activeRole]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="mb-4 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(10, 10, 14, 0.92)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: `0 0 40px ${glow}, 0 20px 60px rgba(0,0,0,0.5)`,
            }}
          >
            {/* ── Header ── */}
            <div
              className="px-4 py-3 flex justify-between items-center"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}
                  style={{ boxShadow: `0 0 10px ${glow}` }}
                >
                  <Terminal size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold tracking-widest uppercase">Agent Core</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-[10px] tracking-wider">ONLINE</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            {/* ── Messages ── */}
            <div
              className="h-72 sm:h-80 overflow-y-auto p-4 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'bot' && (
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 mr-2 mt-0.5`}
                    >
                      <Cpu size={10} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-white/10 text-white rounded-br-sm'
                        : 'text-slate-200 rounded-bl-sm'
                    }`}
                    style={
                      msg.type === 'bot'
                        ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-center gap-2"
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}
                  >
                    <Cpu size={10} className="text-white" />
                  </div>
                  <div
                    className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Prompts ── */}
            <AnimatePresence>
              {showQuick && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-3"
                >
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Quick queries</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleQuickCommand(prompt)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer ${accent} hover:bg-white/5`}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input ── */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 flex items-center gap-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)' }}
            >
              <span className={`${accent} text-sm select-none`}>›</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Mohammed…"
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-slate-600 disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isLoading}
                whileTap={{ scale: 0.9 }}
                className={`p-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  input.trim() && !isLoading ? `${accent} hover:bg-white/10` : 'text-slate-600'
                }`}
              >
                {isLoading ? <Loader size={15} className="animate-spin" /> : <Send size={15} />}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Toggle Button ── */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleOpen}
        className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${gradient} text-white shadow-xl cursor-pointer ml-auto relative`}
        style={{ boxShadow: `0 0 24px ${glow}, 0 4px 20px rgba(0,0,0,0.4)` }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="cpu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Cpu size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread pulse dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0c] animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};

export default React.memo(AgentCore);
