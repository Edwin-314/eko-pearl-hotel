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
    VITE_GEMINI_API_KEY=your_actual_api_key_here
    ```
    
    **To get your API key:**
    - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
    - Sign in with your Google account
    - Click "Create API Key"
    - Copy the generated key and replace `your_actual_api_key_here` above

4.  Start the development server:
    ```bash
    npm run dev
    ```

## 📦 Deployment Options

### Option 1: Vercel (Recommended - Supports Environment Variables)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Import your `eko-pearl-hotel` repository
4. Add environment variable: `VITE_GEMINI_API_KEY` with your API key
5. Deploy! Your chatbot will work perfectly.

See `VERCEL_DEPLOYMENT.md` for detailed instructions.

### Option 2: GitHub Pages (Static Only - Chatbot Won't Work)

1.  Open `vite.config.ts` and update the `base` property:
    ```typescript
    base: '/eko-pearl-hotel/', 
    ```

2.  Run the deploy script:
    ```bash
    npm run deploy
    ```

**Note:** GitHub Pages doesn't support environment variables, so the chatbot features won't work.