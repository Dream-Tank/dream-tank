/**
 * AI Service Router
 * Routes between mock and real AI service based on configuration
 */

import { config } from '../config/config.js';
import { scoreIdea as scoreIdeaMock } from './aiService.js';
import { scoreIdeaWithGemini } from './aiServiceGemini.js';

/**
 * Main scoring function that routes to appropriate AI service
 * @param {Object} idea - Idea object with title, description, category
 * @returns {Promise<Object>} Scores and analysis
 */
export async function scoreIdea(idea) {
  const provider = config.ai.provider;
  
  console.log(`🤖 Using AI provider: ${provider}`);
  
  if (provider === 'gemini') {
    // Use real Gemini AI
    return await scoreIdeaWithGemini(idea);
  } else {
    // Use mock AI (returns synchronously, wrap in Promise for consistency)
    return Promise.resolve(scoreIdeaMock(idea));
  }
}

export default {
  scoreIdea
};

