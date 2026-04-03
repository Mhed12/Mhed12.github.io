# Interactive Resume - Neural Pipeline Edition

A modern, interactive online resume built using React and styled with Tailwind CSS, featuring a Dark-Mode Industrial aesthetic. The UI implements a "Neural Pipeline" concept, presenting career experience as a connected timeline, and incorporates interactive elements like a floating AI assistant interface.

## 🚀 Key Features

- **Dark-Mode Industrial Aesthetic:** A sleek, premium, dark-themed design accented with neon colors (cyan/amber/emerald) to signify different functional areas.
- **Identity Switcher (Hero Section):** A dynamic component to switch between different professional personas (e.g., Data Engineer vs. AI/ML Analyst).
- **Neural Pipeline (Experience Section):** A vertical timeline that fluidly maps career progression and experiences.
- **Agent Core Interface:** A floating, interactive chat-like interface that provides an engaging way to explore the resume.
- **Micro-Animations:** Powered by Framer Motion, ensuring smooth transitions, hover effects, and a highly responsive feel.
- **Performance Optimized:** Implements advanced React rendering optimizations (`React.memo`, `useCallback`, `useMemo`), isolating expensive API functions and preventing unnecessary re-renders across all major components (`AgentCore`, `Education`, `Experience`, `Hero`, `Skills`) for a buttery-smooth user experience.

## 🛠️ Technology Stack

- **Framework:** [React 18](https://reactjs.org/) (bootstrapped with [Vite](https://vitejs.dev/))
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** Vitest & React Testing Library
- **CI/CD Deployment:** GitHub Actions

## 📂 Project Structure

```text
interactive-resume/
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD Pipeline for auto-deploying to GitHub Pages
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

Make sure you have [Node.js](https://nodejs.org/) (version 18, 20, or newer is recommended) installed on your machine.

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

### Environment Setup

The interactive resume features a floating AI Assistant (Agent Core) powered by the Google Gemini API. To enable it locally:

1. Duplicate `.env.example` to create a new `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and set your Gemini API Key:

   ```env
   VITE_GEMINI_API_KEY=your_google_ai_studio_api_key_here
   ```

*(Note: You can get a free API key from [Google AI Studio](https://aistudio.google.com/). When deploying to production such as GitHub Pages, make sure to apply website restrictions to your API key via Google Cloud Console to secure it from unauthorized use.)*

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

This will generate a `dist` folder containing the minified and bundled application.

## 🚀 Deployment (GitHub Pages)

This project contains a **GitHub Actions CI/CD pipeline** to automatically deploy the resume to **GitHub Pages**.

- Every time you push code to the `main` or `master` branch, `.github/workflows/deploy.yml` takes over.
- It safely installs dependencies, builds the production-ready Vite app, and publishes the output directly to your GitHub Pages URL safely and automatically without needing a separate `gh-pages` branch.

**To enable this on your own fork/repository:**

1. Navigate to your repository settings on GitHub.
2. Go to **Pages** (under Code and automation) on the left sidebar.
3. Under **Build and deployment**, set the **Source** dropdown to **GitHub Actions**.
4. The workflow will now automatically run and publish your page whenever you push changes!

## 🧪 Testing

The project is configured for Vitest. You can run the test suite using:

```bash
npx vitest
```
