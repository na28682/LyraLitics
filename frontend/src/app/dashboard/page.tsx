'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield, 
  Cpu,
  Menu,
  X,
  BarChart3,
  Activity,
  Users,
  ShoppingCart,
  Instagram,
  Youtube,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  DollarSign,
  MessageSquare
} from 'lucide-react'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import EcommerceAnalytics from '@/components/dashboard/EcommerceAnalytics'
import SocialMediaMonitor from '@/components/dashboard/SocialMediaMonitor'
import TaskPlanner from '@/components/dashboard/TaskPlanner'
import OnlyFansAnalytics from '@/components/dashboard/OnlyFansAnalytics'
import OnlyFansContentManager from '@/components/dashboard/OnlyFansContentManager'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [systemStatus, setSystemStatus] = useState('operational')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const navigation = [
    { id: 'overview', name: 'Neural Core', icon: Brain, description: 'System Overview' },
    { id: 'ecommerce', name: 'Commerce Matrix', icon: ShoppingCart, description: 'Sales Analytics' },
    { id: 'social', name: 'Social Grid', icon: Instagram, description: 'Media Monitoring' },
    { id: 'onlyfans', name: 'OnlyFans Core', icon: Heart, description: 'Creator Analytics' },
    { id: 'onlyfans-content', name: 'Content Protocol', icon: MessageSquare, description: 'Post Management' },
    { id: 'tasks', name: 'Task Protocol', icon: Calendar, description: 'Workflow Management' },
  ]

  const systemMetrics = [
    { label: 'CPU Load', value: '67%', status: 'normal', icon: Cpu },
    { label: 'Memory', value: '89%', status: 'warning', icon: Activity },
    { label: 'Network', value: '92%', status: 'optimal', icon: Zap },
    { label: 'Security', value: '100%', status: 'optimal', icon: Shield },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />
      case 'ecommerce':
        return <EcommerceAnalytics />
      case 'social':
        return <SocialMediaMonitor />
      case 'onlyfans':
        return <OnlyFansAnalytics />
      case 'onlyfans-content':
        return <OnlyFansContentManager />
      case 'tasks':
        return <TaskPlanner />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 matrix-bg" />
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }} />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-black/90 border-r border-cyan-400/20 backdrop-blur-xl lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-cyan-400/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-black" />
              </div>
              <h1 className="hologram-text text-xl font-bold">LYRALYTICS</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden cyber-button p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`cyber-sidebar-item w-full text-left ${
                    activeTab === item.id ? 'active' : ''
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-orbitron font-semibold">{item.name}</div>
                    <div className="text-xs text-cyan-400/50 font-exo">{item.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </motion.button>
              )
            })}
          </nav>

          {/* System Status */}
          <div className="p-6 border-t border-cyan-400/20">
            <div className="cyber-card">
              <h3 className="glow-text text-sm font-orbitron mb-3">SYSTEM STATUS</h3>
              <div className="space-y-2">
                {systemMetrics.map((metric) => {
                  const Icon = metric.icon
                  const statusColor = {
                    normal: 'text-cyan-400',
                    warning: 'text-yellow-400',
                    optimal: 'text-green-400'
                  }[metric.status]
                  
                  return (
                    <div key={metric.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-cyan-400/70" />
                        <span className="text-cyan-400/70">{metric.label}</span>
                      </div>
                      <span className={statusColor}>{metric.value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="p-6">
            <div className="cyber-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full" />
                <div>
                  <div className="text-cyan-400 font-semibold">Admin User</div>
                  <div className="text-xs text-cyan-400/50">Neural Core Access</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="cyber-button text-xs px-3 py-1">
                  <Settings className="w-3 h-3 mr-1" />
                  Settings
                </button>
                <button className="cyber-button text-xs px-3 py-1 border-red-400 text-red-400 hover:bg-red-400 hover:text-black">
                  <LogOut className="w-3 h-3 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:pl-80">
        {/* Top Bar */}
        <header className="bg-black/50 border-b border-cyan-400/20 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden cyber-button p-2"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    systemStatus === 'operational' ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <span className="text-cyan-400/70 text-sm font-orbitron">
                    {systemStatus.toUpperCase()}
                  </span>
                </div>
                
                <div className="text-cyan-400/70 text-sm font-orbitron">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm">3 Alerts</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">All Systems Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
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
        </main>
      </div>
    </div>
  )
} 