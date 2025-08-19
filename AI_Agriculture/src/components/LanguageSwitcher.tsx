import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'hi', name: 'हिंदी', native: 'Hindi', flag: '🇮🇳' },
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'ta', name: 'தமிழ்', native: 'Tamil', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', native: 'Telugu', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', native: 'Bengali', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', native: 'Marathi', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', native: 'Gujarati', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', native: 'Kannada', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', native: 'Malayalam', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', native: 'Odia', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', native: 'Punjabi', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া', native: 'Assamese', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', native: 'Urdu', flag: '🇮🇳' },
    { code: 'ne', name: 'नेपाली', native: 'Nepali', flag: '🇳🇵' },
    { code: 'si', name: 'සිංහල', native: 'Sinhala', flag: '🇱🇰' },
    { code: 'my', name: 'မြန်မာ', native: 'Myanmar', flag: '🇲🇲' },
    { code: 'dz', name: 'རྫོང་ཁ', native: 'Dzongkha', flag: '🇧🇹' },
    { code: 'kok', name: 'कोंकणी', native: 'Konkani', flag: '🇮🇳' },
    { code: 'mni', name: 'মৈতৈলোন্', native: 'Manipuri', flag: '🇮🇳' },
    { code: 'sd', name: 'سنڌي', native: 'Sindhi', flag: '🇮🇳' },
    { code: 'ks', name: 'کٲشُر', native: 'Kashmiri', flag: '🇮🇳' },
    { code: 'doi', name: 'डोगरी', native: 'Dogri', flag: '🇮🇳' },
    { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ', native: 'Santali', flag: '🇮🇳' },
    { code: 'mai', name: 'मैथिली', native: 'Maithili', flag: '🇮🇳' },
    { code: 'bho', name: 'भोजपुरी', native: 'Bhojpuri', flag: '🇮🇳' },
    { code: 'brx', name: 'बर\'', native: 'Bodo', flag: '🇮🇳' }
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-green-100 hover:border-green-300"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <Globe className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {currentLanguage.native}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 z-50"
            >
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 px-3 py-2 border-b border-gray-100">
                  Choose Your Language / भाषा चुनें
                </div>
                <div className="grid grid-cols-1 gap-1 mt-2">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      whileHover={{ backgroundColor: '#f0fdf4' }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        i18n.language === lang.code 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'text-gray-700 hover:bg-green-50'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{lang.name}</div>
                        <div className="text-xs text-gray-500">{lang.native}</div>
                      </div>
                      {i18n.language === lang.code && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}