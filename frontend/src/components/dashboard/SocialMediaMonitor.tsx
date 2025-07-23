'use client'

import { 
  TrendingUp, 
  TrendingDown, 
  Instagram, 
  Youtube, 
  Twitter,
  Heart,
  MessageCircle,
  Share,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const trendData = [
  { name: 'Mon', instagram: 4000, youtube: 2400, tiktok: 1800 },
  { name: 'Tue', instagram: 3000, youtube: 1398, tiktok: 2210 },
  { name: 'Wed', instagram: 2000, youtube: 9800, tiktok: 2290 },
  { name: 'Thu', instagram: 2780, youtube: 3908, tiktok: 2000 },
  { name: 'Fri', instagram: 1890, youtube: 4800, tiktok: 2181 },
  { name: 'Sat', instagram: 2390, youtube: 3800, tiktok: 2500 },
  { name: 'Sun', instagram: 3490, youtube: 4300, tiktok: 2100 },
]

const platformData = [
  { name: 'Instagram', value: 45, color: '#E4405F' },
  { name: 'YouTube', value: 30, color: '#FF0000' },
  { name: 'TikTok', value: 25, color: '#000000' },
]

const trendingTopics = [
  { id: 1, topic: '#summerfashion', platform: 'Instagram', engagement: 12500, growth: '+45%', viral: true },
  { id: 2, topic: '#techreview', platform: 'YouTube', engagement: 8900, growth: '+23%', viral: false },
  { id: 3, topic: '#dancechallenge', platform: 'TikTok', engagement: 15600, growth: '+67%', viral: true },
  { id: 4, topic: '#cookingtips', platform: 'Instagram', engagement: 7200, growth: '+18%', viral: false },
  { id: 5, topic: '#gaming', platform: 'YouTube', engagement: 11200, growth: '+34%', viral: false },
]

const topPosts = [
  { id: 1, platform: 'Instagram', content: 'New product launch! 🚀', engagement: 2340, likes: 1890, comments: 450, shares: 120 },
  { id: 2, platform: 'YouTube', content: 'How to optimize your marketing strategy', engagement: 5670, likes: 4230, comments: 890, shares: 550 },
  { id: 3, platform: 'TikTok', content: 'Behind the scenes at our office', engagement: 8900, likes: 7200, comments: 1200, shares: 500 },
]

export default function SocialMediaMonitor() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Engagement</p>
              <p className="text-2xl font-bold text-gray-900">156,234</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+28.5%</span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reach</p>
              <p className="text-2xl font-bold text-gray-900">2.4M</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+15.2%</span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Viral Posts</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+50%</span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">4.8%</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+0.6%</span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} />
              <Line type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={2} />
              <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trendingTopics.map((topic) => (
                <tr key={topic.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{topic.topic}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {topic.platform === 'Instagram' && <Instagram className="h-4 w-4 text-pink-500 mr-2" />}
                      {topic.platform === 'YouTube' && <Youtube className="h-4 w-4 text-red-500 mr-2" />}
                      {topic.platform === 'TikTok' && <div className="h-4 w-4 bg-black rounded mr-2" />}
                      <span className="text-sm text-gray-900">{topic.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{topic.engagement.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-green-600">{topic.growth}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {topic.viral ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <Zap className="h-3 w-3 mr-1" />
                        Viral
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Trending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {topPosts.map((post) => (
          <div key={post.id} className="card">
            <div className="flex items-center mb-4">
              {post.platform === 'Instagram' && <Instagram className="h-5 w-5 text-pink-500 mr-2" />}
              {post.platform === 'YouTube' && <Youtube className="h-5 w-5 text-red-500 mr-2" />}
              {post.platform === 'TikTok' && <div className="h-5 w-5 bg-black rounded mr-2" />}
              <h4 className="font-semibold text-gray-900">{post.platform}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">{post.content}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Engagement</span>
                <span className="font-medium">{post.engagement.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Likes</span>
                <span className="font-medium">{post.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Comments</span>
                <span className="font-medium">{post.comments.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Shares</span>
                <span className="font-medium">{post.shares.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Instagram Analytics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Followers</span>
              <span className="text-sm font-medium">45.2K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Posts</span>
              <span className="text-sm font-medium">234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Likes</span>
              <span className="text-sm font-medium">1.2K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Engagement Rate</span>
              <span className="text-sm font-medium">5.2%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">YouTube Analytics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subscribers</span>
              <span className="text-sm font-medium">12.8K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Videos</span>
              <span className="text-sm font-medium">89</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Views</span>
              <span className="text-sm font-medium">8.5K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Watch Time</span>
              <span className="text-sm font-medium">2.3K hrs</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">TikTok Analytics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Followers</span>
              <span className="text-sm font-medium">23.4K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Videos</span>
              <span className="text-sm font-medium">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Views</span>
              <span className="text-sm font-medium">15.2K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Likes</span>
              <span className="text-sm font-medium">89.5K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 