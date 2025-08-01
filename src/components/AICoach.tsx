'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  persona?: string;
}

interface Persona {
  id: string;
  name: string;
  specialty: string;
  description: string;
  avatar: string;
  sampleQuestions: string[];
  personality: string;
}

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string>('liz');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personas: Persona[] = [
    {
      id: 'liz',
      name: 'Liz Ryan',
      specialty: 'Human-Centered Career Reinvention',
      description: 'Expert in reinventing workplace culture and human-centered career development',
      avatar: '👩‍💼',
      sampleQuestions: [
        'How can I better align my work with my values?',
        'What does human-centered career growth look like?',
        'How do I advocate for workplace culture change?'
      ],
      personality: 'Warm, empowering, focuses on human potential and workplace transformation'
    },
    {
      id: 'lakrisha',
      name: 'Lakrisha Davis',
      specialty: 'Personal Branding & Corporate Navigation',
      description: 'LinkedIn personal branding expert and corporate landscape navigator',
      avatar: '💫',
      sampleQuestions: [
        'How can I build my personal brand on LinkedIn?',
        'What\'s the best way to navigate corporate politics?',
        'How do I increase my visibility at work?'
      ],
      personality: 'Strategic, authentic, focuses on building genuine professional presence'
    },
    {
      id: 'madeline',
      name: 'Madeline Mann',
      specialty: 'Job Search & Interview Strategy',
      description: 'HR expert providing rapid-fire job search and interview tips',
      avatar: '🎯',
      sampleQuestions: [
        'How can I improve my resume for UX roles?',
        'What are the best interview strategies?',
        'How do I negotiate salary effectively?'
      ],
      personality: 'Direct, actionable, provides quick wins and practical strategies'
    },
    {
      id: 'margaret',
      name: 'Margaret Buj',
      specialty: 'Promotion & Salary Negotiation',
      description: 'Interview coach specializing in promotions and salary negotiations',
      avatar: '💪',
      sampleQuestions: [
        'How do I ask for a promotion?',
        'What\'s the best approach to salary negotiation?',
        'How do I prepare for a promotion interview?'
      ],
      personality: 'Confident, results-focused, empowers through negotiation skills'
    }
  ];

  useEffect(() => {
    // Load saved conversations
    const savedMessages = localStorage.getItem('aiCoachMessages');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
    } else {
      // Welcome message
      setMessages([{
        id: '1',
        role: 'assistant',
        content: 'Welcome to your AI Career Coach! 🚀 I\'m here to help you navigate your UX career journey at Salesforce. Choose a coaching persona that matches what you need help with today, or just start chatting!',
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem('aiCoachMessages', JSON.stringify(newMessages));
  };

  const generateResponse = async (userMessage: string, persona: string): Promise<string> => {
    // Simulate AI response based on persona
    const currentPersona = personas.find(p => p.id === persona);
    
    const responses = {
      liz: [
        "I love that you're thinking about this from a human-centered perspective! Here's what I'd suggest...",
        "This is exactly the kind of workplace transformation question I'm passionate about. Let's break this down...",
        "Your intuition about needing change is spot on. Here's how we can approach this thoughtfully..."
      ],
      lakrisha: [
        "Great question about building your professional brand! Here's my strategic approach...",
        "I see this as a fantastic opportunity to strengthen your corporate presence. Let me share what works...",
        "LinkedIn is perfect for this! Here's how to authentically showcase your expertise..."
      ],
      madeline: [
        "Let me give you some rapid-fire tips that will make an immediate impact...",
        "From an HR perspective, here's exactly what you need to focus on...",
        "I've seen this situation many times - here are the strategies that work..."
      ],
      margaret: [
        "This is a perfect negotiation opportunity! Here's how to approach it confidently...",
        "You have more leverage than you think. Let me show you how to use it...",
        "Promotion conversations require preparation. Here's your action plan..."
      ]
    };

    const personaResponses = responses[persona as keyof typeof responses] || responses.liz;
    const randomResponse = personaResponses[Math.floor(Math.random() * personaResponses.length)];
    
    // Add specific advice based on common UX career topics
    const advice = [
      "Focus on building measurable impact in your design work.",
      "Document your design decisions and their business outcomes.",
      "Strengthen your cross-functional collaboration skills.",
      "Consider expanding your research and strategy capabilities.",
      "Build relationships with key stakeholders across the organization.",
      "Stay current with design system best practices and accessibility.",
      "Seek feedback regularly and act on it visibly."
    ];
    
    const randomAdvice = advice[Math.floor(Math.random() * advice.length)];
    
    return `${randomResponse}\n\n${randomAdvice}\n\nWhat specific aspect would you like to dive deeper into?`;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const response = await generateResponse(inputMessage, selectedPersona);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        persona: selectedPersona
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      saveMessages(finalMessages);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: 'Fresh start! What career challenge can I help you with today? 🌟',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    saveMessages([welcomeMessage]);
  };

  const askSampleQuestion = (question: string) => {
    setInputMessage(question);
  };

  const currentPersona = personas.find(p => p.id === selectedPersona);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg text-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="text-3xl">🤖</div>
          <div>
            <h1 className="text-3xl font-bold">AI Career Coach</h1>
            <p className="opacity-90">Get personalized career guidance from expert personas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Persona Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Your Coach</h2>
            <div className="space-y-3">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedPersona === persona.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{persona.avatar}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{persona.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{persona.specialty}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{persona.description}</p>
                </button>
              ))}
            </div>

            {/* Sample Questions */}
            {currentPersona && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Ask {currentPersona.name}:</h3>
                <div className="space-y-2">
                  {currentPersona.sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => askSampleQuestion(question)}
                      className="w-full text-left p-3 text-sm bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      💬 {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={clearConversation}
              className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🔄 Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col h-[600px]">
            {/* Active Persona Display */}
            {currentPersona && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{currentPersona.avatar}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{currentPersona.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{currentPersona.specialty}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.role === 'assistant' && message.persona && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">
                          {personas.find(p => p.id === message.persona)?.avatar}
                        </span>
                        <span className="text-sm font-semibold opacity-75">
                          {personas.find(p => p.id === message.persona)?.name}
                        </span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse">💭</div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {currentPersona?.name} is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={`Ask ${currentPersona?.name} about your career...`}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 dark:text-blue-400">🔒</span>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Privacy:</strong> Your conversations are stored locally on your device and remain completely private.
          </p>
        </div>
      </div>
    </div>
  );
}