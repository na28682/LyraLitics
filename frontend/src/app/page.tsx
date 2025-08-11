'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield, 
  Cpu,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % 100)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const features = [
    {
      icon: Brain,
      title: 'Neural Analytics',
      description: 'AI-powered insights with quantum processing capabilities',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Instant data streams with zero-latency processing',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Laser-focused audience segmentation algorithms',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Intelligence',
      description: 'Forecast trends before they emerge',
      color: 'from-pink-400 to-red-500'
    },
    {
      icon: Shield,
      title: 'Cyber Security',
      description: 'Military-grade encryption and protection',
      color: 'from-red-400 to-orange-500'
    },
    {
      icon: Cpu,
      title: 'Quantum Processing',
      description: 'Next-generation computational power',
      color: 'from-orange-400 to-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 matrix-bg" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-32 w-28 h-28 bg-purple-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Scan Line Effect */}
      <div className="absolute inset-0 scan-line pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
              <Brain className="w-10 h-10 text-black" />
            </div>
          </motion.div>
          
          <h1 className="hologram-text text-6xl md:text-8xl font-bold mb-6 tracking-wider">
            LYRALYTICS
          </h1>
          
          <p className="glow-text text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-exo">
            Enter the future of cybernetic analytics. Where data meets destiny.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <motion.button 
                className="cyber-button text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Access Neural Core
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </motion.button>
            </Link>
            
            <motion.button 
              className="cyber-button text-lg border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Demo
              <Play className="ml-2 w-5 h-5 inline" />
            </motion.button>
          </div>
        </motion.header>

        {/* Interactive Status Display */}
        <motion.div 
          className="cyber-card max-w-2xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="glow-text text-xl font-orbitron mb-4">SYSTEM STATUS</h3>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="cyber-button text-sm px-4 py-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            <button 
              onClick={() => setCurrentTime(0)}
              className="cyber-button text-sm px-4 py-2"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative">
            <div className="w-full bg-black/60 border border-cyan-400/30 rounded-lg h-3 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{ width: `${currentTime}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-cyan-400/70 font-orbitron text-sm">
              {currentTime}% OPERATIONAL
            </span>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="cyber-card group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-black" />
              </div>
              
              <h3 className="glow-text text-xl font-orbitron mb-2">{feature.title}</h3>
              <p className="text-cyan-400/70 font-exo">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="cyber-card max-w-4xl mx-auto">
            <h2 className="hologram-text text-4xl md:text-5xl font-bold mb-6">
              READY TO TRANSCEND?
            </h2>
            <p className="glow-text text-xl mb-8 max-w-2xl mx-auto">
              Join the elite ranks of data visionaries. The future is now.
            </p>
            <Link href="/dashboard">
              <motion.button 
                className="cyber-button text-xl px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                INITIALIZE SYSTEM
                <ArrowRight className="ml-3 w-6 h-6 inline" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="relative z-10 text-center py-8 border-t border-cyan-400/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-cyan-400/50 font-exo">
          © 2024 LyraLytics Neural Core. All systems operational.
        </p>
      </motion.footer>
    </div>
  )
} 