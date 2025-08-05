'use client';

import { useState } from 'react';

interface V2MOMProps {
  onBackToDashboard?: () => void;
}

export default function V2MOM({ onBackToDashboard }: V2MOMProps) {
  const [activeSection, setActiveSection] = useState('vision');

  const sections = [
    { id: 'vision', label: 'Vision', icon: '👁️' },
    { id: 'values', label: 'Values', icon: '💎' },
    { id: 'methods', label: 'Methods', icon: '🛠️' },
    { id: 'obstacles', label: 'Obstacles', icon: '🚧' },
    { id: 'measures', label: 'Measures', icon: '📊' }
  ];

  const v2momData = {
    vision: {
      title: "Our Vision",
      content: "Commerce Cloud is the #1 AI-Powered, Growth-Generating Commerce platform on the planet. We deliver innovative leading-edge solutions for our customers to run their business using the C360 platform, focusing on AI and Data Cloud.",
      highlights: [
        "Beat Shopify across all segments",
        "Deliver consumer-grade shopper experiences", 
        "Accelerate time-to-value for merchants",
        "Enable seamless B2B and D2C commerce"
      ]
    },
    values: {
      title: "Our Values",
      content: "We are committed to excellence, innovation, and customer success in everything we do.",
      highlights: [
        "Customer First: Put customer needs at the center of every decision",
        "Innovation: Drive cutting-edge solutions and stay ahead of market trends",
        "Excellence: Deliver high-quality products and exceptional experiences",
        "Collaboration: Work together across teams and with partners",
        "Growth Mindset: Continuously learn and improve our capabilities"
      ]
    },
    methods: {
      title: "Our Methods",
      content: "Strategic initiatives to achieve our vision and compete effectively in the market.",
      highlights: [
        "Easy Self Implementation: Reduce partner dependency to ≤80%",
        "User-Friendly Merchant UI: Reimagined Commerce App with ≤5 clicks for any task",
        "Superior Shopper Experience: Consumer Grade Index score of 'A' across all pages",
        "Enhanced Checkout & Conversion: 50%+ adoption of Managed Checkout with 1-click authentication",
        "AI-Powered Commerce: Launch Copilot for Merchants and Shoppers",
        "B2B Commerce Leadership: Protect and grow with C360 integrations",
        "OMS Market Expansion: Deep D2C integration and Service Cloud attachment",
        "Strategic Partnerships: Amazon, Meta, and Adyen integrations"
      ]
    },
    obstacles: {
      title: "Our Obstacles",
      content: "Key challenges we need to overcome to achieve our goals.",
      highlights: [
        "Strategy Changes: Material changes to product strategy could impact FY25 deliverables",
        "Resource Constraints: Team operating with 3 HCs down while maintaining stretch goals",
        "Time Zone Coordination: Managing collaboration across different global time zones",
        "Competitive Pressure: Shopify's aggressive expansion into our market segments",
        "Technical Complexity: Balancing innovation speed with platform stability"
      ]
    },
    measures: {
      title: "Our Measures",
      content: "Key performance indicators to track our progress and success.",
      highlights: [
        "Partner Attach Rate: Reduce to ≤80% for D2C customers",
        "Time to Value: Decrease setup time by 80% with automated configuration",
        "Consumer Grade Index: Achieve 'A' score across all commerce pages",
        "Conversion Metrics: 50%+ adoption of Managed Checkout solutions",
        "Customer Growth: 60% YoY growth in B2B ACV",
        "AI Adoption: Successful launch of Commerce Copilot features",
        "Market Share: Maintain leadership in B2B while competing in D2C",
        "Customer Satisfaction: >4.0 benchmark scores across all products"
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Back to Dashboard */}
      {onBackToDashboard && (
        <button 
          onClick={onBackToDashboard}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">FY25 V2MOM</h1>
          <p className="text-xl opacity-90">Vision • Values • Methods • Obstacles • Measures</p>
          <p className="text-lg mt-2 opacity-80">Commerce Cloud Strategic Framework</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Overall Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">V2MOM Implementation</span>
              <span className="text-gray-900 dark:text-white font-medium">72%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300" style={{ width: '72%' }}></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {sections.map((section) => (
              <div key={section.id} className="text-center">
                <div className="text-2xl mb-1">{section.icon}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{section.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">Active</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all font-medium ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <span className="font-semibold">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">{sections.find(s => s.id === activeSection)?.icon}</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {v2momData[activeSection as keyof typeof v2momData].title}
            </h2>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {v2momData[activeSection as keyof typeof v2momData].content}
            </p>
            
            <div className="space-y-4">
              {v2momData[activeSection as keyof typeof v2momData].highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export V2MOM</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>View Analytics</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share V2MOM</span>
          </button>
        </div>
      </div>
    </div>
  );
}