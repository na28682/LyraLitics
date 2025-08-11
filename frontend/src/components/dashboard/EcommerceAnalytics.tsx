'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Heart,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap
} from 'lucide-react'

export default function EcommerceAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [hoveredMetric, setHoveredMetric] = useState(null)

  const periods = [
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
  ]

  const metrics = [
    { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'from-green-400 to-emerald-500' },
    { label: 'Orders', value: '15.2K', change: '+8.1%', trend: 'up', icon: ShoppingCart, color: 'from-blue-400 to-cyan-500' },
    { label: 'Customers', value: '8.9K', change: '+15.3%', trend: 'up', icon: Users, color: 'from-purple-400 to-pink-500' },
    { label: 'Products', value: '1.2K', change: '+3.2%', trend: 'up', icon: Package, color: 'from-orange-400 to-red-500' },
  ]

  const topProducts = [
    { name: 'Quantum Processor X1', sales: '$450K', growth: '+23%', category: 'Electronics', rating: 4.9 },
    { name: 'Neural Interface Kit', sales: '$320K', growth: '+18%', category: 'Technology', rating: 4.8 },
    { name: 'Cyber Security Suite', sales: '$280K', growth: '+31%', category: 'Software', rating: 4.7 },
    { name: 'Holographic Display', sales: '$210K', growth: '+12%', category: 'Hardware', rating: 4.6 },
  ]

  const salesData = [
    { time: '00:00', sales: 1200, orders: 45 },
    { time: '04:00', sales: 800, orders: 32 },
    { time: '08:00', sales: 2100, orders: 78 },
    { time: '12:00', sales: 3500, orders: 125 },
    { time: '16:00', sales: 2800, orders: 98 },
    { time: '20:00', sales: 1800, orders: 67 },
  ]

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
          COMMERCE MATRIX
        </h1>
        <p className="glow-text text-lg max-w-2xl mx-auto">
          Advanced ecommerce analytics with predictive intelligence and real-time market insights.
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

      {/* Key Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
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
              onHoverStart={() => setHoveredMetric(index)}
              onHoverEnd={() => setHoveredMetric(null)}
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
              
              {hoveredMetric === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg -z-10"
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="cyber-card h-full">
            <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              REAL-TIME SALES METRICS
            </h3>
            
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <motion.div
                  key={data.time}
                  className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-cyan-400/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <span className="text-cyan-400/70 font-orbitron">{data.time}</span>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-cyan-400 text-sm font-exo">Sales</div>
                      <div className="glow-text text-lg font-orbitron">${(data.sales / 1000).toFixed(1)}K</div>
                    </div>
                    <div className="text-center">
                      <div className="text-cyan-400 text-sm font-exo">Orders</div>
                      <div className="glow-text text-lg font-orbitron">{data.orders}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="cyber-card h-full">
            <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              TOP PERFORMING PRODUCTS
            </h3>
            
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  className="p-3 bg-black/40 rounded-lg border border-cyan-400/20 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-cyan-400 font-semibold font-exo">{product.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 text-sm">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-400/70">{product.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-orbitron">{product.sales}</span>
                      <div className="flex items-center text-green-400">
                        <ArrowUpRight className="w-3 h-3" />
                        <span className="text-xs">{product.growth}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="cyber-card"
      >
        <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          PERFORMANCE INDICATORS
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
                <span className="glow-text text-xl font-orbitron">94.7%</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Customer Satisfaction</p>
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
                <span className="glow-text text-xl font-orbitron">87.3%</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Conversion Rate</p>
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
                <span className="glow-text text-xl font-orbitron">92.1%</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Revenue Growth</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 