import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Youtube, 
  Instagram, 
  Twitter, 
  Chrome,
  CheckCircle,
  XCircle,
  ArrowRight,
  Shield,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';

const SocialConnect = () => {
  const [connecting, setConnecting] = useState({});
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: false,
    instagram: false,
    twitter: false,
    youtube: false
  });
  const navigate = useNavigate();
  const { updateConnectedAccounts } = useAuth();

  const platforms = [
    {
      id: 'google',
      name: 'Google',
      icon: <Chrome className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      description: 'Connect your Google account for personalized analytics',
      scopes: ['profile', 'email', 'youtube.readonly']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <Youtube className="w-8 h-8" />,
      color: 'from-red-500 to-red-700',
      description: 'Analyze your YouTube channel performance and trends',
      scopes: ['youtube.readonly', 'youtube.force-ssl']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-8 h-8" />,
      color: 'from-pink-500 to-purple-600',
      description: 'Track your Instagram engagement and growth',
      scopes: ['instagram_basic', 'instagram_content_publish']
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter className="w-8 h-8" />,
      color: 'from-blue-400 to-blue-600',
      description: 'Monitor your Twitter analytics and audience insights',
      scopes: ['tweet.read', 'users.read', 'offline.access']
    }
  ];

  const handleConnect = async (platformId) => {
    setConnecting(prev => ({ ...prev, [platformId]: true }));
    
    try {
      switch (platformId) {
        case 'google':
          await connectGoogle();
          break;
        case 'youtube':
          await connectYouTube();
          break;
        case 'instagram':
          await connectInstagram();
          break;
        case 'twitter':
          await connectTwitter();
          break;
        default:
          throw new Error('Unknown platform');
      }
      
      setConnectedAccounts(prev => ({ ...prev, [platformId]: true }));
      updateConnectedAccounts({ [platformId]: true });
      toast.success(`${platforms.find(p => p.id === platformId)?.name} connected successfully!`);
      
    } catch (error) {
      console.error(`Error connecting ${platformId}:`, error);
      toast.error(`Failed to connect ${platforms.find(p => p.id === platformId)?.name}`);
    } finally {
      setConnecting(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const connectGoogle = async () => {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject(new Error('Google API not loaded'));
        return;
      }

      window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error));
          } else {
            localStorage.setItem('google_token', response.access_token);
            resolve(response);
          }
        },
      }).requestAccessToken();
    });
  };

  const connectYouTube = async () => {
    // YouTube uses the same Google OAuth flow
    return connectGoogle();
  };

  const connectInstagram = async () => {
    return new Promise((resolve, reject) => {
      // Instagram Basic Display API
      const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/instagram/callback')}&scope=user_profile,user_media&response_type=code`;
      
      const popup = window.open(instagramAuthUrl, 'instagram-auth', 'width=500,height=600');
      
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          reject(new Error('Authentication cancelled'));
        }
      }, 1000);

      window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'INSTAGRAM_AUTH_SUCCESS') {
          clearInterval(checkClosed);
          popup.close();
          localStorage.setItem('instagram_token', event.data.token);
          resolve(event.data);
        }
      });
    });
  };

  const connectTwitter = async () => {
    return new Promise((resolve, reject) => {
      // Twitter OAuth 2.0 PKCE flow
      const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/twitter/callback')}&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;
      
      const popup = window.open(twitterAuthUrl, 'twitter-auth', 'width=500,height=600');
      
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          reject(new Error('Authentication cancelled'));
        }
      }, 1000);

      window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'TWITTER_AUTH_SUCCESS') {
          clearInterval(checkClosed);
          popup.close();
          localStorage.setItem('twitter_token', event.data.token);
          resolve(event.data);
        }
      });
    });
  };

  const handleContinue = () => {
    const connectedCount = Object.values(connectedAccounts).filter(Boolean).length;
    if (connectedCount === 0) {
      toast.error('Please connect at least one social media account to continue');
      return;
    }
    navigate('/dashboard');
  };

  const connectedCount = Object.values(connectedAccounts).filter(Boolean).length;

  return (
    <div className="min-h-screen bubble-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bubble font-bold bubble-text mb-4">
            Connect Your Accounts
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Connect your social media accounts to start analyzing your performance and getting AI-powered insights
          </p>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 mb-8 flex items-center gap-4"
        >
          <Shield className="w-8 h-8 text-green-400" />
          <div>
            <h3 className="text-white font-semibold mb-1">Your data is secure</h3>
            <p className="text-white/80 text-sm">
              We use industry-standard OAuth 2.0 authentication. Your passwords are never stored, and you can revoke access at any time.
            </p>
          </div>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`glass-effect rounded-2xl p-6 social-card ${
                connectedAccounts[platform.id] ? 'ring-2 ring-green-400' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${platform.color}`}>
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {platform.name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {platform.description}
                    </p>
                  </div>
                </div>
                
                {connectedAccounts[platform.id] ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-white/60">
                  {platform.scopes.join(', ')}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConnect(platform.id)}
                  disabled={connecting[platform.id] || connectedAccounts[platform.id]}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    connectedAccounts[platform.id]
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : connecting[platform.id]
                      ? 'bg-gray-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg'
                  }`}
                >
                  {connecting[platform.id] ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connecting...
                    </div>
                  ) : connectedAccounts[platform.id] ? (
                    'Connected'
                  ) : (
                    'Connect'
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress and Continue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="mb-6">
            <div className="flex justify-between text-white/80 mb-2">
              <span>Connected accounts</span>
              <span>{connectedCount}/4</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(connectedCount / 4) * 100}%` }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            disabled={connectedCount === 0}
            className={`px-8 py-4 rounded-full text-xl font-semibold transition-all flex items-center gap-3 mx-auto ${
              connectedCount === 0
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-2xl'
            }`}
          >
            Continue to Dashboard
            <ArrowRight className="w-6 h-6" />
          </motion.button>
          
          {connectedCount === 0 && (
            <p className="text-white/60 mt-4 text-sm">
              Connect at least one account to continue
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SocialConnect; 