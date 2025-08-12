import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Globe, ExternalLink } from 'lucide-react';

export default function GovernmentBanner() {
  const governmentLogos = [
    {
      name: 'भारत सरकार • Government of India',
      logo: '🇮🇳',
      url: 'https://india.gov.in'
    },
    {
      name: 'कृषि मंत्रालय • Ministry of Agriculture',
      logo: '🌾',
      url: 'https://agricoop.gov.in'
    },
    {
      name: 'डिजिटल इंडिया • Digital India',
      logo: '💻',
      url: 'https://digitalindia.gov.in'
    }
  ];

  const certifications = [
    { name: 'ISO 27001', icon: Shield },
    { name: 'Digital India', icon: Globe },
    { name: 'Make in India', icon: Award }
  ];

  return (
    <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 border-b-4 border-blue-600">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Government Logos */}
          <div className="flex items-center gap-6">
            {governmentLogos.map((gov, index) => (
              <motion.a
                key={index}
                href={gov.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-gray-800 hover:text-blue-700 transition-colors"
              >
                <span className="text-2xl">{gov.logo}</span>
                <span className="text-sm font-medium hidden lg:block">{gov.name}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </motion.a>
            ))}
          </div>

          {/* Main Title */}
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              🌾 KrishiMitra - AI कृषि सलाहकार
            </h1>
            <p className="text-sm text-gray-600">
              भारत सरकार की डिजिटल कृषि पहल • Government of India's Digital Agriculture Initiative
            </p>
          </div>

          {/* Certifications */}
          <div className="flex items-center gap-4">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 bg-white bg-opacity-80 px-3 py-1 rounded-full border border-gray-300"
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">{cert.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}