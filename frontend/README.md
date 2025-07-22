# LyraLytics Frontend

A modern, bubbly React frontend for the LyraLytics social media analytics platform.

## Features

- 🎨 **Bubbly Design**: Modern, animated UI with glass morphism effects
- 👤 **Smart Name Detection**: Automatically detects user's name from Google account or other sources
- 🔗 **Social Media Integration**: Connect Google, Instagram, Twitter, and YouTube accounts
- 📊 **Real-time Analytics**: Beautiful charts and data visualization
- 🔐 **Secure OAuth**: Industry-standard authentication for all platforms
- 📱 **Responsive Design**: Works perfectly on all devices

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your API keys:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_INSTAGRAM_CLIENT_ID=your_instagram_client_id
REACT_APP_TWITTER_CLIENT_ID=your_twitter_client_id
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Social Media API Setup

### Google/YouTube
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins

### Instagram
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display product
4. Configure OAuth redirect URIs
5. Get your app ID and secret

### Twitter
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Enable OAuth 2.0
4. Configure callback URLs
5. Get your client ID and secret

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # React components
│   ├── WelcomeScreen.js # Welcome page with name detection
│   ├── SocialConnect.js # Social media connection
│   ├── Dashboard.js     # Main dashboard
│   └── Analytics.js     # Detailed analytics
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication state
├── App.js             # Main app component
├── index.js           # Entry point
└── index.css          # Global styles
```

## Features in Detail

### Welcome Screen
- Bubbly animated text that says "Welcome [Name]!"
- Smart name detection from Google account
- Beautiful floating bubble animations
- Feature showcase with icons

### Social Connect
- Connect multiple social media platforms
- Real-time connection status
- Progress tracking
- Security information display

### Dashboard
- Overview of all connected accounts
- Real-time analytics data
- Interactive charts and graphs
- Platform-specific performance metrics

### Analytics
- Detailed engagement analytics
- Audience demographics
- Performance radar charts
- Export functionality

## Styling

The app uses:
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Chart.js** for data visualization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details 