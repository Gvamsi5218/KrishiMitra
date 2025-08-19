import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Wheat, 
  Cloud, 
  CreditCard, 
  Users, 
  Menu, 
  X,
  Leaf,
  TrendingUp,
  Award,
  User
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home, color: 'bg-green-500', description: 'Overview' },
    { id: 'crops', label: t('crops'), icon: Wheat, color: 'bg-yellow-500', description: 'Crop Management' },
    { id: 'weather', label: t('weather'), icon: Cloud, color: 'bg-blue-500', description: 'Weather Info' },
    { id: 'market', label: t('market'), icon: TrendingUp, color: 'bg-purple-500', description: 'Market Prices' },
    { id: 'finance', label: t('finance'), icon: CreditCard, color: 'bg-orange-500', description: 'Financial Help' },
    { id: 'schemes', label: t('schemes'), icon: Award, color: 'bg-red-500', description: 'Government Schemes' },
    { id: 'community', label: t('community'), icon: Users, color: 'bg-indigo-500', description: 'Farmer Network' },
    { id: 'profile', label: t('profile'), icon: User, color: 'bg-gray-500', description: 'My Profile' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between bg-gradient-to-r from-green-600 via-green-700 to-green-800 shadow-xl px-6 py-4 sticky top-0 z-40">
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white p-3 rounded-xl shadow-lg">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-white">🌾 KrishiMitra</h1>
            <p className="text-sm text-green-100">AI कृषि सलाहकार • AI Agricultural Advisor</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 overflow-x-auto flex-1 justify-center">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all duration-300 min-w-[80px] ${
                  activeTab === item.id
                    ? 'bg-white text-green-700 shadow-lg transform -translate-y-1'
                    : 'text-white hover:bg-white/20 hover:backdrop-blur-sm'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === item.id ? item.color : 'bg-white/20'}`}>
                  <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-white'}`} />
                </div>
                <span className="font-medium text-xs text-center">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">किसान जी • Farmer</p>
              <p className="text-xs text-green-100">खुशीपुर • Khushipur</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-lg">👨‍🌾</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-gradient-to-r from-green-600 to-green-700 shadow-xl sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white p-2 rounded-lg shadow-md">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">🌾 KrishiMitra</h1>
              <p className="text-xs text-green-100">AI कृषि सलाहकार</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-sm">👨‍🌾</span>
              </div>
              <span className="text-xs text-white">किसान जी</span>
            </div>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-green-200"
          >
            <div className="px-4 py-2 grid grid-cols-2 gap-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 px-3 py-4 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : 'text-gray-600 hover:bg-green-50 hover:text-green-700 border-2 border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-200 z-40 shadow-2xl">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 px-2 py-2 transition-all duration-300 ${
                  activeTab === item.id
                    ? 'text-green-600 transform -translate-y-1'
                    : 'text-gray-400'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === item.id ? item.color : 'bg-gray-100'}`}>
                  <Icon className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="w-1 h-1 bg-green-500 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}