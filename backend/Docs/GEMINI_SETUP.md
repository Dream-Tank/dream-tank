# Google Gemini AI Integration Guide

This guide explains how to set up and use Google's Gemini AI API (free tier) for production-ready idea scoring in Dream Tank.

## 🌟 Why Gemini?

- **100% FREE** - No credit card required
- **Generous Limits** - 15 requests/minute, 1,500 requests/day
- **High Quality** - Latest Gemini 1.5 Flash model
- **Fast** - Average response time 1-2 seconds
- **Easy Setup** - Get API key in 2 minutes

## 📝 Getting Your Free API Key

### Step 1: Visit Google AI Studio
Go to: **https://aistudio.google.com/app/apikey**

### Step 2: Sign In
- Sign in with your Google account
- If you don't have one, create a free Google account

### Step 3: Create API Key
1. Click "Create API Key"
2. Select "Create API key in new project" (or choose existing project)
3. Copy your API key - it looks like: `AIzaSyC...`

⚠️ **Keep your API key secret!** Never commit it to version control.

### Step 4: Configure Your Backend

1. **Copy the environment template:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```env
   # Change this line:
   AI_PROVIDER=gemini
   
   # Add your API key:
   GEMINI_API_KEY=AIzaSyC_your_actual_key_here
   ```

3. **Restart your backend:**
   ```bash
   npm run dev
   ```

## 🚀 Testing the Integration

### Test 1: Submit an Idea
1. Start your backend: `npm run dev`
2. Submit a new idea through the frontend
3. Check the terminal logs for: `🤖 Using AI provider: gemini`
4. The idea should receive detailed AI scoring

### Test 2: Check Response Quality
Good ideas (clear, innovative, feasible) should score **70-85**  
Average ideas should score **60-70**  
Poor ideas (vague, unrealistic) should score **40-60**

## 🔧 Configuration Options

### Development Mode (Mock AI)
```env
AI_PROVIDER=mock
```
- Uses local NLP-based scoring
- No API calls, instant responses
- Great for development and testing
- No API key needed

### Production Mode (Real AI)
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your-api-key-here
```
- Uses Google Gemini AI
- Real intelligent scoring
- ~1-2 second response time
- Requires API key

## 📊 Rate Limits & Quotas

### Free Tier Limits
- **15 requests per minute**
- **1,500 requests per day**
- **No cost, no credit card required**

### What This Means For You
- **Small hackathon (50 people):** ~30 submissions/day = **2% of quota**
- **Medium event (200 people):** ~100 submissions/day = **7% of quota**
- **Large event (500 people):** ~250 submissions/day = **17% of quota**

**You'll be fine!** The free tier is very generous.

## 🛡️ Error Handling

The system includes automatic fallback:

1. **If Gemini API fails** → Falls back to basic length-based scoring
2. **If API key is invalid** → Returns error message with instructions
3. **If rate limit exceeded** → Uses fallback scoring

Users will always get a score, even if AI is unavailable.

## 💡 Best Practices

### For Development
✅ Use `AI_PROVIDER=mock` to avoid using API quota  
✅ Only switch to `gemini` when testing production features  
✅ Keep your API key in `.env` (gitignored)

### For Production
✅ Set `AI_PROVIDER=gemini` in production environment  
✅ Use environment variables (never hardcode keys)  
✅ Monitor your quota at: https://aistudio.google.com/  
✅ Set up error alerts for API failures

### Security
✅ **Never** commit `.env` file to git  
✅ **Never** share API keys in screenshots or logs  
✅ Rotate keys if accidentally exposed  
✅ Use different keys for dev/staging/production

## 🔍 Troubleshooting

### "API key not configured" Error
- Check `.env` file exists in `/backend` folder
- Verify `GEMINI_API_KEY=...` is set
- Restart backend server after changing `.env`

### "Invalid API key" Error
- Verify key copied correctly (no extra spaces)
- Check key hasn't been deleted from Google AI Studio
- Generate a new key if needed

### "Quota exceeded" Error
- Wait for rate limit to reset (60 seconds for RPM limit)
- Switch to `AI_PROVIDER=mock` temporarily
- Consider upgrading to paid tier if needed (though unlikely)

### AI Scores Seem Wrong
- Gemini scores are often more critical than mock AI
- This is normal - AI evaluates based on actual quality
- Scores of 65-75 are good, 80+ is excellent

## 📈 Monitoring Usage

Check your usage at: **https://aistudio.google.com/app/apikey**

You can see:
- Requests made today
- Remaining quota
- Historical usage

## 🎯 Expected Scoring Behavior

### Gemini AI Scoring
- **More intelligent** - Understands context and nuance
- **More consistent** - Same idea gets same score
- **More critical** - Higher standards than mock
- **More detailed** - Better feedback in analysis

### Example Comparison

**Idea:** "An app for campus parking"

**Mock AI Score:** 65-70 (based on keywords)  
**Gemini AI Score:** 55-65 (notes lack of innovation, wants more detail)

This is expected! Gemini is smarter and more helpful for students.

## 🚨 Important Notes

1. **Free Tier is Generous** - You won't run out for a hackathon
2. **Fallback Always Works** - System won't break if API fails
3. **Mock is Fine for Dev** - No need to use real AI during development
4. **Switch Anytime** - Just change `AI_PROVIDER` and restart

## 🆘 Need Help?

If you have issues:
1. Check this guide first
2. Review backend logs for error messages
3. Test with `AI_PROVIDER=mock` to isolate the issue
4. Check Google AI Studio for API key status

## 📚 Additional Resources

- Gemini API Docs: https://ai.google.dev/docs
- API Quotas: https://ai.google.dev/pricing
- Google AI Studio: https://aistudio.google.com/

---

**You're all set!** 🎉 Your Dream Tank now has production-ready AI scoring powered by Google Gemini.

