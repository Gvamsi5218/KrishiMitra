import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Target, Zap, Eye } from 'lucide-react';

export default function InteractiveDashboard() {
  const [activeMetric, setActiveMetric] = useState('yield');
  const [realTimeData, setRealTimeData] = useState({
    temperature: 28,
    humidity: 65,
    soilMoisture: 45,
    cropHealth: 87,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 3)),
        cropHealth: Math.max(60, Math.min(100, prev.cropHealth + (Math.random() - 0.5) * 2)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const yieldData = [
    { month: 'Jan', predicted: 4.2, actual: 4.0, target: 4.5 },
    { month: 'Feb', predicted: 4.5, actual: 4.3, target: 4.5 },
    { month: 'Mar', predicted: 4.8, actual: 4.6, target: 4.5 },
    { month: 'Apr', predicted: 5.1, actual: 4.9, target: 4.5 },
    { month: 'May', predicted: 5.3, actual: 5.1, target: 4.5 },
    { month: 'Jun', predicted: 5.5, actual: null, target: 4.5 },
  ];

  const cropDistribution = [
    { name: 'धान • Rice', value: 40, color: '#10b981' },
    { name: 'गेहूं • Wheat', value: 30, color: '#f59e0b' },
    { name: 'कपास • Cotton', value: 20, color: '#3b82f6' },
    { name: 'अन्य • Others', value: 10, color: '#8b5cf6' },
  ];

  const performanceMetrics = [
    {
      id: 'yield',
      title: 'उत्पादन • Yield',
      value: '5.2',
      unit: 'टन/एकड़ • tons/acre',
      change: '+12%',
      trend: 'up',
      color: 'from-green-500 to-emerald-500',
      icon: TrendingUp,
    },
    {
      id: 'efficiency',
      title: 'दक्षता • Efficiency',
      value: '89',
      unit: '%',
      change: '+5%',
      trend: 'up',
      color: 'from-blue-500 to-cyan-500',
      icon: Target,
    },
    {
      id: 'cost',
      title: 'लागत • Cost',
      value: '₹45,000',
      unit: 'प्रति एकड़ • per acre',
      change: '-8%',
      trend: 'down',
      color: 'from-purple-500 to-pink-500',
      icon: TrendingDown,
    },
    {
      id: 'health',
      title: 'फसल स्वास्थ्य • Crop Health',
      value: Math.round(realTimeData.cropHealth).toString(),
      unit: '%',
      change: '+3%',
      trend: 'up',
      color: 'from-orange-500 to-red-500',
      icon: Activity,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-6 border border-indigo-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">📊 इंटरैक्टिव डैशबोर्ड • Interactive Dashboard</h3>
            <p className="text-sm text-gray-600">वास्तविक समय डेटा विश्लेषण • Real-time Data Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Live Data</span>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => setActiveMetric(metric.id)}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                activeMetric === metric.id
                  ? 'border-indigo-300 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                <p className="text-xs text-gray-600">{metric.unit}</p>
                <p className="text-sm font-medium text-gray-700 mt-1">{metric.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Prediction Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-800">उत्पादन पूर्वानुमान • Yield Prediction</h4>
            <Eye className="w-5 h-5 text-indigo-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                `${value} tons/acre`,
                name === 'predicted' ? 'पूर्वानुमान • Predicted' :
                name === 'actual' ? 'वास्तविक • Actual' : 'लक्ष्य • Target'
              ]} />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="predicted"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10b981" 
                strokeWidth={3}
                name="actual"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="target"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Crop Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-800">फसल वितरण • Crop Distribution</h4>
            <Zap className="w-5 h-5 text-indigo-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={cropDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {cropDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'हिस्सा • Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {cropDistribution.map((crop, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: crop.color }}
                />
                <span className="text-xs text-gray-700">{crop.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Real-time Sensors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-xl border border-green-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">🌡️</div>
          <div>
            <p className="font-bold text-gray-800">वास्तविक समय सेंसर डेटा • Real-time Sensor Data</p>
            <p className="text-sm text-gray-600">खेत से सीधे डेटा • Direct from field sensors</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-red-600">{Math.round(realTimeData.temperature)}°C</p>
            <p className="text-sm text-gray-600">तापमान • Temperature</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{Math.round(realTimeData.humidity)}%</p>
            <p className="text-sm text-gray-600">नमी • Humidity</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-green-600">{Math.round(realTimeData.soilMoisture)}%</p>
            <p className="text-sm text-gray-600">मिट्टी नमी • Soil Moisture</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{Math.round(realTimeData.cropHealth)}%</p>
            <p className="text-sm text-gray-600">फसल स्वास्थ्य • Crop Health</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}