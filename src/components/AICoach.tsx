'use client';

import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastMessage: Date;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  style: string;
}

export default function AICoach() {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [currentChat, setCurrentChat] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('polished');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiPersonas = [
    {
      id: 'empathetic',
      name: 'Empathetic',
      description: 'Warm and understanding approach focused on emotional intelligence and personal growth',
      style: 'supportive and encouraging'
    },
    {
      id: 'polished',
      name: 'Polished',
      description: 'Professional development expert focused on executive presence and strategic career moves',
      style: 'professional and strategic'
    },
    {
      id: 'strategic',
      name: 'Strategic',
      description: 'Forward-thinking advisor focused on long-term career planning and market positioning',
      style: 'analytical and forward-thinking'
    },
    {
      id: 'assertive',
      name: 'Assertive',
      description: 'Direct communication coach focused on confidence building and leadership presence',
      style: 'direct and confident'
    }
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistories = localStorage.getItem('aiCoachChatHistories');
    const savedCurrentChatId = localStorage.getItem('aiCoachCurrentChatId');
    const savedCurrentChat = localStorage.getItem('aiCoachCurrentChat');
    const savedPersona = localStorage.getItem('aiPersona');

    if (savedHistories) {
      setChatHistories(JSON.parse(savedHistories));
    }

    if (savedCurrentChatId) {
      setCurrentChatId(savedCurrentChatId);
    }

    if (savedCurrentChat) {
      setCurrentChat(JSON.parse(savedCurrentChat).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }

    if (savedPersona) {
      setSelectedPersona(savedPersona);
    }

    // Listen for persona updates from AccountSettings
    const handlePersonaUpdate = (event: CustomEvent) => {
      setSelectedPersona(event.detail.persona);
    };

    window.addEventListener('aiPersonaUpdated', handlePersonaUpdate as EventListener);

    return () => {
      window.removeEventListener('aiPersonaUpdated', handlePersonaUpdate as EventListener);
    };
  }, []);

  // Save current chat to localStorage whenever it changes
  useEffect(() => {
    if (currentChat.length > 0) {
      localStorage.setItem('aiCoachCurrentChat', JSON.stringify(currentChat));
    }
  }, [currentChat]);

  // Save chat histories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('aiCoachChatHistories', JSON.stringify(chatHistories));
  }, [chatHistories]);

  // Save current chat ID to localStorage whenever it changes
  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('aiCoachCurrentChatId', currentChatId);
    }
  }, [currentChatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  const generateResponse = (userMessage: string, persona: any) => {
    const responses = [
      `Based on your question about "${userMessage.slice(0, 50)}...", I'd recommend focusing on developing your core competencies in that area. Consider breaking down your goals into specific, measurable actions.`,
      `That's an excellent question about career development. From my experience, the key is to build a strategic approach that aligns with your long-term goals while addressing immediate growth opportunities.`,
      `I understand you're looking for guidance on "${userMessage.slice(0, 50)}...". Let me share some insights that could help you navigate this challenge effectively.`,
      `Thank you for sharing that with me. Career growth often requires a multi-faceted approach. Consider leveraging your existing strengths while identifying areas for strategic improvement.`,
      `Your question touches on an important aspect of professional development. I'd suggest creating a structured plan that includes both skill development and network building.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

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
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setInputMessage(prev => prev + finalTranscript);
        }
      };
      
      recognition.onerror = () => {
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
      
      // Store recognition instance to stop it later
      (window as any).currentRecognition = recognition;
    }
  };

  const stopRecording = () => {
    if ((window as any).currentRecognition) {
      (window as any).currentRecognition.stop();
      setIsRecording(false);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    const currentPersona = aiPersonas.find(p => p.id === selectedPersona) || aiPersonas[1];
    
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      content: userMessage,
      role: 'user',
      timestamp: new Date()
    };

    setCurrentChat(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(userMessage, currentPersona),
        role: 'assistant',
        timestamp: new Date()
      };

      setCurrentChat(prev => [...prev, aiResponse]);
      setIsLoading(false);

      // Speak the AI response
      speakMessage(aiResponse.content);
    }, 1000 + Math.random() * 2000);
  };

  const startNewChat = () => {
    if (currentChat.length > 0) {
      // Save current chat to history
      const newHistory: ChatHistory = {
        id: Date.now().toString(),
        title: currentChat[0]?.content.slice(0, 50) || 'New Conversation',
        messages: currentChat,
        lastMessage: new Date()
      };
      
      setChatHistories(prev => [newHistory, ...prev]);
    }
    
    setCurrentChat([]);
    setCurrentChatId(null);
    localStorage.removeItem('aiCoachCurrentChat');
    localStorage.removeItem('aiCoachCurrentChatId');
  };

  const loadChatHistory = (history: ChatHistory) => {
    setCurrentChat(history.messages);
    setCurrentChatId(history.id);
    setIsSidebarOpen(false);
  };

  const deleteChatHistory = (historyId: string) => {
    setChatHistories(prev => prev.filter(h => h.id !== historyId));
    if (currentChatId === historyId) {
      setCurrentChat([]);
      setCurrentChatId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col" data-component="ai-coach">
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

      <div className="flex-1 flex min-h-0">
        <div className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} w-80 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={startNewChat}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              + New Chat
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Chat History</h3>
            <div className="space-y-2">
              {chatHistories.map((history) => (
                <div key={history.id} className="group">
                  <button
                    onClick={() => loadChatHistory(history)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentChatId === history.id
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm truncate">{history.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {history.lastMessage.toLocaleDateString()}
                    </div>
                  </button>
                  <button
                    onClick={() => deleteChatHistory(history.id)}
                    className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 p-1 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {currentChat.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI Career Coach</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Get personalized career guidance from your AI coach. Ask about career development, skill building, or strategic planning.
                </p>
              </div>
            ) : (
              currentChat.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}>
                    <div className="text-sm mb-1 opacity-70">
                      {message.role === 'user' ? 'You' : 'AI Career Coach'}
                    </div>
                    <div>{message.content}</div>
                    <div className="text-xs opacity-50 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

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