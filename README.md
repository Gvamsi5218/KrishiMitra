# KrishiMitra
The alert system behaves like a real agricultural monitoring system, only notifying farmers when there are actual dangerous conditions that require immediate attention, making it much more practical and user-friendly.

📱 Complete Setup Instructions
VS Code Setup (Detailed)
1. Prerequisites Installation

# Install Node.js (v18+)
# Download from: https://nodejs.org/

# Install VS Code
# Download from: https://code.visualstudio.com/

# Install Git
# Download from: https://git-scm.com/

# Verify installations
node --version
npm --version
git --version
2. Project Creation

# Create project directory
mkdir ai-agricultural-advisor
cd ai-agricultural-advisor

# Initialize Vite React TypeScript project
npm create vite@latest . -- --template react-ts

# Install all dependencies
npm install

# Install additional required packages
npm install @hookform/resolvers@^5.2.1 @react-three/drei@^9.92.7 @react-three/fiber@^8.15.12 date-fns@^4.1.0 framer-motion@^10.16.16 i18next@^23.7.8 lucide-react@^0.344.0 react-hook-form@^7.62.0 react-hot-toast@^2.5.2 react-i18next@^13.5.0 react-select@^5.10.2 recharts@^2.8.0 three@^0.159.0 uuid@^11.1.0 yup@^1.7.0

# Install dev dependencies
npm install --save-dev @types/three@^0.159.0 autoprefixer@^10.4.18 postcss@^8.4.35 tailwindcss@^3.4.1

# Initialize Tailwind CSS
npx tailwindcss init -p
3. VS Code Extensions (Essential)
ES7+ React/Redux/React-Native snippets
Tailwind CSS IntelliSense
Auto Rename Tag
GitLens
Prettier - Code formatter
TypeScript Importer
Thunder Client (for API testing)
4. Project Structure Creation

# Create folder structure
mkdir -p src/components/auth
mkdir -p src/components/community
mkdir -p src/components/questionnaire
mkdir -p src/contexts
mkdir -p src/data
mkdir -p src/hooks
mkdir -p src/i18n
mkdir -p src/lib
mkdir -p src/types
mkdir -p .vscode
5. Copy All Project Files
Copy all files from the artifact into their respective locations
Replace existing files (App.tsx, index.css, etc.)
Create new files as provided
6. VS Code Configuration
Create .vscode/settings.json:


{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
GitHub Setup & Deployment
7. Git Repository Setup

# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: AI Agricultural Advisor v2.0"

# Create GitHub repository (on GitHub.com)
# Repository name: ai-agricultural-advisor
# Description: AI-Powered Agricultural Advisor for Indian Farmers
# Make it Public

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-agricultural-advisor.git
git branch -M main
git push -u origin main
8. Bolt Files Cleanup

# ✅ YES, you can safely delete .bolt folder
rm -rf .bolt/

# Commit cleanup

git add .
git commit -m "Remove bolt configuration files"
git push

Running the Project
9. Development Server

# Start development server
npm run dev

# Access at: http://localhost:5173
10. Production Build

# Build for production
npm run build

# Preview production build
npm run preview
🌐 Deployment Options
Quick Deployment for Hackathons
Vercel (Recommended)

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
Netlify

# Build project
npm run build

# Drag & drop 'dist' folder to netlify.com
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
GitHub Pages

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
