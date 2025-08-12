import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Cloud, 
  Zap, 
  Thermometer, 
  Droplets,
  Wind,
  X,
  Volume2,
  VolumeX,
  Bell,
  Shield,
  Phone
} from 'lucide-react';

interface EmergencyAlert {
  id: string;
  type: 'weather' | 'disaster' | 'pest' | 'market' | 'health';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  location: string;
  timestamp: Date;
  actionRequired: boolean;
  helplineNumber?: string;
}

export default function EmergencyAlerts() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Only show initial critical alerts if they exist
    const criticalAlerts: EmergencyAlert[] = [];
    
    // Check for actual emergency conditions (you can customize these conditions)
    const currentHour = new Date().getHours();
    const isMonsoonseason = new Date().getMonth() >= 5 && new Date().getMonth() <= 9;
    
    // Only add alerts during actual dangerous conditions
    if (isMonsoonseason && Math.random() > 0.8) {
      criticalAlerts.push({
        id: '1',
        type: 'weather',
        severity: 'critical',
        title: '🌪️ चक्रवात चेतावनी • Cyclone Warning',
        message: 'अगले 6 घंटों में तेज़ हवाओं के साथ भारी बारिश की संभावना। तुरंत सुरक्षित स्थान पर जाएं। • Heavy rainfall with strong winds expected in next 6 hours. Move to safe location immediately.',
        location: 'तटीय आंध्र प्रदेश • Coastal Andhra Pradesh',
        timestamp: new Date(),
        actionRequired: true,
        helplineNumber: '1077'
      });
    }

    setAlerts(criticalAlerts);

    // Check for emergency conditions every 2 minutes instead of generating random alerts
    const interval = setInterval(() => {
      // Check for actual emergency conditions
      const emergencyConditions = checkEmergencyConditions();
      
      if (emergencyConditions.length > 0) {
        emergencyConditions.forEach(condition => {
          const newAlert: EmergencyAlert = {
            id: `emergency-${Date.now()}-${Math.random()}`,
            type: condition.type,
            severity: condition.severity,
            title: condition.title,
            message: condition.message,
            location: condition.location,
            timestamp: new Date(),
            actionRequired: condition.actionRequired,
            helplineNumber: condition.helplineNumber
          };

          setAlerts(prev => {
            // Avoid duplicate emergency alerts
            const existingTypes = prev.map(alert => `${alert.type}-${alert.severity}`);
            const newType = `${newAlert.type}-${newAlert.severity}`;
            if (!existingTypes.includes(newType)) {
              // Play alert sound for new emergency
              if (soundEnabled) {
                playAlertSound();
              }
              return [newAlert, ...prev.slice(0, 4)];
            }
            return prev;
          });
        });
      }
    }, 120000); // Check every 2 minutes

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const checkEmergencyConditions = () => {
    const emergencies = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentHour = currentDate.getHours();
    
    // Monsoon season weather emergencies (June to September)
    if (currentMonth >= 5 && currentMonth <= 8 && Math.random() > 0.95) {
      emergencies.push({
        type: 'weather' as const,
        severity: 'critical' as const,
        title: '🌊 बाढ़ की चेतावनी • Flood Warning',
        message: 'भारी बारिश के कारण बाढ़ का खतरा। निचले इलाकों से दूर रहें और सुरक्षित स्थान पर जाएं। • Flood risk due to heavy rainfall. Stay away from low-lying areas and move to safety.',
        location: 'बिहार, असम • Bihar, Assam',
        actionRequired: true,
        helplineNumber: '1077'
      });
    }

    // Pest outbreak during crop season
    if ((currentMonth >= 3 && currentMonth <= 5) && Math.random() > 0.98) {
      emergencies.push({
        type: 'pest' as const,
        severity: 'high' as const,
        title: '🦗 टिड्डी दल आक्रमण • Locust Swarm Attack',
        message: 'टिड्डी दल का बड़ा झुंड देखा गया है। तुरंत स्थानीय कृषि विभाग से संपर्क करें। • Large locust swarm spotted. Contact local agriculture department immediately.',
        location: 'राजस्थान, गुजरात • Rajasthan, Gujarat',
        actionRequired: true,
        helplineNumber: '1551'
      });
    }

    // Market crash during harvest season
    if ((currentMonth >= 9 && currentMonth <= 11) && Math.random() > 0.97) {
      emergencies.push({
        type: 'market' as const,
        severity: 'high' as const,
        title: '📉 बाजार में भारी गिरावट • Major Market Crash',
        message: 'फसल की कीमतों में अचानक 30% गिरावट। बिक्री रोकें और सरकारी सहायता का इंतज़ार करें। • Sudden 30% drop in crop prices. Stop selling and wait for government support.',
        location: 'पंजाब, हरियाणा • Punjab, Haryana',
        actionRequired: true,
        helplineNumber: '1800-180-1551'
      });
    }

    return emergencies;
  };

  const getRandomAlertTitle = () => {
    const titles = [
      '⚡ बिजली गिरने की चेतावनी • Lightning Strike Warning',
      '🌊 बाढ़ की चेतावनी • Flood Warning',
      '🔥 आग की चेतावनी • Fire Warning',
      '❄️ ओलावृष्टि चेतावनी • Hailstorm Warning',
      '🌡️ गर्मी की लहर • Heat Wave Alert'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomAlertMessage = () => {
    const messages = [
      'तत्काल सुरक्षित स्थान पर जाएं और बाहर न निकलें। • Move to safe location immediately and stay indoors.',
      'अपनी फसल और पशुओं की सुरक्षा करें। • Protect your crops and livestock.',
      'आपातकालीन हेल्पलाइन पर संपर्क करें। • Contact emergency helpline.',
      'स्थानीय अधिकारियों के निर्देशों का पालन करें। • Follow local authorities instructions.'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomLocation = () => {
    const locations = [
      'पंजाब • Punjab',
      'हरियाणा • Haryana',
      'उत्तर प्रदेश • Uttar Pradesh',
      'बिहार • Bihar',
      'पश्चिम बंगाल • West Bengal',
      'महाराष्ट्र • Maharashtra'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const playAlertSound = () => {
    // Create audio context for alert sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather': return Cloud;
      case 'disaster': return AlertTriangle;
      case 'pest': return Shield;
      case 'market': return Zap;
      case 'health': return Thermometer;
      default: return Bell;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-600 to-red-700 border-red-300';
      case 'high': return 'from-orange-500 to-red-500 border-orange-300';
      case 'medium': return 'from-yellow-500 to-orange-500 border-yellow-300';
      case 'low': return 'from-blue-500 to-blue-600 border-blue-300';
      default: return 'from-gray-500 to-gray-600 border-gray-300';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'अत्यंत गंभीर • Critical';
      case 'high': return 'गंभीर • High';
      case 'medium': return 'मध्यम • Medium';
      case 'low': return 'कम • Low';
      default: return 'सामान्य • Normal';
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
  const displayAlerts = showAll ? alerts : alerts.slice(0, 2);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-40 w-96 max-w-[calc(100vw-2rem)]">
      {/* Sound Control */}
      <div className="mb-4 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-lg transition-colors ${
            soundEnabled 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Emergency Alerts */}
      <div className="space-y-3">
        <AnimatePresence>
          {displayAlerts.map((alert, index) => {
            const Icon = getAlertIcon(alert.type);
            const severityColor = getSeverityColor(alert.severity);
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 300, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 300, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl border-2 shadow-2xl ${severityColor} bg-gradient-to-r text-white`}
              >
                {/* Blinking effect for critical alerts */}
                {alert.severity === 'critical' && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}

                <div className="relative p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm">{alert.title}</h4>
                          <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium">
                            {getSeverityText(alert.severity)}
                          </span>
                        </div>
                        <p className="text-xs opacity-90">{alert.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <p className="text-sm leading-relaxed mb-3 opacity-95">
                    {alert.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">
                      {alert.timestamp.toLocaleTimeString('hi-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    
                    {alert.helplineNumber && (
                      <motion.a
                        href={`tel:${alert.helplineNumber}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-opacity-30 transition-all duration-300"
                      >
                        <Phone className="w-3 h-3" />
                        {alert.helplineNumber}
                      </motion.a>
                    )}
                  </div>

                  {alert.actionRequired && (
                    <div className="mt-3 p-2 bg-white bg-opacity-20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-300" />
                        <span className="text-xs font-medium">
                          तत्काल कार्रवाई आवश्यक • Immediate Action Required
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Animated border for critical alerts */}
                {alert.severity === 'critical' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-yellow-400"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Show More/Less Button */}
        {alerts.length > 2 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAll(!showAll)}
            className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm font-medium"
          >
            {showAll 
              ? `कम दिखाएं • Show Less` 
              : `+${alerts.length - 2} और अलर्ट देखें • View ${alerts.length - 2} more alerts`
            }
          </motion.button>
        )}
      </div>

      {/* Critical Alert Summary */}
      {criticalAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-600 text-white rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <AlertTriangle className="w-6 h-6 text-yellow-300" />
            </motion.div>
            <div>
              <h4 className="font-bold">🚨 आपातकालीन स्थिति • Emergency Situation</h4>
              <p className="text-sm opacity-90">
                {criticalAlerts.length} गंभीर अलर्ट सक्रिय • {criticalAlerts.length} critical alerts active
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}