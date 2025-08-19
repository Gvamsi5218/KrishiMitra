# 🚀 Complete Setup Instructions for VS Code & GitHub

## 📋 Prerequisites

### Required Software Installation
1. **Node.js (v18 or higher)**
   ```bash
   # Download from: https://nodejs.org/
   # Verify installation
   node --version
   npm --version
   ```

2. **VS Code**
   ```bash
   # Download from: https://code.visualstudio.com/
   ```

3. **Git**
   ```bash
   # Download from: https://git-scm.com/
   # Verify installation
   git --version
   ```

## 🛠️ VS Code Setup Instructions

### Step 1: Create New Project Directory
```bash
# Create project folder
mkdir ai-agricultural-advisor
cd ai-agricultural-advisor

# Open in VS Code
code .
```

### Step 2: Initialize Project
```bash
# Initialize Vite React TypeScript project
npm create vite@latest . -- --template react-ts

# Install all dependencies
npm install
```

### Step 3: Install Required Dependencies
```bash
# Install main dependencies
npm install @hookform/resolvers@^5.2.1 @react-three/drei@^9.92.7 @react-three/fiber@^8.15.12 date-fns@^4.1.0 framer-motion@^10.16.16 i18next@^23.7.8 lucide-react@^0.344.0 react-hook-form@^7.62.0 react-hot-toast@^2.5.2 react-i18next@^13.5.0 react-select@^5.10.2 recharts@^2.8.0 three@^0.159.0 uuid@^11.1.0 yup@^1.7.0

# Install dev dependencies
npm install --save-dev @types/three@^0.159.0 autoprefixer@^10.4.18 postcss@^8.4.35 tailwindcss@^3.4.1
```

### Step 4: Configure Tailwind CSS
```bash
# Initialize Tailwind
npx tailwindcss init -p
```

### Step 5: Install VS Code Extensions
Install these essential extensions:
- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **Auto Rename Tag** (formulahendry.auto-rename-tag)
- **Bracket Pair Colorizer** (coenraads.bracket-pair-colorizer)
- **GitLens** (eamodio.gitlens)
- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **TypeScript Importer** (pmneo.tsimporter)
- **Thunder Client** (rangav.vscode-thunder-client) - For API testing

## 📁 Project Structure Creation

### Step 6: Create Folder Structure
```bash
# Create all necessary folders
mkdir -p src/components/auth
mkdir -p src/components/community
mkdir -p src/components/questionnaire
mkdir -p src/contexts
mkdir -p src/data
mkdir -p src/hooks
mkdir -p src/i18n
mkdir -p src/lib
mkdir -p src/types
mkdir -p public
mkdir -p .vscode
```

### Step 7: Copy Project Files
1. **Copy all files from the artifact** into their respective locations
2. **Replace existing files** (App.tsx, index.css, etc.)
3. **Create new files** as provided in the artifact

## ⚙️ VS Code Configuration

### Step 8: Configure VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["className\\s*:\\s*['\"`]([^'\"`]*)['\"`]", "([^'\"`]*)"]
  ],
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### Step 9: Create Launch Configuration
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
```

### Step 10: Create Tasks Configuration
Create `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "dev",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "label": "npm: dev",
      "detail": "vite"
    },
    {
      "type": "npm",
      "script": "build",
      "group": "build",
      "label": "npm: build",
      "detail": "vite build"
    }
  ]
}
```

## 🚀 Running the Project

### Step 11: Start Development Server
```bash
# Start the development server
npm run dev
```
**Access at:** `http://localhost:5173`

### Step 12: Build for Production
```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📤 GitHub Setup & Deployment

### Step 13: Initialize Git Repository
```bash
# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: AI Agricultural Advisor"
```

### Step 14: Create GitHub Repository
1. **Go to GitHub.com** and create new repository
2. **Repository name:** `ai-agricultural-advisor`
3. **Description:** `AI-Powered Agricultural Advisor for Indian Farmers`
4. **Make it Public** (for hackathon visibility)
5. **Don't initialize** with README (we already have one)

### Step 15: Connect to GitHub
```bash
# Add remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-agricultural-advisor.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 16: Create .gitignore
Create `.gitignore` file:
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production build
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Bolt files (can be deleted)
.bolt/
```

## 🗑️ Cleaning Up Bolt Files

### Step 17: Remove Bolt Files (Safe to Delete)
```bash
# Remove .bolt directory (safe to delete)
rm -rf .bolt/

# Commit the cleanup
git add .
git commit -m "Remove bolt configuration files"
git push
```

**✅ Yes, you can safely delete the `.bolt` folder** - it's only used by the Bolt development environment and not needed for the actual project.

## 🌐 GitHub Pages Deployment (Optional)

### Step 18: Deploy to GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"homepage": "https://YOUR_USERNAME.github.io/ai-agricultural-advisor",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

1. **Port 5173 already in use:**
   ```bash
   npx kill-port 5173
   # or
   npm run dev -- --port 3000
   ```

2. **Node modules issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors:**
   - Press `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

4. **Git authentication issues:**
   ```bash
   # Use personal access token instead of password
   git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/ai-agricultural-advisor.git
   ```

5. **Build errors:**
   ```bash
   # Clear cache
   npm run build -- --force
   ```

## 📊 Project Verification Checklist

### ✅ Before Submitting
- [ ] All dependencies installed successfully
- [ ] Development server runs without errors
- [ ] All 29+ languages work correctly
- [ ] AI Assistant responds to queries
- [ ] Voice interface functions properly
- [ ] Real-time alerts trigger appropriately
- [ ] Customer support chat works
- [ ] All navigation links functional
- [ ] Mobile responsive design works
- [ ] Production build completes successfully
- [ ] GitHub repository is public and accessible
- [ ] README.md is comprehensive
- [ ] All features demonstrated in demo

## 🎯 Demo Preparation

### Key Features to Demonstrate
1. **Multilingual Support** - Switch between Hindi/English/Regional languages
2. **AI Assistant** - Ask farming questions and get intelligent responses
3. **Voice Commands** - Use voice to navigate and ask questions
4. **Real-Time Alerts** - Show emergency notifications system
5. **Interactive Dashboard** - Display live sensor data and analytics
6. **Customer Support** - Demonstrate 24/7 support system
7. **Government Integration** - Show official portal features
8. **Mobile Responsiveness** - Test on different screen sizes

## 🏆 Hackathon Submission

### Repository Structure for Judges
```
ai-agricultural-advisor/
├── README.md (Comprehensive project overview)
├── SETUP_INSTRUCTIONS.md (This file)
├── package.json (All dependencies listed)
├── src/ (Complete source code)
├── public/ (Static assets)
└── dist/ (Production build - if included)
```

### Submission Checklist
- [ ] Repository is public on GitHub
- [ ] README.md explains the project thoroughly
- [ ] Setup instructions are clear and complete
- [ ] Live demo URL provided (if deployed)
- [ ] All features are working and demonstrated
- [ ] Code is well-commented and organized
- [ ] Project addresses real farming challenges
- [ ] Technical innovation is clearly highlighted

**🎉 Your AI Agricultural Advisor is now ready for hackathon submission!**