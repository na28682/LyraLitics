import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Sparkles, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Zap,
  ArrowRight,
  Play
} from 'lucide-react';

const WelcomeScreen = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Detect user's name from various sources
    const detectUserName = async () => {
      try {
        // Try to get name from Google account if available
        if (window.google && window.google.accounts) {
          const googleUser = window.google.accounts.oauth2.getToken();
          if (googleUser) {
            const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: { Authorization: `Bearer ${googleUser.access_token}` }
            });
            const userInfo = await response.json();
            setUserName(userInfo.given_name || userInfo.name);
            return;
          }
        }

        // Try to get from localStorage
        const savedName = localStorage.getItem('lyralytics_user_name');
        if (savedName) {
          setUserName(savedName);
          return;
        }

        // Try to get from browser's autofill or other sources
        const possibleNames = [
          navigator.userAgent.includes('Chrome') ? 'Chrome User' : null,
          'Creator',
          'Analyst',
          'Social Media Expert'
        ].filter(Boolean);

        setUserName(possibleNames[0] || 'Creator');
      } catch (error) {
        console.log('Could not detect user name:', error);
        setUserName('Creator');
      } finally {
        setIsLoading(false);
      }
    };

    detectUserName();
  }, []);

  const handleGetStarted = () => {
    if (userName && userName !== 'Creator') {
      localStorage.setItem('lyralytics_user_name', userName);
    }
    navigate('/connect');
  };

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track your social media performance across all platforms"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Smart Insights",
      description: "AI-powered recommendations to grow your audience"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Audience Analysis",
      description: "Understand your followers and optimize content"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automated Workflows",
      description: "Save time with automated reporting and scheduling"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bubble-bg">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bubble-bg overflow-hidden">
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h1 className="text-6xl md:text-8xl font-bubble font-bold bubble-text">
              Welcome
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-3xl md:text-5xl font-bubble font-bold text-white mb-4"
          >
            {userName}!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
          >
            Ready to transform your social media presence with AI-powered analytics?
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl w-full"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
              className="glass-effect rounded-2xl p-6 text-center social-card"
            >
              <div className="text-primary-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="group bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6" />
            Get Started
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <p className="text-white/70 mt-4 text-sm">
            Connect your social media accounts to get started
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 