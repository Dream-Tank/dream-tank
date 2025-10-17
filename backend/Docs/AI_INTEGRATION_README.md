# 🤖 AI Integration - Quick Reference

## Current Setup

Your Dream Tank application now supports **TWO AI modes**:

### 1. **Mock AI** (Development)
- Local NLP-based scoring using `natural` library
- Instant responses, no API calls
- Great for development and testing
- **File:** `src/services/aiService.js`

### 2. **Gemini AI** (Production)
- Google's Gemini 1.5 Flash model
- Intelligent, context-aware scoring
- **100% FREE** - 1,500 requests/day
- **File:** `src/services/aiServiceGemini.js`

## 🎯 How It Works

```
[User submits idea]
      ↓
[AI Service Router] ← Checks AI_PROVIDER config
      ↓
   ┌──┴──┐
   ↓     ↓
[Mock]  [Gemini] ← Selected based on .env
   ↓     ↓
   └──┬──┘
      ↓
[Returns scores + analysis]
```

## 🚀 Quick Start

### For Development (No API Key Needed)

```bash
cd backend
echo "AI_PROVIDER=mock" >> .env
npm run dev
```

### For Production (With Gemini AI)

```bash
# 1. Get free API key from: https://aistudio.google.com/app/apikey

# 2. Configure backend
cd backend
echo "AI_PROVIDER=gemini" >> .env
echo "GEMINI_API_KEY=your-key-here" >> .env

# 3. Start server
npm run dev
```

## 📁 Files Modified/Created

### New Files
- ✨ `src/services/aiServiceGemini.js` - Gemini AI integration
- ✨ `src/services/aiServiceRouter.js` - Smart router between AI services
- ✨ `GEMINI_SETUP.md` - Complete setup guide
- ✨ `ENV_TEMPLATE.md` - Environment variables template

### Modified Files
- ✏️ `src/config/config.js` - Added AI provider config
- ✏️ `src/routes/ideas.js` - Made AI scoring async
- ✏️ `src/utils/seed.js` - Updated to use router

### Unchanged Files
- ✅ `src/services/aiService.js` - Mock AI (still works!)
- ✅ Frontend files - No changes needed
- ✅ Database schema - No changes needed

## 🎛️ Configuration

Edit `backend/.env`:

```env
# Mock AI (Development)
AI_PROVIDER=mock

# OR

# Gemini AI (Production)
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyC...your-key...
```

**That's it!** Just change one variable and restart the server.

## 🔥 Testing It Out

### Test with Mock AI
```bash
# backend/.env
AI_PROVIDER=mock

# Start server
npm run dev

# Submit an idea
# Check logs: "🤖 Using AI provider: mock"
# Response time: <50ms
```

### Test with Gemini AI
```bash
# backend/.env
AI_PROVIDER=gemini
GEMINI_API_KEY=your-key-here

# Start server
npm run dev

# Submit an idea
# Check logs: "🤖 Using AI provider: gemini"
# Response time: 1-2 seconds
# More intelligent scoring!
```

## 📊 Scoring Comparison

### Mock AI Characteristics
- ✅ Fast (instant)
- ✅ Offline (no internet needed)
- ⚠️ Keyword-based (less intelligent)
- ⚠️ Lenient scoring

### Gemini AI Characteristics
- ✅ Intelligent (understands context)
- ✅ Detailed feedback
- ✅ Consistent scoring
- ⚠️ Requires internet
- ⚠️ Slightly slower (1-2s)
- ⚠️ More critical (higher standards)

## 💰 Cost & Limits

### Mock AI
- Cost: **FREE**
- Limit: **Unlimited**
- Speed: **Instant**

### Gemini AI (Free Tier)
- Cost: **FREE** (no credit card needed)
- Limit: **1,500 requests/day**
- Speed: **1-2 seconds per request**

For a hackathon with 500 participants submitting ~250 ideas = **17% of daily quota**. You're good! 👍

## 🛡️ Error Handling

Both modes include automatic fallback:

```javascript
try {
  // Try AI scoring
  const score = await callAI();
} catch (error) {
  // Fallback to basic scoring
  const score = fallbackScoring();
}
```

**Users always get a score**, even if AI fails.

## 🎓 For Your Finals Presentation

### Demo Tips

1. **Show Both Modes:**
   - Start with mock AI (fast demo)
   - Switch to Gemini AI (show intelligence)

2. **Highlight Smart Features:**
   - "AI analyzes clarity, innovation, feasibility, impact"
   - "Uses Google's Gemini 1.5 Flash model"
   - "Free tier supports 1,500 requests/day"

3. **Show Real Difference:**
   - Submit vague idea → Low score with helpful feedback
   - Submit detailed idea → High score with praise

### Talking Points
- ✅ "Production-ready AI integration"
- ✅ "Seamlessly switches between mock and real AI"
- ✅ "Uses Google's latest Gemini model"
- ✅ "Completely free for our scale"
- ✅ "Automatic fallback handling"

## 🔧 Troubleshooting

### Issue: "API key not configured"
**Solution:** Set `GEMINI_API_KEY` in `.env` file

### Issue: Scores seem too low with Gemini
**Answer:** This is normal! Gemini is more critical than mock AI. Scores of 65-75 are good.

### Issue: Slow responses
**Answer:** Gemini takes 1-2 seconds. This is normal. Mock AI is instant if speed matters.

### Issue: "Quota exceeded"
**Solution:** Either wait 24 hours or switch to `AI_PROVIDER=mock`

## 📚 Learn More

- **Full Setup Guide:** See `GEMINI_SETUP.md`
- **Gemini Docs:** https://ai.google.dev/docs
- **Get API Key:** https://aistudio.google.com/app/apikey

## ✅ You're Ready!

Your Dream Tank now has enterprise-grade AI scoring that costs $0.

**For finals demo:**
1. Set `AI_PROVIDER=gemini`
2. Add your API key
3. Restart server
4. Submit ideas and watch the magic! ✨

Good luck with your finals! 🎉

