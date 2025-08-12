import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Cloud, Bug, TrendingUp, X, Bell, Zap } from 'lucide-react';

interface Alert {
  id: string;
  type: 'weather' | 'pest' | 'market' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
}

interface RealTimeAlertsProps {
  alerts: Alert[];
}

export default function RealTimeAlerts({ alerts }: RealTimeAlertsProps) {
  const [currentAlerts, setCurrentAlerts] = useState<Alert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [dangerConditions, setDangerConditions] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 8,
    rainfall: 0,
    pestRisk: 'low',
    marketVolatility: 'stable'
  });

  useEffect(() => {
    // Initialize with provided alerts only if they are actual dangers
    const dangerousAlerts = alerts.filter(alert => 
      !dismissedAlerts.has(alert.id) && 
      (alert.priority === 'high' || alert.type === 'urgent')
    );
    setCurrentAlerts(dangerousAlerts);

    // Monitor environmental conditions and generate alerts only when dangerous
    const interval = setInterval(() => {
      // Update environmental conditions (simulate sensor data)
      setDangerConditions(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3),
        rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.7) * 10),
        pestRisk: Math.random() > 0.95 ? 'high' : Math.random() > 0.85 ? 'medium' : 'low',
        marketVolatility: Math.random() > 0.9 ? 'high' : Math.random() > 0.7 ? 'medium' : 'stable'
      }));

      // Check for dangerous conditions and generate alerts only when needed
      const dangerousConditions = checkDangerousConditions(dangerConditions);
      
      if (dangerousConditions.length > 0) {
        dangerousConditions.forEach(condition => {
          const alertId = `${condition.type}-${Date.now()}`;
          if (!dismissedAlerts.has(alertId)) {
            const newAlert: Alert = {
              id: alertId,
              type: condition.type,
              title: condition.title,
              message: condition.message,
              timestamp: new Date(),
              priority: condition.priority,
              actionRequired: condition.actionRequired,
            };
            
            setCurrentAlerts(prev => {
              // Avoid duplicate alerts of the same type
              const existingTypes = prev.map(alert => alert.type);
              if (!existingTypes.includes(newAlert.type)) {
                return [newAlert, ...prev.slice(0, 4)];
              }
              return prev;
            });
          }
        });
      }
    }, 30000); // Check every 30 seconds instead of generating random alerts

    return () => clearInterval(interval);
  }, [alerts, dismissedAlerts, dangerConditions]);

  const checkDangerousConditions = (conditions: typeof dangerConditions) => {
    const dangers = [];

    // Temperature danger (above 40°C or below 5°C)
    if (conditions.temperature > 40) {
      dangers.push({
        type: 'weather' as const,
        title: '🌡️ अत्यधिक गर्मी की चेतावनी • Extreme Heat Warning',
        message: `तापमान ${Math.round(conditions.temperature)}°C तक पहुंच गया है। फसल को छाया दें और पानी बढ़ाएं। • Temperature reached ${Math.round(conditions.temperature)}°C. Provide shade and increase watering.`,
        priority: 'high' as const,
        actionRequired: true
      });
    } else if (conditions.temperature < 5) {
      dangers.push({
        type: 'weather' as const,
        title: '❄️ अत्यधिक ठंड की चेतावनी • Extreme Cold Warning',
        message: `तापमान ${Math.round(conditions.temperature)}°C तक गिर गया है। फसल को ढकें और गर्म रखें। • Temperature dropped to ${Math.round(conditions.temperature)}°C. Cover crops and keep warm.`,
        priority: 'high' as const,
        actionRequired: true
      });
    }

    // Heavy rainfall danger (above 50mm)
    if (conditions.rainfall > 50) {
      dangers.push({
        type: 'weather' as const,
        title: '🌧️ भारी बारिश की चेतावनी • Heavy Rainfall Warning',
        message: `${Math.round(conditions.rainfall)}mm बारिश हो रही है। जल निकासी की व्यवस्था करें और फसल को बचाएं। • ${Math.round(conditions.rainfall)}mm rainfall occurring. Arrange drainage and protect crops.`,
        priority: 'high' as const,
        actionRequired: true
      });
    }

    // High wind speed danger (above 25 km/h)
    if (conditions.windSpeed > 25) {
      dangers.push({
        type: 'weather' as const,
        title: '💨 तेज़ हवा की चेतावनी • Strong Wind Warning',
        message: `${Math.round(conditions.windSpeed)} km/h की रफ्तार से हवा चल रही है। पौधों को सहारा दें। • Wind speed ${Math.round(conditions.windSpeed)} km/h. Provide support to plants.`,
        priority: 'medium' as const,
        actionRequired: true
      });
    }

    // High pest risk
    if (conditions.pestRisk === 'high') {
      dangers.push({
        type: 'pest' as const,
        title: '🐛 कीट प्रकोप की चेतावनी • Pest Outbreak Alert',
        message: 'आपके क्षेत्र में कीट प्रकोप का खतरा बढ़ गया है। तुरंत निरीक्षण करें और उपचार शुरू करें। • Pest outbreak risk increased in your area. Inspect immediately and start treatment.',
        priority: 'high' as const,
        actionRequired: true
      });
    }

    // High market volatility
    if (conditions.marketVolatility === 'high') {
      dangers.push({
        type: 'market' as const,
        title: '📈 बाजार में अस्थिरता • Market Volatility Alert',
        message: 'बाजार में तेज़ी से बदलाव हो रहा है। कीमतों पर नज़र रखें और बिक्री का समय तय करें। • Rapid market changes occurring. Monitor prices and decide selling time.',
        priority: 'medium' as const,
        actionRequired: false
      });
    }

    return dangers;
  };

  const getRandomAlertTitle = () => {
    const titles = [
      '🌧️ भारी बारिश की चेतावनी • Heavy Rain Warning',
      '🐛 कीट प्रकोप की संभावना • Pest Outbreak Alert',
      '📈 गेहूं की कीमत में वृद्धि • Wheat Price Surge',
      '🌡️ अत्यधिक गर्मी की चेतावनी • Extreme Heat Alert',
      '💧 सिंचाई की तत्काल आवश्यकता • Immediate Irrigation Needed',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomAlertMessage = () => {
    const messages = [
      'अगले 24 घंटों में भारी बारिश की संभावना है। फसल को सुरक्षित रखें।',
      'आपके क्षेत्र में तना छेदक कीट का प्रकोप देखा गया है। तुरंत उपचार करें।',
      'गेहूं की कीमत 12% बढ़ गई है। बेचने का अच्छा समय है।',
      'तापमान 40°C तक पहुंच सकता है। पानी की व्यवस्था करें।',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather': return Cloud;
      case 'pest': return Bug;
      case 'market': return TrendingUp;
      case 'urgent': return AlertTriangle;
      default: return Bell;
    }
  };

  const getAlertColor = (type: string, priority: string) => {
    if (priority === 'high') {
      return 'from-red-500 to-red-600 border-red-200 bg-red-50';
    } else if (priority === 'medium') {
      return 'from-yellow-500 to-orange-500 border-yellow-200 bg-yellow-50';
    } else {
      return 'from-blue-500 to-blue-600 border-blue-200 bg-blue-50';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'उच्च प्राथमिकता • High Priority';
      case 'medium': return 'मध्यम प्राथमिकता • Medium Priority';
      case 'low': return 'कम प्राथमिकता • Low Priority';
      default: return 'सामान्य • Normal';
    }
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    setCurrentAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  if (currentAlerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
          <Bell className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">🚨 तत्काल अलर्ट • Real-time Alerts</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-red-600 font-medium">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {currentAlerts.slice(0, 3).map((alert, index) => {
            const Icon = getAlertIcon(alert.type);
            const colorClasses = getAlertColor(alert.type, alert.priority);
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl border-2 ${colorClasses} shadow-lg`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800 text-sm">{alert.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {getPriorityText(alert.priority)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-2">
                          {alert.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {alert.timestamp.toLocaleTimeString('hi-IN', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          {alert.actionRequired && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-1 bg-white bg-opacity-80 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium hover:bg-opacity-100 transition-all duration-300"
                            >
                              <Zap className="w-3 h-3" />
                              कार्य करें • Act Now
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="p-1 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors ml-2"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Animated border for high priority alerts */}
                {alert.priority === 'high' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {currentAlerts.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-center"
        >
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            +{currentAlerts.length - 3} और अलर्ट देखें • View {currentAlerts.length - 3} more alerts
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}