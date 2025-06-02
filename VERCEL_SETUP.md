# 🚀 Vercel Deployment Guide - React Miguel Beas Web Project

## ✅ **ChatBot Setup Complete in Subdirectory!**

Your `react-miguel-beas-web` project now has:
- ✅ ChatBot component positioned after testimonials
- ✅ Vercel API function (`/api/chat.js`)
- ✅ Proper vercel.json configuration
- ✅ All themed landing pages with ChatBot integration

## 📍 **Project Location**
**Deploy from**: `react-miguel-beas-web` subdirectory  
**For domain**: miguelangelbeas.com  
**ChatBot position**: After testimonials section on main landing page

## 📋 **Quick Deployment Steps**

### **Step 1: Get OpenAI API Key**
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy it (starts with `sk-proj-...`)

### **Step 2: Deploy to Vercel**

**Option A: Vercel CLI (Recommended)**
```bash
# Navigate to the React project subdirectory
cd C:\Users\JoseP\Documents\landingMarketingPages\miguel-beas-web\react-miguel-beas-web

# Install Vercel CLI if you don't have it
npm i -g vercel

# Login to Vercel
vercel login

# Deploy your project
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - What's your project's name? miguel-beas-web
# - In which directory is your code located? ./
```

**Option B: Vercel Dashboard**
1. Push your `react-miguel-beas-web` folder to GitHub
2. Go to https://vercel.com/dashboard
3. Click "New Project"
4. Import your GitHub repository
5. **Set root directory to `react-miguel-beas-web`**
6. Deploy

### **Step 3: Add Environment Variable**
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-proj-your-actual-api-key`
   - **Environment**: Production (and Preview)
5. Click "Save"

### **Step 4: Redeploy**
```bash
# Redeploy to apply environment variable
vercel --prod
```

### **Step 5: Test Your Site**
1. Visit your Vercel URL (e.g., `https://miguel-beas-web.vercel.app`)
2. Test all routes:
   - `/` - Default landing (ChatBot appears after testimonials)
   - `/military` - Military theme
   - `/racecar` - Racecar theme
   - `/spaceship` - Spaceship theme
   - `/midnight` - Midnight theme
   - `/aliens` - Aliens theme
   - `/egypt` - Egypt theme
   - `/circus` - Circus theme
   - `/football` - Football theme
   - `/newsroom` - Newsroom theme
   - `/police` - Police theme
   - `/zoom` - Zoom redirect
3. Test the ChatBot (bottom-right corner, appears after scrolling past testimonials)

## 🏗️ **Your Project Structure**
```
react-miguel-beas-web/ (THIS FOLDER ONLY)
├── api/
│   └── chat.js                 # ✅ Vercel serverless function
├── src/
│   ├── components/
│   │   ├── ChatBot.tsx         # ✅ AI ChatBot component
│   │   ├── DefaultLanding.tsx  # ✅ ChatBot after testimonials
│   │   ├── MilitaryLanding.tsx # ✅ Themed pages
│   │   └── ... (other themed components)
│   └── App.tsx
├── public/
│   └── images/
├── vercel.json                 # ✅ Vercel configuration
└── package.json               # ✅ React dependencies
```

## 🎯 **ChatBot Features**
- ✅ **Positioned after testimonials** on main landing page
- ✅ **Real OpenAI integration** with environment variables
- ✅ **Available on all themed pages** (bottom-right corner)
- ✅ **Spanish language** responses for Miguel Beas brand
- ✅ **Professional UI** with animations and smooth interactions

## 🛡️ **Security & Performance**
- ✅ API key stored securely in Vercel environment variables
- ✅ Server-side API calls (no key exposure to browser)
- ✅ CORS protection and request validation
- ✅ React optimizations and code splitting

## 🔧 **Local Development**
To test locally:
```bash
# Navigate to subdirectory
cd react-miguel-beas-web

# Create .env.local in this subdirectory
echo "OPENAI_API_KEY=sk-proj-your-key-here" > .env.local

# Install dependencies
npm install

# Start development server
npm start

# Visit http://localhost:3000
```

## 🌟 **Custom Domain Setup**
1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain: `miguelangelbeas.com`
3. Follow DNS setup instructions
4. Update CORS in `api/chat.js` with your domain

## 💰 **Cost Estimates**
- **Vercel Hosting**: Free tier (perfect for this project)
- **OpenAI API**: ~$0.002 per 1K tokens (GPT-3.5-turbo)
- **Expected monthly cost**: $5-20 for moderate traffic

## 🚨 **Important Notes**
- **Deploy ONLY the `react-miguel-beas-web` subdirectory**
- **NOT the parent `miguel-beas-web` folder**
- **ChatBot appears after testimonials section on main page**
- **Available on all 10 themed landing pages**

## ✅ **That's It!**
Your ChatBot is now:
- ✅ Positioned after testimonials on miguelangelbeas.com
- ✅ Providing real AI assistance in Spanish
- ✅ Available across all themed landing pages
- ✅ Securely integrated with OpenAI API

**Visitors will see the ChatBot after reading testimonials and can get real AI help!** 🎉 