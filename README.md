# Interactive Resume - Neural Pipeline Edition

A modern, interactive online resume built using React and styled with Tailwind CSS, featuring a Dark-Mode Industrial aesthetic. The UI implements a "Neural Pipeline" concept, presenting career experience as a connected timeline, and incorporates interactive elements like a floating AI assistant interface.

## 🚀 Key Features

- **Dark-Mode Industrial Aesthetic:** A sleek, premium, dark-themed design accented with neon colors (cyan/amber/emerald) to signify different functional areas.
- **Identity Switcher (Hero Section):** A dynamic component to switch between different professional personas (e.g., Data Engineer vs. AI/ML Analyst).
- **Neural Pipeline (Experience Section):** A vertical timeline that fluidly maps career progression and experiences.
- **Agent Core Interface:** A floating, interactive chat-like interface that provides an engaging way to explore the resume.
- **Micro-Animations:** Powered by Framer Motion, ensuring smooth transitions, hover effects, and a highly responsive feel.

## 🛠️ Technology Stack

- **Framework:** [React 18](https://reactjs.org/) (bootstrapped with [Vite](https://vitejs.dev/))
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** Vitest & React Testing Library

## 📂 Project Structure

```text
interactive-resume/
├── src/
│   ├── components/
│   │   ├── AgentCore.jsx   # Floating chat interface component
│   │   ├── Education.jsx   # Education history display
│   │   ├── Experience.jsx  # Vertical timeline mapping career history
│   │   ├── Hero.jsx        # Top section with the Identity Switcher
│   │   └── Skills.jsx      # Skills and proficiencies display
│   ├── App.jsx             # Main application container
│   ├── index.css           # Global Tailwind and custom styles
│   └── main.jsx            # Entry point
├── package.json
├── tailwind.config.js      # Tailwind theme and plugin configuration
└── vite.config.js          # Vite bundler configuration
```

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository (or download the source).
2. Navigate to the project directory:
   ```bash
   cd interactive-resume
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:

```bash
npm run dev
```

The app will compile and be available at the local URL provided by Vite (typically `http://localhost:5173`).

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder containing the minified and bundled application ready to be deployed.

## 🧪 Running Tests

To run the Vitest test suite:

```bash
npm run test
```
