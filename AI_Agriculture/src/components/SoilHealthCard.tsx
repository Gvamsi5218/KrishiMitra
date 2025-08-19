import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, TrendingUp, AlertCircle } from 'lucide-react';
import { SoilData } from '../types';

interface SoilHealthCardProps {
  soilData: SoilData;
}

export default function SoilHealthCard({ soilData }: SoilHealthCardProps) {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-700 bg-green-100';
      case 'good': return 'text-green-600 bg-green-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getNutrientStatus = (value: number, nutrient: string) => {
    const ranges = {
      nitrogen: { low: 200, high: 300 },
      phosphorus: { low: 20, high: 40 },
      potassium: { low: 150, high: 250 }
    };

    const range = ranges[nutrient as keyof typeof ranges];
    if (!range) return 'normal';

    if (value < range.low) return 'low';
    if (value > range.high) return 'high';
    return 'normal';
  };

  const nutrients = [
    { name: 'Nitrogen', value: soilData.nitrogen, unit: 'ppm', key: 'nitrogen' },
    { name: 'Phosphorus', value: soilData.phosphorus, unit: 'ppm', key: 'phosphorus' },
    { name: 'Potassium', value: soilData.potassium, unit: 'ppm', key: 'potassium' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Soil Health</h3>
        <Beaker className="w-6 h-6 text-purple-600" />
      </div>

      <div className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(soilData.health)}`}>
            Overall Health: {soilData.health.toUpperCase()}
          </div>
          <p className="text-gray-600 text-sm mt-2">pH Level: {soilData.ph}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {nutrients.map((nutrient, index) => {
            const status = getNutrientStatus(nutrient.value, nutrient.key);
            return (
              <motion.div
                key={nutrient.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    status === 'low' ? 'bg-red-400' :
                    status === 'high' ? 'bg-yellow-400' :
                    'bg-green-400'
                  }`} />
                  <span className="font-medium text-gray-700">{nutrient.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800">{nutrient.value} {nutrient.unit}</span>
                  {status !== 'normal' && (
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-orange-500" />
                      <span className="text-xs text-orange-600 capitalize">{status}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Organic Matter: {soilData.organicMatter}%</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">Recommended: 2.5-3.5% for optimal crop growth</p>
        </div>
      </div>
    </motion.div>
  );
}