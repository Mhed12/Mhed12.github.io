import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, Database } from 'lucide-react';

const experiences = [
    {
        id: 1,
        role: "AI/ML Computational Science Sr Analyst",
        company: "Accenture Inc.",
        period: "Oct 2025 - Present",
        description: "Developing Agentic AI Solutions using Google ADK & Python. Leveraging advanced computational science techniques to drive innovation.",
        details: [
            "Design and implement AI agents using Google Agent Development Kit (ADK).",
            "Develop robust Python-based solutions for Agentic AI Solutions.",
            "Collaborate with cross-functional teams to integrate APIs and AI models into business processes.",
            "Optimize algorithms for performance and scalability."
        ]
    },
    {
        id: 2,
        role: "Junior Reports Developer",
        company: "Viventis Interim Inc. (Deployed at Schneider Electric)",
        period: "Jan 2023 – Oct 2025",
        description: "Crucial tool development for Global teams using Tableau, SSIS, Databricks, and SQL Server.",
        details: [
            "Developed a Tableau Dashboard Template, serving as a crucial tool for both the Global team and other departments.",
            "Proficiently developing and consistently maintaining reports using Tableau, SSIS, Databricks, and Microsoft SQL Server.",
            "Demonstrating strong teamwork by collaborating with cross-functional teams to gather requirements.",
            "Prioritizing data accuracy and report aesthetics to empower well-informed decision-making processes.",
            "Designed and Data Engineered the Tableau Dashboard for Schneider Electric, supporting their sustainability initiatives."
        ]
    },
    {
        id: 3,
        role: "Technical Staff (Job Order)",
        company: "Technical Education and Skills Development Authority (TESDA)",
        period: "Jan 2020 – Dec 2022",
        description: "Managed monitoring systems and automated reporting for TESDA Partnership.",
        details: [
            "Improved the Monitoring Systems of TESDA Partnership from Spreadsheet tables to Automized reporting with data visualization.",
            "Deployed the Harmonized TESDA TVET Partnership Monitoring System (TTPMS) Version 3.",
            "Maintains the database of the Partnerships and Linkages Office (PLO).",
            "Created a Google Data Studio Report for TESDA Partnership.",
            "Monitors the 7 Delivery Modes under Enterprise Based Training Program (EBT)."
        ]
    },
    {
        id: 4,
        role: "Junior Web Developer (Intern)",
        company: "Ateneo de Naga University",
        period: "Nov 2018 – Mar 2019",
        description: "Full-stack web application development using Bootstrap, PHP, MySQL.",
        details: [
            "Developed front-end and back-end web application development using Bootstrap, PHP, MySQL.",
            "Design and implement database systems to support website functionality.",
            "Collaborate with project management staff to gather requirements and deliver projects."
        ]
    }
];

const Experience = ({ activeRole }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = useCallback((id) => {
        setSelectedId((prevId) => (prevId === id ? null : id));
    }, []);

    return (
        <section id="experience" className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-4">
                    <Database className={activeRole?.accentClass || 'text-purple-400'} size={32} />
                    <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-white uppercase">Experience_Pipeline</h2>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
            </motion.div>

            <div className="relative pl-8 md:pl-0">
                {/* Vertical Pipeline Line */}
                <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2" />
                
                {experiences.map((job, index) => {
                    const isEven = index % 2 === 0;
                    const isExpanded = selectedId === job.id;
                    const isCurrent = job.period.toLowerCase().includes('present');

                    return (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`mb-12 relative flex md:justify-between items-start md:items-center w-full ${
                                isEven ? 'md:flex-row-reverse' : ''
                            }`}
                        >
                            {/* Central Node */}
                            <div className="absolute left-[-25px] md:left-1/2 w-14 h-14 rounded-full border-4 border-[#0a0a0c] bg-white/5 md:-translate-x-1/2 flex items-center justify-center z-10 transition-colors duration-500">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    isCurrent ? `bg-gradient-to-r ${activeRole?.gradient || 'from-purple-500 to-indigo-600'} animate-pulse shadow-lg shadow-${activeRole?.accentClass?.split('-')[1]}-500/50` : 'bg-white/10'
                                }`}>
                                    <Briefcase size={14} className={isCurrent ? 'text-white' : 'text-slate-400'} />
                                </div>
                            </div>

                            {/* Empty space for alternate side in desktop */}
                            <div className="hidden md:block md:w-[45%]" />

                            {/* Content Card */}
                            <motion.div 
                                layout
                                onClick={() => handleSelect(job.id)}
                                className={`w-full md:w-[45%] ml-10 md:ml-0 glass-panel p-6 cursor-pointer border hover:bg-white/10 transition-all duration-300 ${
                                    isExpanded ? 'border-white/30' : 'border-white/5'
                                }`}
                                style={isExpanded && activeRole ? { boxShadow: `0 0 20px ${activeRole.glowColor}` } : {}}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="inline-block px-2 py-1 rounded bg-black/40 border border-white/5 text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-3">
                                            Status: <span className={isCurrent ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                                                {isCurrent ? 'operational' : 'archived'}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1 leading-tight">{job.role}</h3>
                                        <h4 className={`font-mono text-sm ${activeRole?.accentClass || 'text-purple-400'}`}>{job.company}</h4>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 90 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-white/5 p-2 rounded-lg ml-4 shrink-0"
                                    >
                                        <ChevronRight size={18} className="text-slate-400" />
                                    </motion.div>
                                </div>

                                <div className="flex items-center gap-2 text-slate-400 font-mono text-xs mb-4">
                                    <Calendar size={14} />
                                    <span>{job.period}</span>
                                </div>

                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {job.description}
                                </p>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 mt-4 border-t border-white/10">
                                                <ul className="space-y-3">
                                                    {job.details.map((detail, i) => (
                                                        <li key={i} className="flex gap-3 text-sm text-slate-300 items-start">
                                                            <span className={`mt-1 text-[10px] ${activeRole?.accentClass || 'text-purple-400'}`}>▶</span>
                                                            <span className="leading-relaxed">{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default React.memo(Experience);
