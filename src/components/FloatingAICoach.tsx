'use client';

import { useState, useEffect } from 'react';
import AICoach from './AICoach';

export default function FloatingAICoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>('liz');
  const [isOnAICoachPage, setIsOnAICoachPage] = useState(false);

  // Check if we're on the AI Coach page by looking for AI Coach elements
  useEffect(() => {
    const checkForAICoachPage = () => {
      // Look for the AI Coach component in the DOM
      const aiCoachElement = document.querySelector('[data-component="ai-coach"]');
      const isOnAICoachPage = !!aiCoachElement;
      setIsOnAICoachPage(isOnAICoachPage);
      
      // Debug logging
      console.log('FloatingAICoach: AI Coach element found?', isOnAICoachPage);
    };
    
    // Check initially and on DOM changes
    checkForAICoachPage();
    
    // Set up a mutation observer to watch for DOM changes
    const observer = new MutationObserver(checkForAICoachPage);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  // Load selected persona from AccountSettings
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      const preferences = JSON.parse(savedPrefs);
      setSelectedPersona(preferences.aiPersona || 'liz');
    }

    // Listen for persona changes
    const handleStorageChange = () => {
      const savedPrefs = localStorage.getItem('userPreferences');
      if (savedPrefs) {
        const preferences = JSON.parse(savedPrefs);
        if (preferences.aiPersona && preferences.aiPersona !== selectedPersona) {
          setSelectedPersona(preferences.aiPersona);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('aiPersonaUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('aiPersonaUpdated', handleStorageChange);
    };
  }, [selectedPersona]);

  // AI Coach personas matching AccountSettings
  const aiPersonas = {
    liz: { name: 'Empathetic', avatar: '👩‍💼' },
    lakrisha: { name: 'Polished', avatar: '💫' },
    madeline: { name: 'Strategic', avatar: '🎯' },
    margaret: { name: 'Assertive', avatar: '💪' }
  };

  const currentPersona = aiPersonas[selectedPersona as keyof typeof aiPersonas] || aiPersonas.liz;

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  // Don't show floating button on AI Coach page
  // Temporarily disabled for debugging
  // if (isOnAICoachPage) {
  //   console.log('FloatingAICoach: Hidden because on AI Coach page');
  //   return null;
  // }

  console.log('FloatingAICoach: Rendering floating button');

  return (
    <>
      {/* Floating AI Coach Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center border-2 border-white ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 transform rotate-45' 
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-110'
        }`}
        title={isOpen ? 'Close AI Coach' : `Chat with ${currentPersona.name} Coach`}
        style={{ zIndex: 9999 }}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        ) : (
          <span className="text-2xl">⭐</span>
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeChat}
          />
          
          {/* Chat Modal Content */}
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl h-[90vh] m-4 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Career Coach
              </h2>
              <button
                onClick={closeChat}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* AI Coach Component */}
            <div className="flex-1 overflow-hidden min-h-0">
              <AICoach />
            </div>
          </div>
        </div>
      )}
    </>
  );
}