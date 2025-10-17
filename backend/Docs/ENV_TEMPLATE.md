# Environment Variables Template

Copy this content to a `.env` file in the `/backend` directory.

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database
DATABASE_URL="file:./dev.db"

# CORS
FRONTEND_URL=http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE_MB=10
UPLOAD_DIR=./uploads

# AI Configuration
# Options: 'mock' (for development/testing) or 'gemini' (for production)
AI_PROVIDER=mock

# Google Gemini API (Required if AI_PROVIDER=gemini)
# Get your free API key from: https://aistudio.google.com/app/apikey
# Free tier: 15 requests/min, 1500 requests/day
GEMINI_API_KEY=your-gemini-api-key-here
```

## Quick Setup

```bash
# 1. Copy to .env file
cat ENV_TEMPLATE.md | grep -A 100 "^```env" | grep -B 100 "^```$" | grep -v "^```" > .env

# Or manually:
# Create .env file and paste the environment variables above
```

## For Production with Gemini AI

1. Get free API key: https://aistudio.google.com/app/apikey
2. Update `.env`:
   ```
   AI_PROVIDER=gemini
   GEMINI_API_KEY=your_actual_key_here
   ```
3. Restart server: `npm run dev`

See `GEMINI_SETUP.md` for detailed instructions.

