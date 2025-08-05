# 🚀 Thrive Vibe Career Coach

A comprehensive career development platform built with Next.js, featuring AI-powered coaching, strategic planning, and professional growth tracking.

## ✨ Features

### 🎯 Core Functionality
- **Role-Based Assessment**: Comprehensive IC and Manager self-assessment tools
- **V2MOM Strategic Framework**: Visual strategic planning and progress tracking
- **Weekly & Quarterly Check-ins**: Regular performance and goal tracking
- **AI Career Coach**: Personalized coaching with voice input/output capabilities
- **Progress Dashboard**: Visual progress tracking across all development areas

### 🤖 AI-Powered Features
- **Intelligent Coaching**: Multiple personality-based coaching styles (Empathetic, Polished, Strategic, Assertive)
- **Voice Integration**: Speech-to-text input and text-to-speech output
- **Floating AI Assistant**: Global access to AI coach from any page
- **Chat History**: Persistent conversation history with categorization

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark Mode Support**: Complete dark/light theme switching
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Professional UI**: Modern, clean interface with smooth animations

## 🛠️ Technology Stack

- **Framework**: Next.js 15.4.5 with Turbopack
- **Frontend**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with localStorage persistence
- **Voice Features**: Web Speech API integration
- **Deployment**: Vercel-optimized with automatic deployments

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with speech API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/thrive-vibe-career-coach.git
   cd thrive-vibe-career-coach
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 📱 Usage Guide

### Getting Started
1. **Role Selection**: Choose between Individual Contributor (IC) or Manager role
2. **Profile Setup**: Configure your name, level, and AI coach preferences in Account Settings
3. **Dashboard Overview**: View your progress across assessments, check-ins, and strategic goals

### Core Features
- **Self Assessment**: Complete comprehensive skill evaluations with evidence-based responses
- **Weekly Check-ins**: Track weekly progress, goals, and blockers
- **Quarterly Reviews**: Conduct thorough performance reviews and planning sessions
- **V2MOM Planning**: Engage with strategic framework (Vision, Values, Methods, Obstacles, Measures)
- **AI Coaching**: Get personalized career guidance with voice-enabled conversations

### AI Coach Features
- **Voice Input**: Click and speak your questions or use text input
- **Personality Selection**: Choose coaching style (Empathetic, Polished, Strategic, Assertive)
- **Floating Access**: Use the floating AI button for quick access from any page
- **Chat History**: Review past conversations organized by topic

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Main application entry point
├── components/            # React components
│   ├── AICoach.tsx        # AI coaching interface with voice features
│   ├── AccountSettings.tsx # User profile and preferences
│   ├── Dashboard.tsx      # Main dashboard with progress tracking
│   ├── FloatingAICoach.tsx # Global floating AI assistant
│   ├── ICWorksheet.tsx    # Individual contributor assessment
│   ├── ManagerWorksheet.tsx # Manager assessment tools
│   ├── Navigation.tsx     # Global navigation component
│   ├── QuarterlyCheckIn.tsx # Quarterly review interface
│   ├── V2MOM.tsx         # Strategic framework interface
│   └── WeeklyCheckIn.tsx  # Weekly progress tracking
├── data/                  # Data models and types
│   └── careerFramework.ts # Career progression framework data
└── types/                 # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```bash
NEXT_PUBLIC_APP_NAME="Thrive Vibe Career Coach"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_ENABLE_VOICE_FEATURES=true
```

### Deployment Configuration
- **Vercel**: Automatic deployment with `vercel.json` configuration
- **Netlify**: Compatible with standard Next.js build process
- **GitHub Pages**: Requires static export configuration

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Automatic deployments on every push to main branch
3. Preview deployments for pull requests
4. Built-in analytics and performance monitoring

### Option 2: Netlify
1. Connect repository to Netlify
2. Configure build settings (build command: `npm run build`)
3. Set publish directory to `.next`
4. Enable automatic deployments

### Option 3: Manual Deployment
1. Build the application: `npm run build`
2. Deploy the `.next` folder to your hosting provider
3. Configure your server to serve the Next.js application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] **Advanced Analytics**: Detailed progress analytics and insights
- [ ] **Team Features**: Manager team overview and team assessments
- [ ] **Integration APIs**: Connect with HR systems and performance tools
- [ ] **Mobile App**: Native mobile application for iOS and Android
- [ ] **Advanced AI**: GPT-4 integration for enhanced coaching capabilities
- [ ] **Collaboration Tools**: Peer feedback and 360-degree reviews

## 🔒 Privacy & Security

- **Local Storage**: All user data stored locally in browser
- **No External Data**: No personal data sent to external services
- **Privacy-First**: Voice data processed locally when possible
- **Secure**: HTTPS-only deployment with security headers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and design inspiration from various open-source projects
- Career framework based on industry best practices

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ for career growth and professional development**