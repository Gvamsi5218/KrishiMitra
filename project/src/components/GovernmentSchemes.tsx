import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { GovernmentScheme } from '../types';
import { useTranslation } from 'react-i18next';

interface GovernmentSchemesProps {
  schemes: GovernmentScheme[];
}

export default function GovernmentSchemes({ schemes }: GovernmentSchemesProps) {
  const { t } = useTranslation();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'eligible': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'applied': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'not-eligible': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'bg-blue-100 text-blue-800';
      case 'applied': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'not-eligible': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{t('availableSchemes')}</h3>
        <Award className="w-6 h-6 text-yellow-500" />
      </div>

      <div className="space-y-4">
        {schemes.map((scheme, index) => (
          <motion.div
            key={scheme.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{scheme.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                {getStatusIcon(scheme.status)}
                <span className="capitalize">{scheme.status.replace('-', ' ')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Max Amount</p>
                <p className="font-bold text-green-700">₹{scheme.amount.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-gray-600">Deadline</p>
                </div>
                <p className="font-bold text-blue-700">{scheme.deadline}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Eligibility:</p>
              <div className="space-y-1">
                {scheme.eligibility.slice(0, 2).map((criterion, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <p className="text-xs text-gray-600">{criterion}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={scheme.status === 'not-eligible' || scheme.status === 'approved'}
              className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                scheme.status === 'eligible' 
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : scheme.status === 'applied'
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {scheme.status === 'eligible' ? t('apply') : 
               scheme.status === 'applied' ? 'Track Application' :
               scheme.status === 'approved' ? 'Approved ✓' : 'Not Eligible'}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}