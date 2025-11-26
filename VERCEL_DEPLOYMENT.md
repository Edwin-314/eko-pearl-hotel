# Vercel Deployment Guide

## Why Vercel?
- ✅ Free hosting for personal projects
- ✅ Automatic deployments from GitHub
- ✅ Secure environment variable support
- ✅ Perfect for React/Vite projects
- ✅ Custom domains supported
- ✅ Fast global CDN

## Step-by-Step Deployment

### 1. Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Choose "Continue with GitHub" (easiest option)
4. Authorize Vercel to access your GitHub account

### 2. Deploy Your Project
1. After signing in, click "New Project"
2. Import your `eko-pearl-hotel` repository
3. Vercel will auto-detect it's a Vite project
4. Click "Deploy" (it will deploy but chatbot won't work yet)

### 3. Add Environment Variables
1. Go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables" in the sidebar
4. Add a new variable:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Google Gemini API key
   - **Environments:** Check all (Production, Preview, Development)
5. Click "Save"

### 4. Redeploy
1. Go to "Deployments" tab
2. Click the three dots (...) on the latest deployment
3. Click "Redeploy"
4. Your chatbot should now work!

### 5. Custom Domain (Optional)
1. In Settings → Domains
2. Add your custom domain or use the free `.vercel.app` domain

## Configuration Files

I'll create the necessary Vercel configuration files for optimal deployment.

## Benefits Over GitHub Pages
- Environment variables work securely
- Faster builds and deployments
- Better performance with edge functions
- Automatic HTTPS
- Preview deployments for pull requests

## Your Live URL
After deployment, your site will be available at:
`https://eko-pearl-hotel.vercel.app` (or similar)

## Troubleshooting
- If chatbot doesn't work: Check environment variables are set correctly
- If build fails: Check the build logs in Vercel dashboard
- If styles are broken: Verify the base path in vite.config.ts
