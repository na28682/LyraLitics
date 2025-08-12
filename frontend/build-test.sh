#!/bin/bash

echo "🔍 Testing LyraLytics Frontend Build..."
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the frontend directory."
    exit 1
fi

echo "✅ Found package.json"

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js version: $NODE_VERSION"
else
    echo "❌ Error: Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm version: $NPM_VERSION"
else
    echo "❌ Error: npm not found. Please install npm"
    exit 1
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
else
    echo "⚠️  node_modules not found. Installing dependencies..."
    npm install
fi

# Check Tailwind config
if [ -f "tailwind.config.js" ]; then
    echo "✅ tailwind.config.js exists"
    # Test if the config is valid
    if node -e "require('./tailwind.config.js'); console.log('✅ Tailwind config is valid')" 2>/dev/null; then
        echo "✅ Tailwind config syntax is valid"
    else
        echo "❌ Tailwind config has syntax errors"
        exit 1
    fi
else
    echo "❌ Error: tailwind.config.js not found"
    exit 1
fi

# Check PostCSS config
if [ -f "postcss.config.js" ]; then
    echo "✅ postcss.config.js exists"
else
    echo "❌ Error: postcss.config.js not found"
    exit 1
fi

# Check Next.js config
if [ -f "next.config.js" ]; then
    echo "✅ next.config.js exists"
else
    echo "❌ Error: next.config.js not found"
    exit 1
fi

# Check TypeScript config
if [ -f "tsconfig.json" ]; then
    echo "✅ tsconfig.json exists"
else
    echo "❌ Error: tsconfig.json not found"
    exit 1
fi

# Check source files
if [ -d "src" ]; then
    echo "✅ src directory exists"
    SRC_FILES=$(find src -name "*.tsx" -o -name "*.ts" | wc -l)
    echo "✅ Found $SRC_FILES source files"
else
    echo "❌ Error: src directory not found"
    exit 1
fi

echo ""
echo "🚀 All checks passed! Attempting build..."
echo "========================================"

# Try to build
if npm run build; then
    echo ""
    echo "🎉 Build successful! Your frontend is ready to deploy."
else
    echo ""
    echo "❌ Build failed. Check the error messages above."
    echo ""
    echo "🔧 Common fixes:"
    echo "1. Clear cache: rm -rf .next"
    echo "2. Reinstall dependencies: rm -rf node_modules && npm install"
    echo "3. Check for syntax errors in your TypeScript files"
    echo "4. Verify all imports are correct"
    exit 1
fi
