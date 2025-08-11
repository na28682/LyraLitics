'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Eye, 
  Heart,
  Zap,
  Activity,
  Target,
  Shield,
  Clock,
  AlertTriangle
} from 'lucide-react'

export default function DashboardOverview() {
  const [currentMetric, setCurrentMetric] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const metrics = [
    { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'from-green-400 to-emerald-500' },
    { label: 'Active Users', value: '89.2K', change: '+8.1%', trend: 'up', icon: Users, color: 'from-blue-400 to-cyan-500' },
    { label: 'Conversion Rate', value: '3.2%', change: '+2.1%', trend: 'up', icon: Target, color: 'from-purple-400 to-pink-500' },
    { label: 'Engagement', value: '94.7%', change: '-1.2%', trend: 'down', icon: Heart, color: 'from-red-400 to-orange-500' },
  ]

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Memory usage approaching threshold', time: '2 min ago', icon: AlertTriangle },
    { id: 2, type: 'info', message: 'New data batch processed successfully', time: '5 min ago', icon: Activity },
    { id: 3, type: 'success', message: 'Security scan completed - no threats detected', time: '8 min ago', icon: Shield },
  ]

  const realTimeData = [
    { label: 'CPU Load', value: '67%', status: 'normal' },
    { label: 'Memory Usage', value: '89%', status: 'warning' },
    { label: 'Network I/O', value: '45%', status: 'optimal' },
    { label: 'Disk Space', value: '23%', status: 'optimal' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
          NEURAL CORE OVERVIEW
        </h1>
        <p className="glow-text text-lg max-w-2xl mx-auto">
          Welcome to the central nervous system of your digital empire. All systems are operational and ready for your commands.
        </p>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
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
              onClick={() => setCurrentMetric(index)}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="cyber-card h-full">
            <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              SYSTEM PERFORMANCE MATRIX
            </h3>
            
            <div className="space-y-4">
              {realTimeData.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-cyan-400/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-cyan-400/70 font-exo">{item.label}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-black/60 rounded-full h-2 border border-cyan-400/30">
                      <motion.div
                        className={`h-full rounded-full ${
                          item.status === 'optimal' ? 'bg-green-400' : 
                          item.status === 'warning' ? 'bg-yellow-400' : 'bg-cyan-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: item.value }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <span className={`text-sm font-orbitron ${
                      item.status === 'optimal' ? 'text-green-400' : 
                      item.status === 'warning' ? 'text-yellow-400' : 'text-cyan-400'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="cyber-card h-full">
            <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              LIVE ALERTS
            </h3>
            
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => {
                const Icon = alert.icon
                const alertColors = {
                  warning: 'border-yellow-400/30 bg-yellow-400/5',
                  info: 'border-blue-400/30 bg-blue-400/5',
                  success: 'border-green-400/30 bg-green-400/5'
                }
                
                return (
                  <motion.div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${alertColors[alert.type]} transition-all duration-300 hover:scale-105`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-4 h-4 mt-0.5 ${
                        alert.type === 'warning' ? 'text-yellow-400' :
                        alert.type === 'info' ? 'text-blue-400' : 'text-green-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-cyan-400 text-sm font-exo">{alert.message}</p>
                        <p className="text-cyan-400/50 text-xs font-orbitron mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Data Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="cyber-card"
      >
        <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          REAL-TIME DATA STREAM
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
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
                <span className="glow-text text-lg font-orbitron">67%</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">System Load</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
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
                <span className="glow-text text-lg font-orbitron">89%</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Memory Usage</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
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
                <span className="glow-text text-lg font-orbitron">92%</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Network I/O</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 