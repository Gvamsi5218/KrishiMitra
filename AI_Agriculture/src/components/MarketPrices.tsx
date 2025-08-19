import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MapPin, DollarSign, BarChart3 } from 'lucide-react';
import { CropPrice } from '../types';
import { useTranslation } from 'react-i18next';

interface MarketPricesProps {
  prices: CropPrice[];
}

export default function MarketPrices({ prices }: MarketPricesProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            {t('cropPrices')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">📊 बाजार भाव • Market Rates</p>
        </div>
        <div className="flex items-center text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
          Live Prices
        </div>
      </div>

      <div className="space-y-4">
        {prices.map((price, index) => (
          <motion.div
            key={price.crop}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {price.crop.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-800">{price.crop}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <p className="text-xs text-gray-600">{price.market}</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <p className="font-bold text-xl text-gray-800">₹{price.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-end gap-1">
                {price.change > 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full">
                      +{price.change}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600 font-bold bg-red-100 px-2 py-1 rounded-full">
                      {price.change}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl border border-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="font-bold text-gray-800">बाजार सुझाव • Market Tip</p>
            <p className="text-sm text-gray-700">
              कपास की कीमत बढ़ रही है! अच्छा समय है बेचने का • Cotton prices are rising! Good time to sell
            </p>
          </div>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
      >
        <BarChart3 className="w-5 h-5" />
        विस्तृत विश्लेषण देखें • View Detailed Analysis
      </motion.button>
    </motion.div>
  );
}