import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n/config';

// Components
import Navigation from './components/Navigation';
import GovernmentBanner from './components/GovernmentBanner';
import Footer from './components/Footer';
import CustomerSupport from './components/CustomerSupport';
import EmergencyAlerts from './components/EmergencyAlerts';
import NewsAndUpdates from './components/NewsAndUpdates';
import WeatherWidget from './components/WeatherWidget';
import CropRecommendations from './components/CropRecommendations';
import MarketPrices from './components/MarketPrices';
import SoilHealthCard from './components/SoilHealthCard';
import GovernmentSchemes from './components/GovernmentSchemes';
import DigitalTwin3D from './components/DigitalTwin3D';
import DataVisualization from './components/DataVisualization';
import VoiceInterface from './components/VoiceInterface';
import AIAssistant from './components/AIAssistant';
import SmartRecommendations from './components/SmartRecommendations';
import RealTimeAlerts from './components/RealTimeAlerts';
import InteractiveDashboard from './components/InteractiveDashboard';

// Data
import {
  mockWeatherData,
  mockCropPrices,
  mockCropRecommendations,
  mockSoilData,
  mockGovernmentSchemes,
  mockRealTimeAlerts,
  mockAIInsights
} from './data/mockData';

// Page Components
const DashboardPage = ({ onOpenAI }: { onOpenAI: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <RealTimeAlerts alerts={mockRealTimeAlerts} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">🌾 {t('welcome')}, किसान जी 👨‍🌾</h2>
            <p className="text-green-100 text-lg">
              आपका AI कृषि सलाहकार • Your AI Agricultural Advisor
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                🌱 Smart Farming
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                📊 Data Driven
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                🤖 AI Powered
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenAI}
              className="mt-4 bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg"
            >
              🤖 AI से सवाल पूछें • Ask AI a Question
            </motion.button>
          </div>
          <div className="text-8xl animate-bounce">🚜</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <InteractiveDashboard />
        </div>
        
        <div className="lg:col-span-1">
          <WeatherWidget data={mockWeatherData} />
        </div>
        <div className="lg:col-span-1">
          <MarketPrices prices={mockCropPrices} />
        </div>
        <div className="lg:col-span-1">
          <SoilHealthCard soilData={mockSoilData} />
        </div>
        <div className="lg:col-span-3">
          <SmartRecommendations insights={mockAIInsights} />
        </div>
        <div className="lg:col-span-2 xl:col-span-2">
          <CropRecommendations recommendations={mockCropRecommendations} />
        </div>
        <div className="lg:col-span-2 xl:col-span-1">
          <DigitalTwin3D />
        </div>
        <div className="lg:col-span-3">
          <NewsAndUpdates />
        </div>
      </div>
    </div>
  );
};

const CropsPage = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-yellow-500 to-green-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-2">🌾 फसल प्रबंधन • Crop Management</h2>
      <p className="text-yellow-100">अपनी फसलों की देखभाल करें • Take care of your crops</p>
    </motion.div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CropRecommendations recommendations={mockCropRecommendations} />
      <SoilHealthCard soilData={mockSoilData} />
      <div className="lg:col-span-2">
        <DigitalTwin3D />
      </div>
    </div>
  </div>
);

const WeatherPage = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-2">🌤️ मौसम जानकारी • Weather Information</h2>
      <p className="text-blue-100">आज का मौसम और पूर्वानुमान • Today's weather and forecast</p>
    </motion.div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WeatherWidget data={mockWeatherData} />
      <DataVisualization />
    </div>
  </div>
);

const MarketPage = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-2">📈 बाजार भाव • Market Prices</h2>
      <p className="text-purple-100">आज के ताजा भाव देखें • Check today's fresh prices</p>
    </motion.div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MarketPrices prices={mockCropPrices} />
      <DataVisualization />
    </div>
  </div>
);

const FinancePage = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-2">💰 वित्तीय सहायता • Financial Help</h2>
      <p className="text-orange-100">कर्ज और वित्तीय सलाह • Loans and financial advice</p>
    </motion.div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GovernmentSchemes schemes={mockGovernmentSchemes} />
      <MarketPrices prices={mockCropPrices} />
    </div>
  </div>
);

const SchemesPage = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-2">🏆 सरकारी योजनाएं • Government Schemes</h2>
      <p className="text-red-100">सरकारी मदद और योजनाओं की जानकारी • Government help and scheme information</p>
    </motion.div>
    
    <div className="grid grid-cols-1 gap-6">
      <GovernmentSchemes schemes={mockGovernmentSchemes} />
    </div>
  </div>
);

const CommunityPage = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-2">👥 किसान समुदाय • Farmer Community</h2>
      <p className="text-indigo-100">अन्य किसानों से जुड़ें और अनुभव साझा करें • Connect with other farmers and share experiences</p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">👨‍🌾</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">राम कुमार • Ram Kumar</h4>
              <p className="text-sm text-gray-600">खुशीपुर, लुधियाना • Khushipur, Ludhiana</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            धान की फसल में कीट की समस्या हो रही है। कोई अच्छा उपाय बताएं।
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-red-600">
                ❤️ <span>12</span>
              </button>
              <button className="flex items-center gap-1 text-blue-600">
                💬 <span>5</span>
              </button>
            </div>
            <span className="text-xs text-gray-500">2 घंटे पहले • 2 hours ago</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl p-6 text-white shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-2">👤 मेरी प्रोफाइल • My Profile</h2>
      <p className="text-gray-200">अपनी जानकारी देखें और अपडेट करें • View and update your information</p>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl">👨‍🌾</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">राम कुमार • Ram Kumar</h3>
        <p className="text-gray-600">किसान • Farmer</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-2">खेत की जानकारी • Farm Details</h4>
          <p className="text-sm text-gray-600">क्षेत्रफल: 5 एकड़ • Area: 5 acres</p>
          <p className="text-sm text-gray-600">स्थान: लुधियाना, पंजाब • Location: Ludhiana, Punjab</p>
          <p className="text-sm text-gray-600">फसल: धान, गेहूं • Crops: Rice, Wheat</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-2">संपर्क • Contact</h4>
          <p className="text-sm text-gray-600">फोन: +91 98765 43210 • Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-600">गांव: खुशीपुर • Village: Khushipur</p>
        </div>
      </div>
    </motion.div>
  </div>
);

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('weather') || lowerCommand.includes('मौसम')) {
      setActiveTab('weather');
    } else if (lowerCommand.includes('crop') || lowerCommand.includes('फसल')) {
      setActiveTab('crops');
    } else if (lowerCommand.includes('price') || lowerCommand.includes('भाव') || lowerCommand.includes('market')) {
      setActiveTab('market');
    } else if (lowerCommand.includes('scheme') || lowerCommand.includes('योजना')) {
      setActiveTab('schemes');
    } else if (lowerCommand.includes('finance') || lowerCommand.includes('पैसा')) {
      setActiveTab('finance');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage onOpenAI={() => setShowAIAssistant(true)} />;
      case 'crops': return <CropsPage />;
      case 'weather': return <WeatherPage />;
      case 'market': return <MarketPage />;
      case 'finance': return <FinancePage />;
      case 'schemes': return <SchemesPage />;
      case 'community': return <CommunityPage />;
      case 'profile': return <ProfilePage />;
      default: return <DashboardPage onOpenAI={() => setShowAIAssistant(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      <GovernmentBanner />
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      <main className="container mx-auto px-4 py-6 pb-24 lg:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <VoiceInterface onCommand={handleVoiceCommand} />
      <CustomerSupport />
      <EmergencyAlerts />
      
      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />
    </div>
  );
}

export default App;