import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Thermometer, Sun, CloudRain, Eye } from 'lucide-react';
import { WeatherData } from '../types';
import { useTranslation } from 'react-i18next';

interface WeatherWidgetProps {
  data: WeatherData;
}

export default function WeatherWidget({ data }: WeatherWidgetProps) {
  const { t } = useTranslation();

  const weatherMetrics = [
    {
      label: t('temperature'),
      value: `${data.temperature}°C`,
      icon: Thermometer,
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-orange-50',
      iconBg: 'bg-red-100'
    },
    {
      label: t('humidity'),
      value: `${data.humidity}%`,
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconBg: 'bg-blue-100'
    },
    {
      label: t('rainfall'),
      value: `${data.rainfall}mm`,
      icon: CloudRain,
      color: 'text-indigo-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      iconBg: 'bg-indigo-100'
    },
    {
      label: t('windSpeed'),
      value: `${data.windSpeed} km/h`,
      icon: Wind,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconBg: 'bg-green-100'
    }
  ];

  const getWeatherAdvice = () => {
    if (data.temperature > 35) return "🌡️ बहुत गर्मी है! पानी ज्यादा दें • Very hot! Water more";
    if (data.rainfall > 20) return "🌧️ बारिश हो रही है! फसल की देखभाल करें • Raining! Take care of crops";
    if (data.humidity > 80) return "💧 नमी ज्यादा है! बीमारी से बचाव करें • High humidity! Prevent diseases";
    return "☀️ मौसम अच्छा है! खेती के लिए उपयुक्त • Good weather! Suitable for farming";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-blue-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Cloud className="w-6 h-6 text-blue-600" />
            {t('todaysWeather')}
          </h3>
          <p className="text-sm text-gray-600 mt-1">आज का मौसम • Today's Weather</p>
        </div>
        <div className="text-6xl animate-bounce">{data.icon}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {weatherMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${metric.bgColor} rounded-xl p-4 transition-all duration-300 hover:shadow-lg border border-white/50`}
            >
              <div className="flex items-center gap-3">
                <div className={`${metric.iconBg} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-xl font-bold text-gray-800">{metric.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="p-4 bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 rounded-xl border border-green-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800 mb-1">
              🤖 AI सुझाव • AI Advice
            </p>
            <p className="text-sm text-gray-700">
              {getWeatherAdvice()}
            </p>
          </div>
          <Eye className="w-5 h-5 text-green-600" />
        </div>
      </motion.div>

      <motion.div 
        className="mt-4 flex items-center justify-between text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span>🕐 Last updated: Just now</span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Data
        </span>
      </motion.div>
    </motion.div>
  );
}