import axios from 'axios'

export interface OnlyFansUser {
  id: string
  username: string
  displayName: string
  avatar: string
  isVerified: boolean
  followersCount: number
  followingCount: number
  postsCount: number
  bio: string
  location: string
  website: string
  createdAt: string
  lastActive: string
}

export interface OnlyFansPost {
  id: string
  type: 'photo' | 'video' | 'text' | 'audio' | 'file'
  title: string
  description: string
  mediaUrls: string[]
  thumbnailUrl?: string
  previewUrl?: string
  isPinned: boolean
  isArchived: boolean
  isPublic: boolean
  price?: number
  currency: string
  likesCount: number
  commentsCount: number
  viewsCount: number
  purchasesCount: number
  revenue: number
  createdAt: string
  updatedAt: string
  tags: string[]
  category: string
}

export interface OnlyFansAnalytics {
  totalRevenue: number
  totalPosts: number
  totalViews: number
  totalLikes: number
  totalComments: number
  totalPurchases: number
  averageEngagementRate: number
  topPerformingPosts: OnlyFansPost[]
  revenueByMonth: { month: string; revenue: number }[]
  viewsByDay: { date: string; views: number }[]
  engagementByPostType: { type: string; engagement: number }[]
  topFans: { username: string; totalSpent: number; interactionCount: number }[]
}

export interface OnlyFansSubscription {
  id: string
  subscriberId: string
  subscriberUsername: string
  subscriberAvatar: string
  subscriptionTier: string
  monthlyPrice: number
  currency: string
  startDate: string
  endDate?: string
  isActive: boolean
  autoRenew: boolean
  totalSpent: number
  lastInteraction: string
}

export interface OnlyFansMessage {
  id: string
  senderId: string
  senderUsername: string
  senderAvatar: string
  content: string
  mediaUrls?: string[]
  price?: number
  currency: string
  isRead: boolean
  isPurchased: boolean
  createdAt: string
  type: 'text' | 'photo' | 'video' | 'audio' | 'file'
}

class OnlyFansAPI {
  private baseURL: string
  private apiKey: string
  private accessToken: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_ONLYFANS_API_URL || 'https://api.onlyfans.com/v2'
    this.apiKey = process.env.NEXT_PUBLIC_ONLYFANS_API_KEY || ''
    this.accessToken = process.env.NEXT_PUBLIC_ONLYFANS_ACCESS_TOKEN || ''
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    }
  }

  // Authentication
  async authenticate(username: string, password: string) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/login`, {
        username,
        password,
      })
      
      if (response.data.accessToken) {
        this.accessToken = response.data.accessToken
        localStorage.setItem('onlyfans_access_token', this.accessToken)
      }
      
      return response.data
    } catch (error) {
      console.error('OnlyFans authentication failed:', error)
      throw error
    }
  }

  async refreshToken() {
    try {
      const response = await axios.post(`${this.baseURL}/auth/refresh`, {}, {
        headers: this.getHeaders()
      })
      
      if (response.data.accessToken) {
        this.accessToken = response.data.accessToken
        localStorage.setItem('onlyfans_access_token', this.accessToken)
      }
      
      return response.data
    } catch (error) {
      console.error('OnlyFans token refresh failed:', error)
      throw error
    }
  }

  // User Profile
  async getUserProfile(): Promise<OnlyFansUser> {
    try {
      const response = await axios.get(`${this.baseURL}/users/me`, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      throw error
    }
  }

  async updateUserProfile(updates: Partial<OnlyFansUser>) {
    try {
      const response = await axios.patch(`${this.baseURL}/users/me`, updates, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to update user profile:', error)
      throw error
    }
  }

  // Posts Management
  async getPosts(page: number = 1, limit: number = 20): Promise<OnlyFansPost[]> {
    try {
      const response = await axios.get(`${this.baseURL}/posts`, {
        headers: this.getHeaders(),
        params: { page, limit }
      })
      return response.data.posts
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      throw error
    }
  }

  async getPost(postId: string): Promise<OnlyFansPost> {
    try {
      const response = await axios.get(`${this.baseURL}/posts/${postId}`, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch post:', error)
      throw error
    }
  }

  async createPost(postData: Partial<OnlyFansPost>): Promise<OnlyFansPost> {
    try {
      const response = await axios.post(`${this.baseURL}/posts`, postData, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to create post:', error)
      throw error
    }
  }

  async updatePost(postId: string, updates: Partial<OnlyFansPost>): Promise<OnlyFansPost> {
    try {
      const response = await axios.patch(`${this.baseURL}/posts/${postId}`, updates, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to update post:', error)
      throw error
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/posts/${postId}`, {
        headers: this.getHeaders()
      })
    } catch (error) {
      console.error('Failed to delete post:', error)
      throw error
    }
  }

  // Analytics
  async getAnalytics(startDate?: string, endDate?: string): Promise<OnlyFansAnalytics> {
    try {
      const params: any = {}
      if (startDate) params.startDate = startDate
      if (endDate) params.endDate = endDate

      const response = await axios.get(`${this.baseURL}/analytics`, {
        headers: this.getHeaders(),
        params
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      throw error
    }
  }

  async getRevenueAnalytics(startDate?: string, endDate?: string) {
    try {
      const params: any = {}
      if (startDate) params.startDate = startDate
      if (endDate) params.endDate = endDate

      const response = await axios.get(`${this.baseURL}/analytics/revenue`, {
        headers: this.getHeaders(),
        params
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch revenue analytics:', error)
      throw error
    }
  }

  async getEngagementAnalytics(startDate?: string, endDate?: string) {
    try {
      const params: any = {}
      if (startDate) params.startDate = startDate
      if (endDate) params.endDate = endDate

      const response = await axios.get(`${this.baseURL}/analytics/engagement`, {
        headers: this.getHeaders(),
        params
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch engagement analytics:', error)
      throw error
    }
  }

  // Subscriptions
  async getSubscriptions(page: number = 1, limit: number = 20): Promise<OnlyFansSubscription[]> {
    try {
      const response = await axios.get(`${this.baseURL}/subscriptions`, {
        headers: this.getHeaders(),
        params: { page, limit }
      })
      return response.data.subscriptions
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
      throw error
    }
  }

  async getSubscription(subscriptionId: string): Promise<OnlyFansSubscription> {
    try {
      const response = await axios.get(`${this.baseURL}/subscriptions/${subscriptionId}`, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
      throw error
    }
  }

  // Messages
  async getMessages(page: number = 1, limit: number = 20): Promise<OnlyFansMessage[]> {
    try {
      const response = await axios.get(`${this.baseURL}/messages`, {
        headers: this.getHeaders(),
        params: { page, limit }
      })
      return response.data.messages
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      throw error
    }
  }

  async sendMessage(recipientId: string, content: string, mediaUrls?: string[], price?: number) {
    try {
      const messageData: any = { recipientId, content }
      if (mediaUrls) messageData.mediaUrls = mediaUrls
      if (price) messageData.price = price

      const response = await axios.post(`${this.baseURL}/messages`, messageData, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  // Content Scheduling
  async schedulePost(postData: Partial<OnlyFansPost>, scheduledDate: string): Promise<OnlyFansPost> {
    try {
      const response = await axios.post(`${this.baseURL}/posts/schedule`, {
        ...postData,
        scheduledDate
      }, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to schedule post:', error)
      throw error
    }
  }

  async getScheduledPosts(): Promise<OnlyFansPost[]> {
    try {
      const response = await axios.get(`${this.baseURL}/posts/scheduled`, {
        headers: this.getHeaders()
      })
      return response.data.posts
    } catch (error) {
      console.error('Failed to fetch scheduled posts:', error)
      throw error
    }
  }

  // Media Management
  async uploadMedia(file: File, type: 'photo' | 'video' | 'audio'): Promise<{ url: string; id: string }> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await axios.post(`${this.baseURL}/media/upload`, formData, {
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Failed to upload media:', error)
      throw error
    }
  }

  async deleteMedia(mediaId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/media/${mediaId}`, {
        headers: this.getHeaders()
      })
    } catch (error) {
      console.error('Failed to delete media:', error)
      throw error
    }
  }

  // Webhooks
  async setupWebhook(url: string, events: string[]): Promise<{ webhookId: string }> {
    try {
      const response = await axios.post(`${this.baseURL}/webhooks`, {
        url,
        events
      }, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Failed to setup webhook:', error)
      throw error
    }
  }

  async getWebhooks(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseURL}/webhooks`, {
        headers: this.getHeaders()
      })
      return response.data.webhooks
    } catch (error) {
      console.error('Failed to fetch webhooks:', error)
      throw error
    }
  }

  async deleteWebhook(webhookId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/webhooks/${webhookId}`, {
        headers: this.getHeaders()
      })
    } catch (error) {
      console.error('Failed to delete webhook:', error)
      throw error
    }
  }

  // Error handling and utilities
  isAuthenticated(): boolean {
    return !!this.accessToken
  }

  logout(): void {
    this.accessToken = ''
    localStorage.removeItem('onlyfans_access_token')
  }
}

export const onlyFansAPI = new OnlyFansAPI()
export default onlyFansAPI
