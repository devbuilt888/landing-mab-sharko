# Vercel Deployment Setup for ChatGPT Integration

## 🚀 **Deploy to Vercel with Environment Variables**

### **Step 1: Get Your OpenAI API Key**
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy it (starts with `sk-proj-...`)

### **Step 2: Deploy to Vercel**

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - What's your project's name? miguel-beas-web
# - In which directory is your code located? ./
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Deploy

### **Step 3: Set Environment Variable**
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add new environment variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-proj-your-actual-api-key-here`
   - **Environment**: Production (and Preview if you want)
5. Click "Save"

### **Step 4: Redeploy**
After adding the environment variable:
```bash
# Redeploy to apply the new environment variable
vercel --prod
```

Or trigger a redeploy from the Vercel dashboard.

### **Step 5: Test Your Chatbot**
1. Visit your Vercel URL (e.g., `https://miguel-beas-web.vercel.app`)
2. Click the chat button
3. Send a message
4. Should get real AI responses!

## 🏗️ **Project Structure**
```
your-project/
├── api/
│   └── chat.js          # Vercel serverless function
├── src/
│   └── components/
│       └── ChatBot.tsx  # Updated to use /api/chat
├── vercel.json          # Vercel configuration
└── package.json
```

## ✅ **What's Included:**
- ✅ Serverless API endpoint (`/api/chat`)
- ✅ Environment variables for API key security
- ✅ CORS handling for cross-origin requests
- ✅ Error handling and validation
- ✅ Works locally and in production

## 🔧 **Local Development**
To test locally:
```bash
# Create .env.local file in your project root
echo "OPENAI_API_KEY=sk-proj-your-key-here" > .env.local

# Start development server
npm run dev

# Test the API endpoint
# Visit: http://localhost:3000
```

## 🛡️ **Security Features:**
- ✅ API key stored securely in Vercel environment variables
- ✅ Server-side API calls (key never exposed to client)
- ✅ Request validation and error handling
- ✅ Rate limiting can be added easily

## 💰 **Cost Control (Optional)**
Add rate limiting to your API function:

```javascript
// Add this to api/chat.js after the CORS headers
const rateLimitMap = new Map();

// Simple rate limiting (5 requests per minute per IP)
const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
const now = Date.now();
const windowMs = 60 * 1000; // 1 minute
const maxRequests = 5;

if (!rateLimitMap.has(ip)) {
  rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
} else {
  const userData = rateLimitMap.get(ip);
  if (now > userData.resetTime) {
    userData.count = 1;
    userData.resetTime = now + windowMs;
  } else {
    userData.count++;
    if (userData.count > maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }
  }
}
```

## 🚨 **Production Security:**
For production, update CORS in `api/chat.js`:
```javascript
// Replace this:
res.setHeader('Access-Control-Allow-Origin', '*');

// With this (your actual domain):
res.setHeader('Access-Control-Allow-Origin', 'https://miguel-beas-web.vercel.app');
```

## ✅ **That's it!**
Your chatbot is now live on Vercel with secure environment variables! 