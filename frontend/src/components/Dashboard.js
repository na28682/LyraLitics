import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Settings,
  LogOut,
  Youtube,
  Instagram,
  Twitter,
  Chrome
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout, connectedAccounts } = useAuth();

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalyticsData({
        totalFollowers: 125000,
        totalViews: 2500000,
        totalLikes: 450000,
        totalComments: 12500,
        growthRate: 12.5,
        engagementRate: 8.2,
        platforms: {
          youtube: { followers: 75000, views: 1500000, growth: 15.2 },
          instagram: { followers: 35000, views: 800000, growth: 8.5 },
          twitter: { followers: 15000, views: 200000, growth: 5.8 }
        }
      });
      setLoading(false);
    }, 2000);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const chartData = {
    followers: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Total Followers',
          data: [85000, 92000, 98000, 105000, 115000, 125000],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
      ],
    },
    engagement: {
      labels: ['YouTube', 'Instagram', 'Twitter'],
      datasets: [
        {
          label: 'Engagement Rate (%)',
          data: [12.5, 8.2, 6.8],
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(59, 130, 246, 0.8)',
          ],
        },
      ],
    },
    platformDistribution: {
      labels: ['YouTube', 'Instagram', 'Twitter'],
      datasets: [
        {
          data: [60, 28, 12],
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(59, 130, 246, 0.8)',
          ],
        },
      ],
    },
  };

  const platformIcons = {
    youtube: <Youtube className="w-6 h-6" />,
    instagram: <Instagram className="w-6 h-6" />,
    twitter: <Twitter className="w-6 h-6" />,
    google: <Chrome className="w-6 h-6" />
  };

  if (loading) {
    return (
      <div className="min-h-screen bubble-bg flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bubble-bg">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bubble-text">LyraLytics Dashboard</h1>
              <div className="flex items-center gap-2">
                {Object.entries(connectedAccounts).map(([platform, connected]) => 
                  connected && (
                    <div key={platform} className="p-2 bg-white/10 rounded-lg">
                      {platformIcons[platform]}
                    </div>
                  )
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/analytics')}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">{analyticsData.totalFollowers.toLocaleString()}</h3>
            <p className="text-white/70">Total Followers</p>
            <p className="text-green-400 text-sm">+{analyticsData.growthRate}% this month</p>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-secondary-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">{analyticsData.totalViews.toLocaleString()}</h3>
            <p className="text-white/70">Total Views</p>
            <p className="text-green-400 text-sm">+18.5% this month</p>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-red-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">{analyticsData.totalLikes.toLocaleString()}</h3>
            <p className="text-white/70">Total Likes</p>
            <p className="text-green-400 text-sm">+22.1% this month</p>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <MessageCircle className="w-8 h-8 text-accent-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">{analyticsData.totalComments.toLocaleString()}</h3>
            <p className="text-white/70">Total Comments</p>
            <p className="text-green-400 text-sm">+15.8% this month</p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Follower Growth</h3>
            <Line 
              data={chartData.followers}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: { color: 'white' }
                  }
                },
                scales: {
                  y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                  },
                  x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                  }
                }
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Platform Distribution</h3>
            <Doughnut 
              data={chartData.platformDistribution}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: { color: 'white' }
                  }
                }
              }}
            />
          </motion.div>
        </div>

        {/* Platform Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Platform Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(analyticsData.platforms).map(([platform, data]) => (
              <div key={platform} className="text-center">
                <div className="flex justify-center mb-3">
                  {platformIcons[platform]}
                </div>
                <h4 className="text-lg font-semibold text-white capitalize mb-2">{platform}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-bold text-white">{data.followers.toLocaleString()}</p>
                    <p className="text-white/70 text-sm">Followers</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{data.views.toLocaleString()}</p>
                    <p className="text-white/70 text-sm">Views</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold">+{data.growth}%</p>
                    <p className="text-white/70 text-sm">Growth</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 