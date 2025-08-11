'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Eye, 
  Heart, 
  MessageCircle,
  Users,
  Calendar,
  Clock,
  Target,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  Plus,
  Upload,
  Schedule,
  MessageSquare,
  CreditCard,
  Star,
  Crown,
  Fire,
  TrendingUp as TrendingUpIcon,
  Calendar as CalendarIcon,
  Users as UsersIcon,
  DollarSign as DollarSignIcon
} from 'lucide-react'
import { onlyFansAPI, OnlyFansAnalytics, OnlyFansPost, OnlyFansSubscription, OnlyFansMessage } from '@/services/onlyfans-api'

export default function OnlyFansAnalytics() {
  const [analytics, setAnalytics] = useState<OnlyFansAnalytics | null>(null)
  const [posts, setPosts] = useState<OnlyFansPost[]>([])
  const [subscriptions, setSubscriptions] = useState<OnlyFansSubscription[]>([])
  const [messages, setMessages] = useState<OnlyFansMessage[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const periods = [
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
  ]

  const tabs = [
    { id: 'overview', name: 'Neural Overview', icon: Activity, description: 'System Overview' },
    { id: 'revenue', name: 'Revenue Matrix', icon: DollarSign, description: 'Financial Analytics' },
    { id: 'engagement', name: 'Engagement Grid', icon: Heart, description: 'Audience Interaction' },
    { id: 'content', name: 'Content Protocol', icon: BarChart3, description: 'Post Management' },
    { id: 'subscribers', name: 'Subscriber Core', icon: Users, description: 'Follower Analytics' },
    { id: 'messages', name: 'Message Hub', icon: MessageSquare, description: 'Communication Center' },
  ]

  useEffect(() => {
    loadData()
  }, [selectedPeriod])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [analyticsData, postsData, subscriptionsData, messagesData] = await Promise.all([
        onlyFansAPI.getAnalytics(),
        onlyFansAPI.getPosts(),
        onlyFansAPI.getSubscriptions(),
        onlyFansAPI.getMessages()
      ])
      
      setAnalytics(analyticsData)
      setPosts(postsData)
      setSubscriptions(subscriptionsData)
      setMessages(messagesData)
    } catch (error) {
      console.error('Failed to load OnlyFans data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRevenueColor = (value: number) => {
    if (value > 0) return 'text-green-400'
    if (value < 0) return 'text-red-400'
    return 'text-cyan-400'
  }

  const getEngagementColor = (rate: number) => {
    if (rate >= 8) return 'text-green-400'
    if (rate >= 5) return 'text-yellow-400'
    return 'text-red-400'
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="cyber-card group cursor-pointer"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-6 h-6 text-black" />
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-400/70">Revenue</div>
              <div className="text-green-400 text-sm">+12.5%</div>
            </div>
          </div>
          <h3 className="text-cyan-400/70 text-sm font-exo mb-1">Total Revenue</h3>
          <p className="glow-text text-2xl font-orbitron font-bold">
            ${analytics?.totalRevenue?.toLocaleString() || '0'}
          </p>
        </motion.div>

        <motion.div
          className="cyber-card group cursor-pointer"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-6 h-6 text-black" />
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-400/70">Views</div>
              <div className="text-blue-400 text-sm">+8.1%</div>
            </div>
          </div>
          <h3 className="text-cyan-400/70 text-sm font-exo mb-1">Total Views</h3>
          <p className="glow-text text-2xl font-orbitron font-bold">
            {analytics?.totalViews?.toLocaleString() || '0'}
          </p>
        </motion.div>

        <motion.div
          className="cyber-card group cursor-pointer"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-6 h-6 text-black" />
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-400/70">Engagement</div>
              <div className="text-purple-400 text-sm">+15.3%</div>
            </div>
          </div>
          <h3 className="text-cyan-400/70 text-sm font-exo mb-1">Engagement Rate</h3>
          <p className={`glow-text text-2xl font-orbitron font-bold ${getEngagementColor(analytics?.averageEngagementRate || 0)}`}>
            {analytics?.averageEngagementRate?.toFixed(1) || '0'}%
          </p>
        </motion.div>

        <motion.div
          className="cyber-card group cursor-pointer"
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-black" />
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-400/70">Subscribers</div>
              <div className="text-orange-400 text-sm">+23.1%</div>
            </div>
          </div>
          <h3 className="text-cyan-400/70 text-sm font-exo mb-1">Active Subscribers</h3>
          <p className="glow-text text-2xl font-orbitron font-bold">
            {subscriptions.filter(s => s.isActive).length}
          </p>
        </motion.div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="cyber-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
            <TrendingUpIcon className="w-5 h-5 mr-2" />
            REVENUE TREND
          </h3>
          
          <div className="space-y-4">
            {analytics?.revenueByMonth?.slice(-6).map((item, index) => (
              <motion.div
                key={item.month}
                className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-cyan-400/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="text-cyan-400/70 font-orbitron">{item.month}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400 font-orbitron">${item.revenue.toLocaleString()}</span>
                  <div className="w-24 bg-black/60 rounded-full h-2 border border-cyan-400/30">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.revenue / (analytics?.revenueByMonth?.reduce((max, curr) => Math.max(max, curr.revenue), 0) || 1)) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="cyber-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            ENGAGEMENT BY TYPE
          </h3>
          
          <div className="space-y-4">
            {analytics?.engagementByPostType?.map((item, index) => (
              <motion.div
                key={item.type}
                className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-cyan-400/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400/70 font-exo capitalize">{item.type}</span>
                  {item.type === 'video' && <Fire className="w-4 h-4 text-red-400" />}
                  {item.type === 'photo' && <Star className="w-4 h-4 text-yellow-400" />}
                  {item.type === 'text' && <MessageCircle className="w-4 h-4 text-blue-400" />}
                </div>
                <span className="text-cyan-400 font-orbitron">{item.engagement.toFixed(1)}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderRevenue = () => (
    <div className="space-y-6">
      <motion.div
        className="cyber-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
          <DollarSignIcon className="w-5 h-5 mr-2" />
          REVENUE ANALYTICS MATRIX
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
                  transition={{ duration: 2, delay: 0.6 }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ffff" />
                    <stop offset="100%" stopColor="#0080ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-xl font-orbitron">
                  ${analytics?.totalRevenue?.toLocaleString() || '0'}
                </span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Total Revenue</p>
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
                  transition={{ duration: 2, delay: 0.8 }}
                />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0080ff" />
                    <stop offset="100%" stopColor="#8000ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-xl font-orbitron">
                  {analytics?.totalPurchases || 0}
                </span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Total Purchases</p>
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
                  transition={{ duration: 2, delay: 1.0 }}
                />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8000ff" />
                    <stop offset="100%" stopColor="#ff0080" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-xl font-orbitron">
                  ${subscriptions.reduce((sum, sub) => sum + sub.monthlyPrice, 0).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Monthly Subscriptions</p>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'revenue':
        return renderRevenue()
      default:
        return renderOverview()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="cyber-card text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Activity className="w-8 h-8 text-black" />
          </div>
          <p className="glow-text text-lg font-orbitron">INITIALIZING ONLYFANS NEURAL CORE...</p>
        </div>
      </div>
    )
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
          ONLYFANS NEURAL CORE
        </h1>
        <p className="glow-text text-lg max-w-2xl mx-auto">
          Advanced analytics and content management for OnlyFans creators. Optimize your content strategy with AI-powered insights.
        </p>
      </motion.div>

      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="cyber-card inline-block">
          <div className="flex space-x-1">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg font-orbitron text-sm transition-all duration-300 ${
                  selectedPeriod === period.id
                    ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                    : 'text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="cyber-card inline-block">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-orbitron text-sm transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                      : 'text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-400/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
