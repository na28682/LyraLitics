'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  Zap,
  Target,
  Users,
  TrendingUp,
  Brain,
  Activity,
  Star,
  Priority
} from 'lucide-react'

export default function TaskPlanner() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Launch Quantum Marketing Campaign', description: 'Execute the new AI-powered marketing strategy across all channels', priority: 'high', status: 'in-progress', assignee: 'Sarah Chen', dueDate: '2024-02-15', category: 'Marketing', progress: 75 },
    { id: 2, title: 'Optimize Neural Network Algorithms', description: 'Improve the machine learning models for better prediction accuracy', priority: 'critical', status: 'pending', assignee: 'Alex Rodriguez', dueDate: '2024-02-20', category: 'Development', progress: 0 },
    { id: 3, title: 'Social Media Content Calendar', description: 'Plan and schedule content for the next quarter across all platforms', priority: 'medium', status: 'completed', assignee: 'Emma Thompson', dueDate: '2024-02-10', category: 'Content', progress: 100 },
    { id: 4, title: 'Customer Data Analysis', description: 'Analyze customer behavior patterns and generate insights report', priority: 'high', status: 'in-progress', assignee: 'David Kim', dueDate: '2024-02-18', category: 'Analytics', progress: 60 },
    { id: 5, title: 'Security Protocol Review', description: 'Review and update cybersecurity protocols for the platform', priority: 'critical', status: 'pending', assignee: 'Lisa Wang', dueDate: '2024-02-25', category: 'Security', progress: 0 },
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddTask, setShowAddTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const categories = [
    { id: 'all', name: 'All Categories', icon: Target, color: 'from-cyan-400 to-blue-500' },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp, color: 'from-green-400 to-emerald-500' },
    { id: 'development', name: 'Development', icon: Brain, color: 'from-purple-400 to-pink-500' },
    { id: 'content', name: 'Content', icon: Users, color: 'from-blue-400 to-cyan-500' },
    { id: 'analytics', name: 'Analytics', icon: Activity, color: 'from-orange-400 to-red-500' },
    { id: 'security', name: 'Security', icon: AlertTriangle, color: 'from-red-400 to-pink-500' },
  ]

  const priorities = {
    low: { color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/30' },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/30' },
    high: { color: 'text-orange-400', bg: 'bg-orange-400/20', border: 'border-orange-400/30' },
    critical: { color: 'text-red-400', bg: 'bg-red-400/20', border: 'border-red-400/30' },
  }

  const statuses = {
    pending: { color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/30' },
    'in-progress': { color: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400/30' },
    completed: { color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/30' },
  }

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.category.toLowerCase() === filter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low': return '🟢'
      case 'medium': return '🟡'
      case 'high': return '🟠'
      case 'critical': return '🔴'
      default: return '⚪'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'in-progress': return '🔄'
      case 'completed': return '✅'
      default: return '❓'
    }
  }

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const updateTaskProgress = (taskId: number, newProgress: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, progress: newProgress } : task
    ))
  }

  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: Target, color: 'from-cyan-400 to-blue-500' },
    { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, icon: Activity, color: 'from-blue-400 to-purple-500' },
    { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle, color: 'from-green-400 to-emerald-500' },
    { label: 'Critical', value: tasks.filter(t => t.priority === 'critical').length, icon: AlertTriangle, color: 'from-red-400 to-orange-500' },
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
          TASK PROTOCOL
        </h1>
        <p className="glow-text text-lg max-w-2xl mx-auto">
          Advanced task management system with AI-powered prioritization and neural workflow optimization.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              className="cyber-card group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-black" />
              </div>
              
              <h3 className="text-cyan-400/70 text-sm font-exo mb-1">{stat.label}</h3>
              <p className="glow-text text-2xl font-orbitron font-bold">{stat.value}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col lg:flex-row gap-4 items-center justify-between"
      >
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-10 pr-4 w-64"
            />
          </div>
          
          <div className="flex space-x-1">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-3 py-2 rounded-lg font-orbitron text-xs transition-all duration-300 flex items-center space-x-1 ${
                    filter === category.id
                      ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                      : 'text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-400/10'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setShowAddTask(true)}
          className="cyber-button flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </motion.div>

      {/* Tasks Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            className={`cyber-card cursor-pointer group ${
              priorities[task.priority].bg
            } ${priorities[task.priority].border}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setSelectedTask(task)}
          >
            {/* Task Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                <span className="text-lg">{getStatusIcon(task.status)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-cyan-400/20 rounded transition-colors">
                  <Edit className="w-3 h-3 text-cyan-400/70" />
                </button>
                <button className="p-1 hover:bg-red-400/20 rounded transition-colors">
                  <Trash2 className="w-3 h-3 text-red-400/70" />
                </button>
              </div>
            </div>

            {/* Task Content */}
            <h3 className="glow-text text-lg font-orbitron mb-2">{task.title}</h3>
            <p className="text-cyan-400/70 text-sm font-exo mb-3 line-clamp-2">{task.description}</p>

            {/* Task Meta */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/70">Assignee:</span>
                <span className="text-cyan-400 font-exo">{task.assignee}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/70">Due:</span>
                <span className="text-cyan-400 font-exo">{task.dueDate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/70">Category:</span>
                <span className="text-cyan-400 font-exo capitalize">{task.category}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-cyan-400/70">Progress</span>
                <span className="text-cyan-400 font-orbitron">{task.progress}%</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 border border-cyan-400/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>

            {/* Status Controls */}
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateTaskStatus(task.id, 'pending')
                }}
                className={`px-2 py-1 rounded text-xs font-orbitron transition-all duration-300 ${
                  task.status === 'pending' 
                    ? 'bg-yellow-400/30 text-yellow-400 border border-yellow-400/50' 
                    : 'text-cyan-400/70 hover:bg-yellow-400/20'
                }`}
              >
                Pending
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateTaskStatus(task.id, 'in-progress')
                }}
                className={`px-2 py-1 rounded text-xs font-orbitron transition-all duration-300 ${
                  task.status === 'in-progress' 
                    ? 'bg-blue-400/30 text-blue-400 border border-blue-400/50' 
                    : 'text-cyan-400/70 hover:bg-blue-400/20'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateTaskStatus(task.id, 'completed')
                }}
                className={`px-2 py-1 rounded text-xs font-orbitron transition-all duration-300 ${
                  task.status === 'completed' 
                    ? 'bg-green-400/30 text-green-400 border border-green-400/50' 
                    : 'text-cyan-400/70 hover:bg-green-400/20'
                }`}
              >
                Complete
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="cyber-card"
      >
        <h3 className="glow-text text-xl font-orbitron mb-6 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          QUICK ACTIONS
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
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ffff" />
                    <stop offset="100%" stopColor="#0080ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-lg font-orbitron">75%</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Tasks Completed</p>
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
                  transition={{ duration: 2, delay: 0.7 }}
                />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0080ff" />
                    <stop offset="100%" stopColor="#8000ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-lg font-orbitron">3</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Critical Tasks</p>
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
                  transition={{ duration: 2, delay: 0.9 }}
                />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8000ff" />
                    <stop offset="100%" stopColor="#ff0080" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="glow-text text-lg font-orbitron">2</span>
              </div>
            </div>
            <p className="text-cyan-400/70 font-exo">Overdue Tasks</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 