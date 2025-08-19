import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, 
  TrendingUp, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  Bell,
  Award,
  Zap,
  Users
} from 'lucide-react';

interface NewsItem {
  id: string;
  category: 'policy' | 'technology' | 'market' | 'weather' | 'success';
  title: string;
  summary: string;
  date: Date;
  importance: 'high' | 'medium' | 'low';
  url: string;
  isNew: boolean;
}

export default function NewsAndUpdates() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Simulate real-time news updates
    const newsItems: NewsItem[] = [
      {
        id: '1',
        category: 'policy',
        title: 'PM-KISAN की 16वीं किस्त जारी • PM-KISAN 16th Installment Released',
        summary: '8 करोड़ किसानों के खाते में ₹2000 की राशि भेजी गई। • ₹2000 transferred to 8 crore farmers accounts.',
        date: new Date(),
        importance: 'high',
        url: '#',
        isNew: true
      },
      {
        id: '2',
        category: 'technology',
        title: 'AI-आधारित फसल निगरानी सिस्टम लॉन्च • AI-based Crop Monitoring System Launched',
        summary: 'ड्रोन और सैटेलाइट तकनीक से फसल की निगरानी। • Crop monitoring using drone and satellite technology.',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000),
        importance: 'high',
        url: '#',
        isNew: true
      },
      {
        id: '3',
        category: 'market',
        title: 'गेहूं की कीमत में 15% वृद्धि • 15% Increase in Wheat Prices',
        summary: 'अंतर्राष्ट्रीय बाजार में मांग बढ़ने से कीमत में वृद्धि। • Price increase due to rising international demand.',
        date: new Date(Date.now() - 4 * 60 * 60 * 1000),
        importance: 'medium',
        url: '#',
        isNew: false
      },
      {
        id: '4',
        category: 'weather',
        title: 'मानसून पूर्वानुमान अपडेट • Monsoon Forecast Update',
        summary: 'इस साल सामान्य से अधिक बारिश की संभावना। • Above normal rainfall expected this year.',
        date: new Date(Date.now() - 6 * 60 * 60 * 1000),
        importance: 'high',
        url: '#',
        isNew: false
      },
      {
        id: '5',
        category: 'success',
        title: 'जैविक खेती में 200% वृद्धि • 200% Growth in Organic Farming',
        summary: 'पिछले 5 सालों में जैविक खेती का क्षेत्रफल तीन गुना बढ़ा। • Organic farming area tripled in last 5 years.',
        date: new Date(Date.now() - 8 * 60 * 60 * 1000),
        importance: 'medium',
        url: '#',
        isNew: false
      }
    ];

    setNews(newsItems);

    // Simulate new news every 2 minutes
    const interval = setInterval(() => {
      const newNewsItem: NewsItem = {
        id: Date.now().toString(),
        category: ['policy', 'technology', 'market', 'weather', 'success'][Math.floor(Math.random() * 5)] as any,
        title: getRandomNewsTitle(),
        summary: getRandomNewsSummary(),
        date: new Date(),
        importance: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
        url: '#',
        isNew: true
      };

      setNews(prev => [newNewsItem, ...prev.slice(0, 9)]);
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  const getRandomNewsTitle = () => {
    const titles = [
      'नई कृषि नीति की घोषणा • New Agricultural Policy Announced',
      'ड्रोन सब्सिडी योजना शुरू • Drone Subsidy Scheme Launched',
      'फसल बीमा में सुधार • Crop Insurance Improvements',
      'कृषि निर्यात में रिकॉर्ड वृद्धि • Record Growth in Agricultural Exports',
      'स्मार्ट फार्मिंग तकनीक का विस्तार • Smart Farming Technology Expansion'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomNewsSummary = () => {
    const summaries = [
      'सरकार ने किसानों के लिए नई योजना की घोषणा की है। • Government announces new scheme for farmers.',
      'तकनीकी सुधार से कृषि उत्पादकता में वृद्धि। • Technology improvements increase agricultural productivity.',
      'बाजार में नए अवसर और बेहतर कीमतें। • New opportunities and better prices in market.',
      'मौसम की बेहतर भविष्यवाणी से फसल सुरक्षा। • Better weather prediction for crop protection.'
    ];
    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const categories = [
    { id: 'all', name: 'सभी • All', icon: Newspaper, color: 'text-gray-600' },
    { id: 'policy', name: 'नीति • Policy', icon: Award, color: 'text-blue-600' },
    { id: 'technology', name: 'तकनीक • Technology', icon: Zap, color: 'text-purple-600' },
    { id: 'market', name: 'बाजार • Market', icon: TrendingUp, color: 'text-green-600' },
    { id: 'weather', name: 'मौसम • Weather', icon: Calendar, color: 'text-cyan-600' },
    { id: 'success', name: 'सफलता • Success', icon: Users, color: 'text-orange-600' }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Newspaper;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'text-gray-600';
  };

  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">📰 समाचार और अपडेट • News & Updates</h3>
            <p className="text-sm text-gray-600">ताजा कृषि समाचार • Latest Agricultural News</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-red-600 font-medium">Live</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${activeCategory === category.id ? 'text-blue-600' : category.color}`} />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* News Items */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredNews.map((item, index) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className={`border-l-4 rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${getImportanceColor(item.importance)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.category === 'policy' ? 'bg-blue-100' :
                        item.category === 'technology' ? 'bg-purple-100' :
                        item.category === 'market' ? 'bg-green-100' :
                        item.category === 'weather' ? 'bg-cyan-100' :
                        'bg-orange-100'
                      }`}>
                        <Icon className={`w-4 h-4 ${getCategoryColor(item.category)}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isNew && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.importance === 'high' ? 'bg-red-100 text-red-800' :
                          item.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.importance === 'high' ? 'महत्वपूर्ण • Important' :
                           item.importance === 'medium' ? 'सामान्य • Normal' :
                           'जानकारी • Info'}
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-gray-800 mb-2 leading-tight">
                      {item.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {item.date.toLocaleString('hi-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <span>पढ़ें • Read</span>
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* View All News Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
      >
        <ExternalLink className="w-5 h-5" />
        सभी समाचार देखें • View All News
      </motion.button>
    </motion.div>
  );
}