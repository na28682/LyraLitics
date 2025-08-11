'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  TrendingUp, 
  TrendingDown, 
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  AlertTriangle,
  Zap,
  Target,
  Activity,
  Globe
} from 'lucide-react'

export default function SocialMediaMonitor() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [isMonitoring, setIsMonitoring] = useState(true)

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Globe, color: 'from-cyan-400 to-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-400 to-purple-500' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-400 to-orange-500' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-cyan-500' },
  ]

  const metrics = [
    { label: 'Total Reach', value: '2.4M', change: '+18.5%', trend: 'up', icon: Eye, color: 'from-blue-400 to-cyan-500' },
    { label: 'Engagement Rate', value: '8.7%', change: '+12.3%', trend: 'up', icon: Heart, color: 'from-pink-400 to-red-500' },
    { label: 'Comments', value: '45.2K', change: '+25.1%', trend: 'up', icon: MessageCircle, color: 'from-green-400 to-emerald-500' },
    { label: 'Shares', value: '89.7K', change: '+31.2%', trend: 'up', icon: Share2, color: 'from-purple-400 to-pink-500' },
  ]

  const trendingTopics = [
    { topic: '#Cyberpunk2024', mentions: '125K', growth: '+45%', sentiment: 'positive', platform: 'Twitter' },
    { topic: '#TechTrends', mentions: '89K', growth: '+23%', sentiment: 'positive', platform: 'Instagram' },
    { topic: '#DigitalMarketing', mentions: '67K', growth: '+18%', sentiment: 'neutral', platform: 'YouTube' },
    { topic: '#AIRevolution', mentions: '156K', growth: '+67%', sentiment: 'positive', platform: 'All' },
  ]

  const topPosts = [
    { 
      platform: 'Instagram', 
      content: 'Quantum computing breakthrough announcement', 
      engagement: '89.2K', 
      reach: '2.1M', 
      time: '2 hours ago',
      sentiment: 'positive'
    },
    { 
      platform: 'YouTube', 
      content: 'AI and the future of marketing', 
      engagement: '156.7K', 
      reach: '4.8M', 
      time: '5 hours ago',
      sentiment: 'positive'
    },
    { 
      platform: 'Twitter', 
      content: 'New cybersecurity protocols', 
      engagement: '234.1K', 
      reach: '6.2M', 
      time: '8 hours ago',
      sentiment: 'neutral'
    },
  ]

  const realTimeActivity = [
    { time: '00:00', posts: 45, engagement: 1200, reach: 89000 },
    { time: '04:00', posts: 32, engagement: 800, reach: 67000 },
    { time: '08:00', posts: 78, engagement: 2100, reach: 156000 },
    { time: '12:00', posts: 125, engagement: 3500, reach: 289000 },
    { time: '16:00', posts: 98, engagement: 2800, reach: 234000 },
    { time: '20:00', posts: 67, engagement: 1800, reach: 145000 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMonitoring) {
        // Simulate real-time data updates
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isMonitoring])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400'
      case 'negative': return 'text-red-400'
      case 'neutral': return 'text-yellow-400'
      default: return 'text-cyan-400'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊'
      case 'negative': return '😞'
      case 'neutral': return '😐'
      default: return '🤖'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="hologram-text text-4xl md:text-5xl font-bold mb-4">
          SOCIAL GRID MONITOR
        </h1>
        <p className="glow-text text-lg max-w-2xl mx-auto">
          Real-time social media intelligence with AI-powered sentiment analysis and trend prediction.
        </p>
      </motion.div>

      {/* Platform Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="cyber-card inline-block">
          <div className="flex space-x-1">
            {platforms.map((platform) => {
              const Icon = platform.icon
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`px-4 py-2 rounded-lg font-orbitron text-sm transition-all duration-300 flex items-center space-x-2 ${
                    selectedPlatform === platform.id
                      ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                      : 'text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-400/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{platform.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Monitoring Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="cyber-card max-w-2xl mx-auto text-center"
      >
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
          <span className="glow-text text-lg font-orbitron">
            {isMonitoring ? 'MONITORING ACTIVE' : 'MONITORING PAUSED'}
          </span>
        </div>
        
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className="cyber-button text-sm"
        >
          {isMonitoring ? 'Pause Monitoring' : 'Resume Monitoring'}
        </button>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              className="cyber-card group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              
              <h3 className="text-cyan-400/70 text-sm font-exo mb-1">{metric.label}</h3>
              <p className="glow-text text-2xl font-orbitron font-bold">{metric.value}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="cyber-card h-full">
            <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              TRENDING TOPICS
            </h3>
            
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  className="p-3 bg-black/40 rounded-lg border border-cyan-400/20 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-cyan-400 font-semibold font-exo">{topic.topic}</h4>
                    <span className="text-2xl">{getSentimentIcon(topic.sentiment)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-400/70">{topic.platform}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-cyan-400 font-orbitron">{topic.mentions}</span>
                      <div className={`flex items-center ${getSentimentColor(topic.sentiment)}`}>
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs">{topic.growth}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Posts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="cyber-card h-full">
            <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              TOP PERFORMING POSTS
            </h3>
            
            <div className="space-y-3">
              {topPosts.map((post, index) => (
                <motion.div
                  key={post.content}
                  className="p-3 bg-black/40 rounded-lg border border-cyan-400/20 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {post.platform === 'Instagram' && <Instagram className="w-4 h-4 text-pink-400" />}
                      {post.platform === 'YouTube' && <Youtube className="w-4 h-4 text-red-400" />}
                      {post.platform === 'Twitter' && <Twitter className="w-4 h-4 text-blue-400" />}
                      <span className="text-cyan-400/70 text-sm">{post.platform}</span>
                    </div>
                    <span className="text-cyan-400/50 text-xs">{post.time}</span>
                  </div>
                  
                  <p className="text-cyan-400 text-sm font-exo mb-2">{post.content}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="text-cyan-400/70">Engagement: {post.engagement}</span>
                      <span className="text-cyan-400/70">Reach: {post.reach}</span>
                    </div>
                    <span className={getSentimentColor(post.sentiment)}>
                      {getSentimentIcon(post.sentiment)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Activity */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="cyber-card"
      >
        <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          REAL-TIME ACTIVITY STREAM
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(0, 255, 255, 0.2)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                  animate={{ strokeDasharray: 251.2, strokeDashoffset: 0 }}
                  transition={{ duration: 2, delay: 0.7 }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ffff" />
                    <stop offset="100%" stopColor="#0080ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-xl font-orbitron">2.4M</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Total Reach</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(0, 255, 255, 0.2)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient2)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                  animate={{ strokeDasharray: 251.2, strokeDashoffset: 0 }}
                  transition={{ duration: 2, delay: 0.9 }}
                />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0080ff" />
                    <stop offset="100%" stopColor="#8000ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-xl font-orbitron">8.7%</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Engagement Rate</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(0, 255, 255, 0.2)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient3)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                  animate={{ strokeDasharray: 251.2, strokeDashoffset: 0 }}
                  transition={{ duration: 2, delay: 1.1 }}
                />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8000ff" />
                    <stop offset="100%" stopColor="#ff0080" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-xl font-orbitron">89.7K</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Total Shares</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 