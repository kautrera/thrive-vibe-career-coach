// Quick test data helper for Weekly Check-in integration
// Paste this in your browser console to add test data

// Add test Weekly Check-in data
const testWeeklyCheckIn = {
  id: Date.now().toString(),
  date: new Date().toISOString(),
  week: "12/23/2024 - 12/29/2024",
  responses: {
    'methodology-growth': 'This week I conducted comprehensive user research interviews with 8 participants to understand pain points in our checkout flow. I applied Jakob Nielsen\'s usability heuristics during the analysis and identified 3 critical UX issues that were impacting conversion rates.',
    'business-impact': 'My design work directly contributed to a 15% increase in conversion rates by redesigning the checkout process. I collaborated with the product team to implement A/B testing and tracked user behavior using Hotjar and Google Analytics.',
    'execution-delivery': 'I delivered wireframes, high-fidelity prototypes, and design specifications for the new dashboard interface. I ensured quality through design reviews with stakeholders and usability testing with 5 users.',
    'collaboration-advocacy': 'I facilitated 3 design workshops with cross-functional teams including engineering, product, and marketing. I advocated for user needs by presenting research findings and successfully convinced the team to prioritize accessibility improvements.'
  },
  goals: [
    'Complete user testing for the new dashboard design',
    'Finalize the design system documentation',
    'Conduct stakeholder interviews for Q1 planning'
  ],
  wins: [
    'Successfully launched the improved navigation system',
    'Reduced user task completion time by 30%',
    'Got approval for accessibility audit budget'
  ],
  blockers: [
    'Waiting for developer resources to implement responsive design',
    'Need more time for comprehensive usability testing',
    'Stakeholder alignment on design direction needed'
  ]
};

// Save to localStorage
localStorage.setItem('weeklyCheckInCurrent', JSON.stringify(testWeeklyCheckIn));

// Also add to saved entries
const savedEntries = [testWeeklyCheckIn];
localStorage.setItem('weeklyCheckIns', JSON.stringify(savedEntries));

console.log('✅ Test Weekly Check-in data added to localStorage!');
console.log('📝 Data includes:');
console.log('- 4 detailed weekly responses');
console.log('- 3 goals for next week');
console.log('- 3 wins/achievements');
console.log('- 3 blockers/challenges');
console.log('');
console.log('🎯 Now try:');
console.log('1. Go to IC Self-Assessment Worksheet');
console.log('2. Click on any competency card');
console.log('3. Click "Generate Text" button');
console.log('4. Watch it populate with your Weekly Check-in content!');