import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoiceInterface } from '../hooks/useVoiceInterface';
import { useTranslation } from 'react-i18next';

interface VoiceInterfaceProps {
  onCommand?: (command: string) => void;
  language?: string;
}

export default function VoiceInterface({ onCommand, language = 'hi-IN' }: VoiceInterfaceProps) {
  const { t } = useTranslation();
  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    speak,
    processCommand
  } = useVoiceInterface();

  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (transcript && !isListening) {
      const command = processCommand(transcript);
      onCommand?.(transcript);
      setShowTranscript(true);
      
      // Hide transcript after 3 seconds
      setTimeout(() => setShowTranscript(false), 3000);
    }
  }, [transcript, isListening]);

  if (!isSupported) {
    return (
      <div className="text-center p-4 bg-orange-100 rounded-lg">
        <p className="text-orange-800">Voice interface not supported in this browser</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTranscript && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs border border-green-200"
          >
            <div className="text-sm text-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Volume2 className="w-4 h-4 text-green-600" />
                <span className="font-medium">You said:</span>
              </div>
              <p className="italic">"{transcript}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={isListening ? stopListening : () => startListening(language)}
        className={`relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-green-600 hover:bg-green-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isListening ? (
          <>
            <MicOff className="w-8 h-8 text-white" />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-red-300"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.3, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </>
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
        
        {isListening && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
              {t('listening')}
            </div>
          </div>
        )}
      </motion.button>
    </div>
  );
}