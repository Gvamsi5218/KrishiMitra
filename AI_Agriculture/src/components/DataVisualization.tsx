import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { mockMarketTrends, mockYieldPredictions } from '../data/mockData';

export default function DataVisualization() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">Market Analytics & Predictions</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Market Price Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockMarketTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, '']} />
              <Line 
                type="monotone" 
                dataKey="rice" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Rice"
              />
              <Line 
                type="monotone" 
                dataKey="wheat" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Wheat"
              />
              <Line 
                type="monotone" 
                dataKey="cotton" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Cotton"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Yield Predictions</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockYieldPredictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'yield' ? `${value} tons/acre` : `${value}%`,
                name === 'yield' ? 'Expected Yield' : 'Probability'
              ]} />
              <Bar dataKey="yield" fill="#10b981" name="yield" />
              <Bar dataKey="probability" fill="#3b82f6" name="probability" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">AI Prediction Accuracy</p>
            <p className="text-sm text-gray-600">Based on 500+ similar farms</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">87%</p>
            <p className="text-sm text-gray-600">Accuracy Rate</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}