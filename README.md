# Eko Pearl Hotel Website

A modern, elegant 3-star hotel website design for Eko Pearl Hotel in Lagos, Nigeria. Built with React, Tailwind CSS, and Google Gemini AI.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/eko-pearl-hotel.git
    cd eko-pearl-hotel
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory and add your Google Gemini API key:
    ```
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
    *(Note: You may need to update `services/gemini.ts` to use `import.meta.env.VITE_GEMINI_API_KEY` instead of `process.env.API_KEY` if running locally with Vite)*

4.  Start the development server:
    ```bash
    npm run dev
    ```

## 📦 Deployment to GitHub Pages

1.  Open `vite.config.ts` and update the `base` property to match your repository name:
    ```typescript
    export default defineConfig({
      // ...
      base: '/your-repo-name/', 
    });
    ```

2.  Run the deploy script:
    ```bash
    npm run deploy
    ```

This will build the project and push the `dist` folder to the `gh-pages` branch of your repository.