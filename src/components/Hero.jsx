import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Download, Terminal, Database, LineChart } from 'lucide-react';

const Hero = ({ activeRole, setActiveRole, ROLES }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 pb-10">
            {/* Background Glow Aura */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000"
                style={{ backgroundColor: activeRole.glowColor }}
            />

            <div className="container mx-auto px-4 max-w-6xl relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Headline & Details */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="inline-block mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-slate-400">
                        Status: <span className="text-emerald-400">Operational</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white"
                        style={{ lineHeight: 1.1 }}
                    >
                        Mohammed B.<br />Dela Cruz
                    </motion.h1>

                    <motion.h2
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-slate-400 mb-8 font-mono"
                    >
                        Executing sequence as <span className={`font-bold ${activeRole.accentClass}`}>{activeRole.label}</span>...
                    </motion.h2>

                    {/* Contact Info (Values Preserved) */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-10 text-slate-300 font-mono text-sm">
                        <a href="mailto:mohammeddelacruz712@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                            <Mail size={18} className={activeRole.accentClass} />
                            <span>mohammeddelacruz712@gmail.com</span>
                        </a>
                        <div className="flex items-center gap-3">
                            <MapPin size={18} className={activeRole.accentClass} />
                            <span>General Trias City, Cavite</span>
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                        <a
                            href="https://www.linkedin.com/in/mohammeddelacruz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-panel py-3 px-6 flex items-center gap-2 hover:-translate-y-1 transition-transform font-mono text-sm group"
                        >
                            <Linkedin size={18} className="text-slate-400 group-hover:text-blue-400" />
                            <span>LinkedIn_Profile</span>
                        </a>

                        <button
                            className={`py-3 px-6 rounded-2xl flex items-center gap-2 text-white font-mono text-sm font-bold bg-gradient-to-r ${activeRole.gradient} hover:-translate-y-1 transition-transform shadow-lg border-none cursor-pointer`}
                            style={{ boxShadow: `0 4px 20px ${activeRole.glowColor}` }}
                        >
                            <Download size={18} />
                            <span>Initialize_Download</span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right Side: Identity Switcher & Interactive Role Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="glass-panel p-8 w-full max-w-md mx-auto aspect-square flex flex-col relative overflow-hidden group">
                        {/* Background subtle grid pattern */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

                        <div className="relative z-10 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-mono text-sm uppercase text-slate-400 tracking-widest">Select Identity</h3>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mb-auto">
                                <RoleOption
                                    role={ROLES.AI_DEV}
                                    activeRole={activeRole}
                                    onClick={() => setActiveRole(ROLES.AI_DEV)}
                                    icon={<Terminal size={20} />}
                                />
                                <RoleOption
                                    role={ROLES.DATA_ENG}
                                    activeRole={activeRole}
                                    onClick={() => setActiveRole(ROLES.DATA_ENG)}
                                    icon={<Database size={20} />}
                                />
                                <RoleOption
                                    role={ROLES.BI_DEV}
                                    activeRole={activeRole}
                                    onClick={() => setActiveRole(ROLES.BI_DEV)}
                                    icon={<LineChart size={20} />}
                                />
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 font-mono text-xs text-slate-500 text-center">
                                SYSTEM_ACTIVE // OVERLAY_LINK_SECURE
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Subcomponent for the toggle buttons
const RoleOption = ({ role, activeRole, onClick, icon }) => {
    const isActive = activeRole.id === role.id;
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 font-mono text-sm cursor-pointer ${isActive
                    ? `bg-white/10 text-white shadow-lg`
                    : 'bg-transparent text-slate-400 hover:bg-white/5 border-white/5'
                }`}
            style={isActive ? { borderColor: activeRole.glowColor.replace('0.15', '0.5'), boxShadow: `0 0 15px ${activeRole.glowColor}` } : {}}
        >
            <div className={`p-2 rounded-lg ${isActive ? `bg-white/10 ${role.accentClass}` : 'bg-white/5'}`}>
                {icon}
            </div>
            <span className="font-bold tracking-wide">{role.label}</span>
            {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-current animate-pulse opacity-100" />}
        </button>
    );
};

export default Hero;

