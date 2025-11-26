# API Setup Instructions

## Setting up the Google Gemini API Key

The chatbot and voice features require a Google Gemini API key to function.

### Step 1: Get Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" 
4. Copy the generated API key

### Step 2: Create Environment File

1. In the root directory of the project, create a file named `.env`
2. Add the following line to the `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with the API key you copied from Step 1

### Step 3: Test the Setup

1. Save the `.env` file
2. Restart your development server (`npm run dev`)
3. Open the website and try the chat feature
4. You should see Ayo respond instead of the "API configuration" error

### Important Notes

- **Never commit your `.env` file to version control** - it contains your secret API key
- The `.env` file should be in your `.gitignore` (it already is)
- If deploying to production, you'll need to set the `VITE_GEMINI_API_KEY` environment variable in your hosting platform

### Troubleshooting

If the chatbot still shows "API configuration" errors:
1. Check that your `.env` file is in the root directory (same level as `package.json`)
2. Verify the API key is correct (no extra spaces or characters)
3. Restart your development server after creating/modifying the `.env` file
4. Check the browser console for any error messages
