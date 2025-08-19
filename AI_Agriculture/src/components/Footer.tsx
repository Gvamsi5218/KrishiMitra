import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Youtube, 
  Instagram,
  ExternalLink,
  Award,
  Shield,
  Users,
  Leaf,
  Globe,
  Clock,
  HeadphonesIcon
} from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'PM-KISAN योजना • PM-KISAN Scheme', url: '#', icon: Award },
    { name: 'फसल बीमा • Crop Insurance', url: '#', icon: Shield },
    { name: 'मिट्टी स्वास्थ्य कार्ड • Soil Health Card', url: '#', icon: Leaf },
    { name: 'कृषि मार्केट • Agriculture Market', url: '#', icon: Users },
    { name: 'मौसम पूर्वानुमान • Weather Forecast', url: '#', icon: Globe },
    { name: 'कृषि सलाह • Agriculture Advisory', url: '#', icon: HeadphonesIcon }
  ];

  const governmentLinks = [
    { name: 'कृषि मंत्रालय • Ministry of Agriculture', url: 'https://agricoop.gov.in' },
    { name: 'भारत सरकार • Government of India', url: 'https://india.gov.in' },
    { name: 'ICAR - भारतीय कृषि अनुसंधान परिषद', url: 'https://icar.org.in' },
    { name: 'कृषि विपणन • Agricultural Marketing', url: 'https://agmarknet.gov.in' },
    { name: 'राष्ट्रीय नमूना सर्वेक्षण • National Sample Survey', url: 'https://nsso.gov.in' }
  ];

  const supportChannels = [
    { 
      name: '24/7 हेल्पलाइन • Helpline', 
      value: '1800-180-1551', 
      icon: Phone,
      description: 'निःशुल्क कॉल • Toll Free'
    },
    { 
      name: 'ईमेल सहायता • Email Support', 
      value: 'support@krishimitra.gov.in', 
      icon: Mail,
      description: '24 घंटे में जवाब • Reply within 24 hours'
    },
    { 
      name: 'व्हाट्सऐप • WhatsApp', 
      value: '+91-9876543210', 
      icon: Phone,
      description: 'त्वरित सहायता • Quick Help'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Organization Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">🌾 KrishiMitra</h3>
                <p className="text-sm text-green-200">भारत सरकार • Government of India</p>
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              कृषि मंत्रालय, भारत सरकार की एक पहल। किसानों के लिए AI-आधारित कृषि सलाहकार सेवा।
              <br />
              <em>An initiative by Ministry of Agriculture, Government of India. AI-powered agricultural advisory service for farmers.</em>
            </p>
            <div className="flex items-center gap-2 text-sm text-green-200">
              <Award className="w-4 h-4" />
              <span>ISO 27001 प्रमाणित • Certified</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              त्वरित लिंक • Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-2 text-green-100 hover:text-white transition-all duration-300 text-sm group"
                  >
                    <Icon className="w-4 h-4 group-hover:text-yellow-400" />
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Government Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              सरकारी लिंक • Government Links
            </h4>
            <div className="space-y-2">
              {governmentLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-2 text-green-100 hover:text-white transition-all duration-300 text-sm group"
                >
                  <ExternalLink className="w-3 h-3 group-hover:text-yellow-400" />
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <HeadphonesIcon className="w-5 h-5" />
              सहायता • Support
            </h4>
            <div className="space-y-3">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white bg-opacity-10 rounded-lg p-3 hover:bg-opacity-20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium text-sm">{channel.name}</span>
                    </div>
                    <p className="text-white font-bold text-sm">{channel.value}</p>
                    <p className="text-green-200 text-xs">{channel.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Social Media & Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-green-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Social Media */}
            <div>
              <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                सोशल मीडिया • Social Media
              </h5>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/krishimitra' },
                  { icon: Twitter, name: 'Twitter', url: 'https://twitter.com/krishimitra' },
                  { icon: Youtube, name: 'YouTube', url: 'https://youtube.com/krishimitra' },
                  { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/krishimitra' }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Office Address */}
            <div>
              <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                कार्यालय पता • Office Address
              </h5>
              <div className="text-green-100 text-sm space-y-1">
                <p>कृषि भवन, डॉ. राजेंद्र प्रसाद रोड</p>
                <p>Agriculture Bhawan, Dr. Rajendra Prasad Road</p>
                <p>नई दिल्ली - 110001 • New Delhi - 110001</p>
                <p>भारत • India</p>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                कार्य समय • Working Hours
              </h5>
              <div className="text-green-100 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>सोमवार - शुक्रवार • Mon - Fri:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>शनिवार • Saturday:</span>
                  <span>9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>रविवार • Sunday:</span>
                  <span>बंद • Closed</span>
                </div>
                <div className="mt-2 p-2 bg-green-700 rounded text-center">
                  <span className="text-yellow-400 font-bold">24/7 हेल्पलाइन उपलब्ध • Helpline Available</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-950 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-green-200 text-sm">
                © 2024 KrishiMitra - कृषि मंत्रालय, भारत सरकार • Ministry of Agriculture, Government of India
              </p>
              <p className="text-green-300 text-xs mt-1">
                सभी अधिकार सुरक्षित • All Rights Reserved | Version 2.0.1
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                गोपनीयता नीति • Privacy Policy
              </a>
              <span className="text-green-400">|</span>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                नियम व शर्तें • Terms & Conditions
              </a>
              <span className="text-green-400">|</span>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                सुरक्षा • Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}