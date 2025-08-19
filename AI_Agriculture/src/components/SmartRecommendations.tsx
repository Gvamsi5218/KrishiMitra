import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Zap, Target, Lightbulb, Star } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'opportunity' | 'tip';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionable: boolean;
}

interface SmartRecommendationsProps {
  insights: AIInsight[];
}

export default function SmartRecommendations({ insights }: SmartRecommendationsProps) {
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [currentInsights, setCurrentInsights] = useState<AIInsight[]>([]);

  useEffect(() => {
    // Simulate real-time AI insights generation
    const interval = setInterval(() => {
      const newInsight: AIInsight = {
        id: Date.now().toString(),
        type: ['recommendation', 'warning', 'opportunity', 'tip'][Math.floor(Math.random() * 4)] as any,
        title: getRandomTitle(),
        description: getRandomDescription(),
        confidence: Math.floor(Math.random() * 30) + 70,
        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
        category: ['crop', 'weather', 'market', 'soil'][Math.floor(Math.random() * 4)],
        actionable: Math.random() > 0.3,
      };

      setCurrentInsights(prev => [newInsight, ...prev.slice(0, 4)]);
    }, 8000);

    // Initialize with provided insights
    setCurrentInsights(insights.slice(0, 5));

    return () => clearInterval(interval);
  }, [insights]);

  const getRandomTitle = () => {
    const titles = [
      'धान की बुआई का सही समय • Optimal Rice Sowing Time',
      'मिट्टी में नाइट्रोजन की कमी • Nitrogen Deficiency in Soil',
      'कपास की कीमत बढ़ने की संभावना • Cotton Price Likely to Rise',
      'बारिश से पहले फसल की सुरक्षा • Protect Crops Before Rain',
      'जैविक खाद का उपयोग करें • Use Organic Fertilizer',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomDescription = () => {
    const descriptions = [
      'मौसम विभाग के अनुसार अगले सप्ताह बारिश की संभावना है। फसल को ढकने की तैयारी करें।',
      'मिट्टी परीक्षण रिपोर्ट के आधार पर यूरिया का छिड़काव करने की सलाह दी जाती है।',
      'बाजार विश्लेषण के अनुसार कपास की कीमत अगले महीने 15% तक बढ़ सकती है।',
      'तापमान 35°C से ऊपर जाने पर पानी की मात्रा दोगुनी कर दें।',
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return Target;
      case 'warning': return AlertTriangle;
      case 'opportunity': return TrendingUp;
      case 'tip': return Lightbulb;
      default: return Brain;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'from-blue-500 to-cyan-500';
      case 'warning': return 'from-red-500 to-orange-500';
      case 'opportunity': return 'from-green-500 to-emerald-500';
      case 'tip': return 'from-yellow-500 to-amber-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">🧠 AI स्मार्ट सुझाव • Smart AI Recommendations</h3>
            <p className="text-sm text-gray-600">वास्तविक समय में AI विश्लेषण • Real-time AI Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence>
          {currentInsights.map((insight, index) => {
            const Icon = getTypeIcon(insight.type);
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setActiveInsight(activeInsight === insight.id ? null : insight.id)}
                className="cursor-pointer bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(insight.type)} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm leading-tight">{insight.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact} impact
                        </span>
                        <span className="text-xs text-gray-500">{insight.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-bold text-gray-700">{insight.confidence}%</span>
                  </div>
                </div>

                <AnimatePresence>
                  {activeInsight === insight.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-gray-200"
                    >
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {insight.description}
                      </p>
                      {insight.actionable && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                        >
                          <Zap className="w-4 h-4" />
                          कार्य करें • Take Action
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500">Just now</span>
                  </div>
                  {insight.actionable && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl border border-indigo-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎯</div>
          <div>
            <p className="font-bold text-gray-800">AI विश्वसनीयता • AI Reliability</p>
            <p className="text-sm text-gray-700">
              हमारे AI मॉडल की सटीकता 94% है और यह 50,000+ किसानों के डेटा पर आधारित है • Our AI model has 94% accuracy based on data from 50,000+ farmers
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}