'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  MessageCircle,
  DollarSign,
  Star,
  Fire,
  Video,
  Image,
  FileText,
  Music,
  Settings,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react'
import { onlyFansAPI, OnlyFansPost } from '@/services/onlyfans-api'

export default function OnlyFansContentManager() {
  const [posts, setPosts] = useState<OnlyFansPost[]>([])
  const [selectedPost, setSelectedPost] = useState<OnlyFansPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showScheduler, setShowScheduler] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    type: 'photo' as 'photo' | 'video' | 'text' | 'audio' | 'file',
    price: 0,
    isPublic: true,
    tags: [] as string[],
    category: '',
    scheduledDate: ''
  })

  const filters = [
    { id: 'all', name: 'All Content', icon: Target },
    { id: 'photo', name: 'Photos', icon: Image },
    { id: 'video', name: 'Videos', icon: Video },
    { id: 'text', name: 'Text Posts', icon: FileText },
    { id: 'audio', name: 'Audio', icon: Music },
    { id: 'scheduled', name: 'Scheduled', icon: Calendar },
  ]

  const categories = [
    'Fashion', 'Fitness', 'Lifestyle', 'Beauty', 'Travel', 'Food', 'Art', 'Music', 'Gaming', 'Technology'
  ]

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setIsLoading(true)
    try {
      const postsData = await onlyFansAPI.getPosts()
      setPosts(postsData)
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleCreatePost = async () => {
    try {
      // Upload media files first
      const mediaUrls: string[] = []
      for (const file of uploadedFiles) {
        const uploadResult = await onlyFansAPI.uploadMedia(file, postData.type)
        mediaUrls.push(uploadResult.url)
      }

      // Create the post
      const newPost = await onlyFansAPI.createPost({
        ...postData,
        mediaUrls,
        currency: 'USD'
      })

      setPosts(prev => [newPost, ...prev])
      resetForm()
      setIsCreating(false)
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const handleUpdatePost = async () => {
    if (!selectedPost) return

    try {
      const updatedPost = await onlyFansAPI.updatePost(selectedPost.id, postData)
      setPosts(prev => prev.map(p => p.id === selectedPost.id ? updatedPost : p))
      resetForm()
      setIsEditing(false)
      setSelectedPost(null)
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await onlyFansAPI.deletePost(postId)
      setPosts(prev => prev.filter(p => p.id !== postId))
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  const handleEditPost = (post: OnlyFansPost) => {
    setSelectedPost(post)
    setPostData({
      title: post.title,
      description: post.description,
      type: post.type,
      price: post.price || 0,
      isPublic: post.isPublic,
      tags: post.tags,
      category: post.category,
      scheduledDate: ''
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setPostData({
      title: '',
      description: '',
      type: 'photo',
      price: 0,
      isPublic: true,
      tags: [],
      category: '',
      scheduledDate: ''
    })
    setUploadedFiles([])
  }

  const addTag = (tag: string) => {
    if (tag && !postData.tags.includes(tag)) {
      setPostData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPostData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.type === filter
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Image className="w-4 h-4 text-blue-400" />
      case 'video': return <Video className="w-4 h-4 text-red-400" />
      case 'text': return <FileText className="w-4 h-4 text-green-400" />
      case 'audio': return <Music className="w-4 h-4 text-purple-400" />
      default: return <FileText className="w-4 h-4 text-cyan-400" />
    }
  }

  const getPerformanceColor = (post: OnlyFansPost) => {
    const engagement = (post.likesCount + post.commentsCount) / post.viewsCount * 100
    if (engagement >= 8) return 'text-green-400'
    if (engagement >= 5) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="cyber-card text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Upload className="w-8 h-8 text-black" />
          </div>
          <p className="glow-text text-lg font-orbitron">LOADING CONTENT MATRIX...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="hologram-text text-4xl md:text-5xl font-bold mb-4">
          CONTENT PROTOCOL
        </h1>
        <p className="glow-text text-lg max-w-2xl mx-auto">
          Advanced content management system for OnlyFans creators. Create, schedule, and optimize your content strategy.
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4 items-center justify-between"
      >
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-10 pr-4 w-64"
            />
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
          </div>
          
          <div className="flex space-x-1">
            {filters.map((filterItem) => {
              const Icon = filterItem.icon
              return (
                <button
                  key={filterItem.id}
                  onClick={() => setFilter(filterItem.id)}
                  className={`px-3 py-2 rounded-lg font-orbitron text-xs transition-all duration-300 flex items-center space-x-1 ${
                    filter === filterItem.id
                      ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                      : 'text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-400/10'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{filterItem.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setIsCreating(true)}
            className="cyber-button flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Post</span>
          </button>
          
          <button
            onClick={() => setShowScheduler(true)}
            className="cyber-button border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
        </div>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="cyber-card group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            {/* Post Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getPostTypeIcon(post.type)}
                <span className="text-cyan-400/70 text-sm font-exo capitalize">{post.type}</span>
                {post.isPinned && <Star className="w-4 h-4 text-yellow-400" />}
                {post.price && <DollarSign className="w-4 h-4 text-green-400" />}
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditPost(post)
                  }}
                  className="p-1 hover:bg-cyan-400/20 rounded transition-colors"
                >
                  <Edit className="w-3 h-3 text-cyan-400/70" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePost(post.id)
                  }}
                  className="p-1 hover:bg-red-400/20 rounded transition-colors"
                >
                  <Trash2 className="w-3 h-3 text-red-400/70" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <h3 className="glow-text text-lg font-orbitron mb-2">{post.title}</h3>
            <p className="text-cyan-400/70 text-sm font-exo mb-3 line-clamp-2">{post.description}</p>

            {/* Post Meta */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/70">Price:</span>
                <span className="text-green-400 font-orbitron">
                  {post.price ? `$${post.price}` : 'Free'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/70">Category:</span>
                <span className="text-cyan-400 font-exo capitalize">{post.category}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/70">Created:</span>
                <span className="text-cyan-400 font-exo">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-center p-2 bg-black/40 rounded border border-cyan-400/20">
                <div className="text-cyan-400/70 text-xs">Views</div>
                <div className="text-cyan-400 font-orbitron text-sm">{post.viewsCount}</div>
              </div>
              <div className="text-center p-2 bg-black/40 rounded border border-cyan-400/20">
                <div className="text-cyan-400/70 text-xs">Likes</div>
                <div className="text-cyan-400 font-orbitron text-sm">{post.likesCount}</div>
              </div>
              <div className="text-center p-2 bg-black/40 rounded border border-cyan-400/20">
                <div className="text-cyan-400/70 text-xs">Comments</div>
                <div className="text-cyan-400 font-orbitron text-sm">{post.commentsCount}</div>
              </div>
              <div className="text-center p-2 bg-black/40 rounded border border-cyan-400/20">
                <div className="text-cyan-400/70 text-xs">Revenue</div>
                <div className="text-green-400 font-orbitron text-sm">${post.revenue}</div>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded border border-cyan-400/30"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded border border-cyan-400/30">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Performance Indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-400/70">Performance:</span>
              <span className={getPerformanceColor(post)}>
                {post.isPinned ? <Star className="w-3 h-3 inline" /> : <Fire className="w-3 h-3 inline" />}
                {post.isPinned ? ' Pinned' : ' Trending'}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(isCreating || isEditing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="cyber-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="glow-text text-xl font-orbitron">
                  {isCreating ? 'CREATE NEW POST' : 'EDIT POST'}
                </h3>
                <button
                  onClick={() => {
                    setIsCreating(false)
                    setIsEditing(false)
                    resetForm()
                  }}
                  className="cyber-button p-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                if (isCreating) handleCreatePost()
                else handleUpdatePost()
              }} className="space-y-4">
                {/* Post Type */}
                <div>
                  <label className="block text-cyan-400/70 text-sm font-exo mb-2">Content Type</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['photo', 'video', 'text', 'audio', 'file'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPostData(prev => ({ ...prev, type: type as any }))}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          postData.type === type
                            ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400'
                            : 'border-cyan-400/30 text-cyan-400/70 hover:border-cyan-400/50'
                        }`}
                      >
                        {type === 'photo' && <Image className="w-5 h-5 mx-auto" />}
                        {type === 'video' && <Video className="w-5 h-5 mx-auto" />}
                        {type === 'text' && <FileText className="w-5 h-5 mx-auto" />}
                        {type === 'audio' && <Music className="w-5 h-5 mx-auto" />}
                        {type === 'file' && <FileText className="w-5 h-5 mx-auto" />}
                        <span className="text-xs mt-1 block capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-cyan-400/70 text-sm font-exo mb-2">Title</label>
                  <input
                    type="text"
                    value={postData.title}
                    onChange={(e) => setPostData(prev => ({ ...prev, title: e.target.value }))}
                    className="cyber-input"
                    placeholder="Enter post title..."
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-cyan-400/70 text-sm font-exo mb-2">Description</label>
                  <textarea
                    value={postData.description}
                    onChange={(e) => setPostData(prev => ({ ...prev, description: e.target.value }))}
                    className="cyber-input"
                    rows={3}
                    placeholder="Enter post description..."
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-cyan-400/70 text-sm font-exo mb-2">Price (USD)</label>
                  <input
                    type="number"
                    value={postData.price}
                    onChange={(e) => setPostData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="cyber-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-cyan-400/70 text-sm font-exo mb-2">Category</label>
                  <select
                    value={postData.category}
                    onChange={(e) => setPostData(prev => ({ ...prev, category: e.target.value }))}
                    className="cyber-input"
                  >
                    <option value="">Select category...</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-cyan-400/70 text-sm font-exo mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {postData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-sm rounded border border-cyan-400/30 flex items-center space-x-1"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      className="cyber-input flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const input = e.target as HTMLInputElement
                          addTag(input.value)
                          input.value = ''
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Add tag..."]') as HTMLInputElement
                        if (input?.value) {
                          addTag(input.value)
                          input.value = ''
                        }
                      }}
                      className="cyber-button px-4"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                {postData.type !== 'text' && (
                  <div>
                    <label className="block text-cyan-400/70 text-sm font-exo mb-2">Media Files</label>
                    <div className="border-2 border-dashed border-cyan-400/30 rounded-lg p-6 text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={postData.type === 'photo' ? 'image/*' : postData.type === 'video' ? 'video/*' : postData.type === 'audio' ? 'audio/*' : '*'}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="cyber-button mb-4"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </button>
                      <p className="text-cyan-400/50 text-sm">
                        {postData.type === 'photo' && 'Upload images (JPG, PNG, GIF)'}
                        {postData.type === 'video' && 'Upload videos (MP4, MOV, AVI)'}
                        {postData.type === 'audio' && 'Upload audio files (MP3, WAV, AAC)'}
                        {postData.type === 'file' && 'Upload any file type'}
                      </p>
                    </div>
                    
                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-black/40 rounded border border-cyan-400/20">
                            <span className="text-cyan-400 text-sm">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Visibility */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={postData.isPublic}
                    onChange={(e) => setPostData(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="w-4 h-4 text-cyan-400 bg-black border-cyan-400/30 rounded focus:ring-cyan-400"
                  />
                  <label htmlFor="isPublic" className="text-cyan-400/70 text-sm font-exo">
                    Make this post public
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false)
                      setIsEditing(false)
                      resetForm()
                    }}
                    className="cyber-button border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cyber-button bg-cyan-400 text-black hover:bg-cyan-300 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isCreating ? 'Create Post' : 'Update Post'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
