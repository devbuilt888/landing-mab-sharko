# ChatGPT API Integration Instructions

## Current Status
✅ **ChatBot UI is already implemented and working with mock responses**
✅ **Component is already added to DefaultLanding page**

## To Connect Real ChatGPT API:

### 1. Get OpenAI API Key
- Go to https://platform.openai.com/api-keys
- Create a new API key
- Keep it secure!

### 2. Install OpenAI Package
```bash
npm install openai
```

### 3. Create Environment Variables
Create `.env` file in root:
```
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

### 4. Update ChatBot.tsx
Replace the `sendMessageToAPI` function in `/src/components/ChatBot.tsx`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: This exposes API key to browser
});

const sendMessageToAPI = async (message: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres el asistente de IA de Miguel Beas, experto en implementación de IA para empresas latinoamericanas. Responde de manera útil, profesional y promociona el webinar cuando sea apropiado."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "Lo siento, no pude procesar tu mensaje.";
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return "Lo siento, hubo un error. Por favor, intenta de nuevo.";
  }
};
```

### 5. Better Security (Recommended)
**Create a backend API endpoint instead of exposing API key:**

```typescript
// Instead of direct OpenAI call, call your backend:
const sendMessageToAPI = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    return "Lo siento, hubo un error. Por favor, intenta de nuevo.";
  }
};
```

### 6. Features Already Included:
- ✅ Responsive chat UI
- ✅ Typing indicators
- ✅ Smooth animations
- ✅ Error handling
- ✅ Auto-scroll messages
- ✅ Enter key to send
- ✅ Mobile-friendly design

### 7. Customization Options:
- Modify system prompt for different personalities
- Add conversation memory
- Implement rate limiting
- Add user authentication
- Store chat history

### 8. Cost Considerations:
- GPT-3.5-turbo: ~$0.002 per 1K tokens
- GPT-4: ~$0.03 per 1K tokens
- Implement rate limiting to control costs

## Easy Implementation Answer:
**YES, it's very easy to implement!** The UI is already done, you just need to:
1. Get OpenAI API key
2. Replace one function
3. Add environment variable

The hardest part (UI/UX) is already complete! 