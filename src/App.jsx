import React, { useState } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import AgentCore from './components/AgentCore';

// Define the Roles and their corresponding theme properties
export const ROLES = {
  AI_DEV: {
    id: 'AI_DEV',
    label: 'AI Agent Developer',
    gradient: 'from-purple-500 to-indigo-600',
    glowColor: 'rgba(139, 92, 246, 0.15)', // Purple/Indigo glow
    accentClass: 'text-purple-400',
    borderFocusClass: 'focus:border-purple-500'
  },
  DATA_ENG: {
    id: 'DATA_ENG',
    label: 'Data Engineer',
    gradient: 'from-emerald-500 to-cyan-600',
    glowColor: 'rgba(16, 185, 129, 0.15)', // Emerald/Cyan glow
    accentClass: 'text-emerald-400',
    borderFocusClass: 'focus:border-emerald-500'
  },
  BI_DEV: {
    id: 'BI_DEV',
    label: 'BI Developer',
    gradient: 'from-orange-500 to-red-600',
    glowColor: 'rgba(249, 115, 22, 0.15)', // Orange/Red glow
    accentClass: 'text-orange-400',
    borderFocusClass: 'focus:border-orange-500'
  }
};

function App() {
  // Default Identity State
  const [activeRole, setActiveRole] = useState(ROLES.AI_DEV);

  return (
    <div className="min-h-screen selection:bg-white/20 relative font-sans">
      <Hero activeRole={activeRole} setActiveRole={setActiveRole} ROLES={ROLES} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl z-10 relative">
        <Experience activeRole={activeRole} />
        <Skills activeRole={activeRole} />
        <Education activeRole={activeRole} />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 font-mono text-sm">
        <p>&copy; {new Date().getFullYear()} Mohammed B. Dela Cruz. SYSTEM: SECURE CONNECTION ESTABLISHED.</p>
      </footer>

      {/* Conditionally render the AI Agent Core when AI_DEV role is active, or render it globally with a toggle. Let's render it globally but themed. */}
      <AgentCore activeRole={activeRole} />
    </div>
  );
}

export default App;
