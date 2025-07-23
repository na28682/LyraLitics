# LyraLytics Frontend

A modern, responsive Next.js frontend for the LyraLytics unified analytics platform.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful responsive layouts
- **Interactive Dashboards**: Real-time analytics with charts and visualizations
- **Task Management**: Comprehensive task planning and workflow management
- **Social Media Monitoring**: Multi-platform social media analytics
- **Ecommerce Analytics**: Sales tracking and customer insights
- **Real-time Updates**: Live data updates and notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Notifications**: React Hot Toast

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Environment Setup**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_APP_NAME=LyraLytics
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── DashboardOverview.tsx
│   │   ├── EcommerceAnalytics.tsx
│   │   ├── SocialMediaMonitor.tsx
│   │   └── TaskPlanner.tsx
│   └── providers.tsx      # Context providers
└── types/                 # TypeScript type definitions
```

## 📱 Pages & Components

### Landing Page (`/`)
- Hero section with value proposition
- Feature overview
- Statistics and social proof
- Call-to-action sections

### Dashboard (`/dashboard`)
- **Overview**: Key metrics and recent activity
- **Ecommerce Analytics**: Sales data, product performance, customer segmentation
- **Social Media Monitor**: Multi-platform engagement tracking
- **Task Planner**: Task management with priority scoring

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Cyan (#0ea5e9)
- **Success**: Green (#22c55e)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)

### Components
- Cards with consistent styling
- Interactive buttons with hover states
- Form inputs with focus states
- Responsive navigation
- Data tables with sorting

## 📊 Data Visualization

The platform uses Recharts for data visualization:

- **Line Charts**: Trend analysis over time
- **Bar Charts**: Comparison between categories
- **Pie Charts**: Distribution analysis
- **Progress Bars**: Task completion tracking

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Implement responsive design patterns
- Write accessible components

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🔗 API Integration

The frontend is configured to connect to the LyraLytics backend API:

- **Base URL**: `http://localhost:3001` (development)
- **API Routes**: `/api/*`
- **Authentication**: JWT-based auth
- **Real-time**: WebSocket connections for live updates

## 📈 Performance

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: TanStack Query for data caching
- **Bundle Analysis**: Built-in Next.js analytics

## 🔒 Security

- **CORS**: Configured for API communication
- **Environment Variables**: Secure configuration management
- **Input Validation**: Client-side form validation
- **XSS Protection**: React's built-in protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the LyraLytics platform and follows the same licensing terms.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ by the LyraLytics team 