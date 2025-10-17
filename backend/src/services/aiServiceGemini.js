/**
 * Google Gemini AI Service
 * Uses Google's Gemini API for intelligent idea scoring
 * FREE TIER: 15 requests per minute, 1500 per day
 */

import { config } from '../config/config.js';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Score idea using Google Gemini AI
 * @param {Object} idea - Idea object with title, description, category
 * @returns {Promise<Object>} Scores and analysis
 */
export async function scoreIdeaWithGemini(idea) {
  const { title, description, category } = idea;
  
  if (!config.ai.geminiApiKey) {
    throw new Error('Gemini API key not configured. Set GEMINI_API_KEY in your .env file.');
  }

  try {
    const prompt = buildPrompt(title, description, category);
    const response = await callGeminiAPI(prompt);
    const result = parseGeminiResponse(response);
    
    return {
      aiScore: result.aiScore,
      clarityScore: result.clarityScore,
      innovationScore: result.innovationScore,
      feasibilityScore: result.feasibilityScore,
      impactScore: result.impactScore,
      aiAnalysis: result.analysis,
      status: determineStatus(result.aiScore),
      aiProcessed: true
    };
  } catch (error) {
    console.error('Gemini AI scoring error:', error);
    // Fallback to basic scoring on error
    return fallbackScoring(idea);
  }
}

/**
 * Build prompt for Gemini AI
 */
function buildPrompt(title, description, category) {
  return `You are an expert evaluator for a university innovation competition. Analyze the following idea submission and provide scores.

IDEA DETAILS:
Title: ${title}
Category: ${category}
Description: ${description}

SCORING CRITERIA:
Rate each dimension from 0-100:

1. CLARITY (0-100): How well-explained is the idea? Is it specific and detailed?
2. INNOVATION (0-100): How novel and creative is the solution? Does it use modern technology?
3. FEASIBILITY (0-100): How practical and achievable is this with available resources?
4. IMPACT (0-100): How much positive impact will this have on the campus community?

RESPONSE FORMAT (JSON only, no markdown):
{
  "clarityScore": [number 0-100],
  "innovationScore": [number 0-100],
  "feasibilityScore": [number 0-100],
  "impactScore": [number 0-100],
  "aiScore": [number 0-100, weighted average],
  "analysis": "[3-4 bullet points of constructive feedback, include emojis]"
}

SCORING GUIDELINES:
- Clarity: Check for specific details, examples, implementation steps
- Innovation: Look for novel approaches, modern tech (AI, IoT, sustainability)
- Feasibility: Consider resources, timeline, technical complexity
- Impact: Evaluate benefit to students/campus community
- Overall: Be fair but critical. Most ideas should score 60-75. Only exceptional ideas score 85+.

Return ONLY valid JSON, no other text.`;
}

/**
 * Call Gemini API
 */
async function callGeminiAPI(prompt) {
  const apiKey = config.ai.geminiApiKey;
  const url = `${GEMINI_API_ENDPOINT}?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.4, // Lower for more consistent scoring
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
    throw new Error('Invalid response format from Gemini API');
  }

  return data.candidates[0].content.parts[0].text;
}

/**
 * Parse Gemini API response
 */
function parseGeminiResponse(responseText) {
  try {
    // Remove markdown code blocks if present
    let cleanText = responseText.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/g, '');
    }
    
    const parsed = JSON.parse(cleanText);
    
    // Validate and constrain scores
    const clarityScore = Math.min(Math.max(parseInt(parsed.clarityScore) || 50, 0), 100);
    const innovationScore = Math.min(Math.max(parseInt(parsed.innovationScore) || 50, 0), 100);
    const feasibilityScore = Math.min(Math.max(parseInt(parsed.feasibilityScore) || 50, 0), 100);
    const impactScore = Math.min(Math.max(parseInt(parsed.impactScore) || 50, 0), 100);
    
    // Calculate weighted average if not provided or invalid
    let aiScore = parseInt(parsed.aiScore) || 0;
    if (aiScore === 0 || aiScore < 0 || aiScore > 100) {
      aiScore = Math.round(
        (clarityScore * 0.25) + 
        (innovationScore * 0.25) + 
        (feasibilityScore * 0.25) + 
        (impactScore * 0.25)
      );
    }
    
    const analysis = parsed.analysis || 'AI analysis generated successfully.';
    
    return {
      clarityScore,
      innovationScore,
      feasibilityScore,
      impactScore,
      aiScore,
      analysis
    };
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    console.error('Raw response:', responseText);
    throw new Error('Failed to parse AI response. Please try again.');
  }
}

/**
 * Determine status based on AI score
 */
function determineStatus(aiScore) {
  if (aiScore >= config.ai.draftThreshold) {
    return 'UNDER_REVIEW';
  }
  return 'DRAFT';
}

/**
 * Fallback scoring if API fails
 */
function fallbackScoring(idea) {
  const { title, description } = idea;
  const combinedLength = title.length + description.length;
  
  // Simple length-based scoring as fallback
  const baseScore = Math.min(30 + Math.floor(combinedLength / 10), 70);
  
  return {
    aiScore: baseScore,
    clarityScore: baseScore,
    innovationScore: baseScore,
    feasibilityScore: baseScore,
    impactScore: baseScore,
    aiAnalysis: '⚠️ AI analysis temporarily unavailable. Basic scoring applied.\n\nPlease ensure your idea is detailed and well-explained.',
    status: determineStatus(baseScore),
    aiProcessed: true
  };
}

export default {
  scoreIdeaWithGemini
};

