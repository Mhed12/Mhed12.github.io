import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = ({ activeRole }) => {
    return (
        <section id="education" className="py-20 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-4">
                    <GraduationCap className={activeRole?.accentClass || 'text-purple-400'} size={32} />
                    <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-white uppercase">Academic_Background</h2>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
            </motion.div>

            <motion.div
                className="glass-panel p-8 md:p-12 border border-white/5 relative overflow-hidden group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                {/* Background Accent */}
                <div 
                    className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: activeRole?.glowColor || 'rgba(139, 92, 246, 0.5)' }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10 text-center md:text-left">
                    <div className={`p-8 rounded-3xl bg-gradient-to-br ${activeRole?.gradient || 'from-purple-500 to-indigo-600'} shadow-2xl shrink-0 transition-transform duration-500 group-hover:scale-105`}
                         style={{ boxShadow: `0 10px 40px ${activeRole?.glowColor || 'rgba(139, 92, 246, 0.3)'}` }}>
                        <GraduationCap size={56} className="text-white" />
                    </div>

                    <div className="flex-1 mt-2">
                        <div className="inline-block px-3 py-1 rounded bg-black/40 border border-white/5 text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-5">
                            Status: <span className="text-emerald-400 font-bold">Graduated</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight tracking-wide">
                            Ateneo de Naga University
                        </h3>
                        <p className={`text-xl md:text-2xl font-mono mb-6 ${activeRole?.accentClass || 'text-purple-400'}`}>
                            Bachelor of Science in Information Technology
                        </p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-slate-400 font-mono text-sm bg-black/40 inline-flex px-4 py-2 rounded-xl border border-white/5">
                            <span>Ateneo Avenue, Naga City, Camarines Sur</span>
                            <span className="hidden md:inline text-white/20">•</span>
                            <span>2019</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Education;
