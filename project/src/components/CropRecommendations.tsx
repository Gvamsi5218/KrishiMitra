import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Zap, Star, Calendar, DollarSign } from 'lucide-react';
import { CropRecommendation } from '../types';
import { useTranslation } from 'react-i18next';

interface CropRecommendationsProps {
  recommendations: CropRecommendation[];
}

export default function CropRecommendations({ recommendations }: CropRecommendationsProps) {
  const { t } = useTranslation();

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 90) return 'text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border-green-300';
    if (suitability >= 75) return 'text-yellow-700 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300';
    return 'text-red-700 bg-gradient-to-r from-red-100 to-pink-100 border-red-300';
  };

  const getSuitabilityText = (suitability: number) => {
    if (suitability >= 90) return 'बहुत अच्छा • Excellent';
    if (suitability >= 75) return 'अच्छा • Good';
    return 'सुधार चाहिए • Needs Care';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-6 border border-green-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            {t('recommendations')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">🤖 AI सुझाव • AI Recommendations</p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"
        />
      </div>

      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <motion.div
            key={crop.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="border-2 border-gray-200 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl bg-green-100 p-3 rounded-xl">{crop.icon}</div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">{crop.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-sm px-3 py-1 rounded-full border-2 font-medium ${getSuitabilityColor(crop.suitability)}`}>
                      ⭐ {crop.suitability}% - {getSuitabilityText(crop.suitability)}
                    </span>
                  </div>
                </div>
              </div>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">उत्पादन • Expected Yield</p>
                <p className="font-bold text-xl text-green-700">{crop.expectedYield}</p>
                <p className="text-xs text-green-600">टन/एकड़ • tons/acre</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">लाभ • Profitability</p>
                <p className="font-bold text-xl text-blue-700">{crop.profitability}%</p>
                <p className="text-xs text-blue-600">मुनाफा • Profit</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                मुख्य कारण • Key Reasons:
              </p>
              {crop.reasons.slice(0, 2).map((reason, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-start gap-3 p-2 bg-white rounded-lg border border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                >
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{reason}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-bold text-sm hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {t('getRecommendation')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-3 border-2 border-green-600 text-green-700 rounded-xl font-medium text-sm hover:bg-green-50 transition-all duration-300 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Plan
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 rounded-xl border border-yellow-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎯</div>
          <div>
            <p className="font-bold text-gray-800">💡 सुझाव • Pro Tip</p>
            <p className="text-sm text-gray-700">
              मिट्टी की जांच कराएं और मौसम का ध्यान रखें • Get soil tested and monitor weather conditions
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}