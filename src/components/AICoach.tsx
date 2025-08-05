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
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatHistories, setChatHistories] = useState<Array<{id: string, title: string, messages: Message[], date: Date}>>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [selectedPersona, setSelectedPersona] = useState<string>('liz');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // AI Coach personas matching AccountSettings
  const aiPersonas = {
    liz: {
      id: 'liz',
      name: 'Empathetic',
      description: 'Human-centered career reinvention',
      avatar: '👩‍💼',
      personality: 'I take a human-centered approach to career development, focusing on aligning work with personal values and creating authentic professional growth. I believe in compassionate leadership and finding meaningful connections in your career journey.'
    },
    lakrisha: {
      id: 'lakrisha', 
      name: 'Polished',
      description: 'Personal branding & LinkedIn',
      avatar: '💫',
      personality: 'I specialize in building your professional brand and LinkedIn presence. I focus on polished communication, strategic networking, and creating a strong professional image that opens doors to new opportunities.'
    },
    madeline: {
      id: 'madeline',
      name: 'Strategic', 
      description: 'Job search & interview tips',
      avatar: '🎯',
      personality: 'I provide strategic, data-driven career advice focused on job search tactics, interview preparation, and tactical career moves. I help you approach your career with clear goals and actionable plans.'
    },
    margaret: {
      id: 'margaret',
      name: 'Assertive',
      description: 'Promotion & salary negotiation', 
      avatar: '💪',
      personality: 'I empower you to advocate for yourself confidently. I focus on promotion strategies, salary negotiation tactics, and building the assertiveness needed to advance your career and secure what you deserve.'
    }
  };

  // Sample questions for the AI Career Coach
  const sampleQuestions = [
    'How can I better align my work with my values?',
    'How can I improve my resume for UX roles?',
    'What\'s the best way to navigate corporate politics?',
    'How do I ask for a promotion?',
    'What are the best interview strategies?',
    'How do I negotiate salary effectively?',
    'How can I build my personal brand on LinkedIn?',
    'How do I increase my visibility at work?'
  ];

  useEffect(() => {
    // Load selected persona from AccountSettings
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      const preferences = JSON.parse(savedPrefs);
      setSelectedPersona(preferences.aiPersona || 'liz');
    }

    // Load chat histories
    const savedHistories = localStorage.getItem('aiCoachHistories');
    if (savedHistories) {
      const parsed = JSON.parse(savedHistories);
      setChatHistories(parsed.map((chat: any) => ({ 
        ...chat, 
        date: new Date(chat.date),
        messages: chat.messages.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) }))
      })));
    }

    // Load current chat or create new one
    const savedCurrentChat = localStorage.getItem('aiCoachCurrentChat');
    if (savedCurrentChat) {
      setCurrentChatId(savedCurrentChat);
      const savedMessages = localStorage.getItem(`aiCoachChat_${savedCurrentChat}`);
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
      }
    } else {
      // Create initial chat
      const newChatId = Date.now().toString();
      setCurrentChatId(newChatId);
      const currentPersona = aiPersonas[selectedPersona as keyof typeof aiPersonas];
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content: `Welcome to your AI Career Coach! 🚀 I'm ${currentPersona.name}, and I'm here to help with ${currentPersona.description.toLowerCase()}. Ask me anything about career development, skills, promotions, or workplace challenges!`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      saveCurrentChat(newChatId, [welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen for persona changes from Account Settings
  useEffect(() => {
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
    
    // Also listen for custom events when preferences change within the same window
    const handlePreferenceChange = () => {
      handleStorageChange();
    };
    window.addEventListener('aiPersonaUpdated', handlePreferenceChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('aiPersonaUpdated', handlePreferenceChange);
    };
  }, [selectedPersona]);

  const saveCurrentChat = (chatId: string, messages: Message[]) => {
    localStorage.setItem(`aiCoachChat_${chatId}`, JSON.stringify(messages));
    localStorage.setItem('aiCoachCurrentChat', chatId);
  };

  const saveChatHistories = (histories: Array<{id: string, title: string, messages: Message[], date: Date}>) => {
    localStorage.setItem('aiCoachHistories', JSON.stringify(histories));
  };

  // Voice functionality
  const startRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
      };
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setInputMessage(prev => prev + transcript);
          } else {
            interimTranscript += transcript;
          }
        }
      };
      
      recognition.onerror = () => {
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const currentPersona = aiPersonas[selectedPersona as keyof typeof aiPersonas];
    
    // Persona-specific responses based on their personality
    const personaResponses = {
      liz: [
        "I hear you, and I want you to know that your feelings about this are completely valid. Let's explore this together...",
        "Your career journey is unique to you, and I believe in taking a human-centered approach to this challenge...",
        "This sounds like an opportunity to align your work more closely with your authentic self...",
        "I love that you're thinking about the human side of your career. Here's how we can approach this compassionately..."
      ],
      lakrisha: [
        "Excellent question! This is exactly the kind of strategic thinking that will elevate your professional brand...",
        "Let's polish this approach and make sure you're presenting your best professional self...",
        "Your LinkedIn presence and professional brand are key here. Here's how to make this work for you...",
        "I can help you craft a polished strategy that will make you stand out professionally..."
      ],
      madeline: [
        "Great strategic question! Let's break this down into actionable steps...",
        "This is exactly the kind of tactical thinking that drives career success. Here's my data-driven approach...",
        "I love goal-oriented questions like this. Let's create a clear roadmap...",
        "Strategic career moves require careful planning. Here's how to approach this systematically..."
      ],
      margaret: [
        "This is your time to advocate for yourself! Let's build your confidence around this...",
        "You deserve to advance in your career, and I'm here to help you fight for it...",
        "Time to be assertive about your career goals. Here's how to approach this with confidence...",
        "I believe in your ability to secure what you deserve. Let's strategize how to make this happen..."
      ]
    };

    const responses = personaResponses[selectedPersona as keyof typeof personaResponses] || personaResponses.liz;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add specific advice based on persona specialty
    const personaAdvice = {
      liz: [
        "Focus on work that aligns with your values and brings you fulfillment.",
        "Build authentic relationships and create psychological safety for your team.",
        "Remember that career growth should feel sustainable and true to who you are.",
        "Consider how this decision impacts your overall well-being and work-life harmony."
      ],
      lakrisha: [
        "Update your LinkedIn profile to reflect this new direction.",
        "Network strategically with people who can support your career goals.", 
        "Craft your professional narrative to highlight your unique value proposition.",
        "Build your personal brand around your expertise and professional achievements."
      ],
      madeline: [
        "Document your achievements with specific metrics and outcomes.",
        "Research industry benchmarks and prepare data to support your case.",
        "Practice your pitch and anticipate potential objections or questions.",
        "Set clear timelines and follow-up plans for your career initiatives."
      ],
      margaret: [
        "Negotiate from a position of strength - know your worth and articulate it clearly.",
        "Don't be afraid to ask for what you want - the worst they can say is no.",
        "Prepare evidence of your impact and be ready to advocate for your contributions.",
        "Set boundaries and stand firm on your non-negotiables."
      ]
    };

    const advice = personaAdvice[selectedPersona as keyof typeof personaAdvice] || personaAdvice.liz;
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
      
      const response = await generateResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      saveCurrentChat(currentChatId, finalMessages);
      
      // Automatically speak the AI response
      speakMessage(response);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: 'Fresh start! What career challenge can I help you with today? 🌟',
      timestamp: new Date()
    };
    
    // Save current chat to history before creating new one
    if (currentChatId && messages.length > 1) {
      const currentChatTitle = messages[1]?.content.slice(0, 50) + '...' || 'Chat';
      const newHistory = {
        id: currentChatId,
        title: currentChatTitle,
        messages: messages,
        date: new Date()
      };
      const updatedHistories = [...chatHistories, newHistory];
      setChatHistories(updatedHistories);
      saveChatHistories(updatedHistories);
    }
    
    setCurrentChatId(newChatId);
    setMessages([welcomeMessage]);
    saveCurrentChat(newChatId, [welcomeMessage]);
  };

  const loadChatHistory = (chatId: string) => {
    const chat = chatHistories.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      saveCurrentChat(chatId, chat.messages);
    }
  };

  const askSampleQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col" data-component="ai-coach">
      {/* Mobile Menu Toggle */}
      <div className="p-6 pb-0 flex justify-end lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-6 min-h-0">
        <div className="relative flex gap-6 h-full">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Chat History Sidebar */}
        <div className={`w-80 flex-shrink-0 transition-transform duration-300 z-50 ${
          isSidebarOpen 
            ? 'fixed left-4 top-20 bottom-4 lg:relative lg:left-auto lg:top-auto lg:bottom-auto' 
            : 'hidden lg:block'
        }`}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat History</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={createNewChat}
                  className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  + New Chat
                </button>
                {/* Close button for mobile */}
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="space-y-2 flex-1 overflow-y-auto">
              {chatHistories.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => loadChatHistory(chat.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    currentChatId === chat.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">{chat.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {chat.date.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.messages.length} messages
                  </p>
                </button>
              ))}
              
              {chatHistories.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm py-4">
                  No previous chats yet
                </p>
              )}
            </div>

            {/* Sample Questions */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Quick Start:</h3>
              <div className="space-y-2">
                {sampleQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => askSampleQuestion(question)}
                    className="w-full text-left p-2 text-xs bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    💬 {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col h-full">
            {/* AI Coach Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{aiPersonas[selectedPersona as keyof typeof aiPersonas]?.avatar || '🤖'}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{aiPersonas[selectedPersona as keyof typeof aiPersonas]?.name} Coach</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{aiPersonas[selectedPersona as keyof typeof aiPersonas]?.description}</p>
                  </div>
                </div>
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center space-x-1"
                  >
                    <span>🔇</span>
                    <span>Stop</span>
                  </button>
                )}
              </div>
            </div>

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
                    {message.role === 'assistant' && (
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{aiPersonas[selectedPersona as keyof typeof aiPersonas]?.avatar || '🤖'}</span>
                          <span className="text-sm font-semibold opacity-75">{aiPersonas[selectedPersona as keyof typeof aiPersonas]?.name} Coach</span>
                        </div>
                        <button
                          onClick={() => speakMessage(message.content)}
                          className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors"
                          title="Listen to response"
                        >
                          🔊
                        </button>
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
                        {aiPersonas[selectedPersona as keyof typeof aiPersonas]?.name} Coach is thinking...
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
                  placeholder="Ask your AI Career Coach about career development..."
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                  title={isRecording ? 'Stop recording' : 'Start voice input'}
                >
                  {isRecording ? '⏹️' : '🎤'}
                </button>
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
