import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, BarChart2, Cpu, Layers } from 'lucide-react';

const skillCategories = [
    {
        title: "Data & Analysis",
        icon: <BarChart2 size={24} />,
        skills: ["Data Analysis", "Data Visualization", "ETL Processes", "Reporting", "Business Intelligence"]
    },
    {
        title: "AI & Engineering",
        icon: <Cpu size={24} />,
        skills: ["Python", "Google ADK", "AI Agents", "Machine Learning", "Computational Science"]
    },
    {
        title: "Tools & Platforms",
        icon: <Layers size={24} />,
        skills: ["Tableau", "Databricks", "SSIS", "Google Data Studio", "Excel", "Tableau Prep"]
    },
    {
        title: "Database & Code",
        icon: <Database size={24} />,
        skills: ["SQL", "T-SQL", "Microsoft SQL Server", "MySQL", "PHP", "HTML/CSS"]
    }
];

const Skills = ({ activeRole }) => {
    return (
        <section id="skills" className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-4">
                    <Layers className={activeRole?.accentClass || 'text-purple-400'} size={32} />
                    <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-white uppercase">Technical_Capabilities</h2>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        className="glass-panel p-8 border border-white/5 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {/* Subtle background glow on hover */}
                        <div 
                            className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                            style={{ backgroundColor: activeRole?.glowColor || 'rgba(139, 92, 246, 0.5)' }}
                        />

                        <div className={`flex items-center gap-4 mb-8 ${activeRole?.accentClass || 'text-purple-400'}`}>
                            <div className="p-3 bg-black/40 border border-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                {category.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-wide">{category.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-3 relative z-10">
                            {category.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 rounded-lg border border-white/10 bg-black/40 text-slate-300 text-sm font-mono hover:bg-white/20 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default React.memo(Skills);
