/**
 * Test script for AI service
 * Run with: node test-ai.js
 */

import { scoreIdea } from './src/services/aiServiceRouter.js';

const testIdea = {
  title: 'Smart Campus Parking Finder',
  description: 'An AI-powered mobile app that helps students find available parking spots in real-time using IoT sensors installed in parking lots. The app will show live availability, allow reservations, and provide navigation to open spots. This will reduce time wasted searching for parking and decrease campus traffic congestion.',
  category: 'IT'
};

console.log('🧪 Testing AI Service...\n');
console.log('Test Idea:', testIdea.title);
console.log('Provider:', process.env.AI_PROVIDER || 'mock');
console.log('\n⏳ Analyzing...\n');

const startTime = Date.now();

scoreIdea(testIdea)
  .then(result => {
    const duration = Date.now() - startTime;
    
    console.log('✅ AI Scoring Complete!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Overall Score: ${result.aiScore}/100`);
    console.log(`📝 Clarity: ${result.clarityScore}/100`);
    console.log(`💡 Innovation: ${result.innovationScore}/100`);
    console.log(`⚙️  Feasibility: ${result.feasibilityScore}/100`);
    console.log(`🌟 Impact: ${result.impactScore}/100`);
    console.log(`📋 Status: ${result.status}`);
    console.log(`⏱️  Time: ${duration}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💬 AI Analysis:');
    console.log(result.aiAnalysis);
    console.log('\n✨ Test completed successfully!');
  })
  .catch(error => {
    console.error('❌ Test failed:', error.message);
    console.error(error);
    process.exit(1);
  });

