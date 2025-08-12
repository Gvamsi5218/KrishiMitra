import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Bot, User, Loader, Sparkles, Brain, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'नमस्ते! मैं आपका AI कृषि सलाहकार हूं। आप मुझसे फसल, मौसम, कीट, बीमारी, या खेती से जुड़ा कोई भी सवाल पूछ सकते हैं। • Hello! I am your AI Agricultural Advisor. You can ask me anything about crops, weather, pests, diseases, or farming.',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = {
    'crop': [
      'धान की खेती के लिए अभी सबसे अच्छा समय है। मिट्टी में नमी 70% होनी चाहिए। • This is the best time for rice cultivation. Soil moisture should be 70%.',
      'गेहूं की बुआई नवंबर में करें। बीज दर 100-120 किग्रा प्रति हेक्टेयर रखें। • Sow wheat in November. Keep seed rate 100-120 kg per hectare.',
      'कपास की फसल के लिए काली मिट्टी सबसे अच्छी होती है। • Black soil is best for cotton crop.'
    ],
    'weather': [
      'आज बारिश की संभावना है। फसल को ढकने की तैयारी करें। • There is a chance of rain today. Prepare to cover crops.',
      'अगले 3 दिन धूप रहेगी। सिंचाई की व्यवस्था करें। • It will be sunny for the next 3 days. Arrange for irrigation.',
      'तापमान 35°C से ऊपर जाने की संभावना है। पानी की मात्रा बढ़ाएं। • Temperature may go above 35°C. Increase water quantity.'
    ],
    'pest': [
      'पत्तियों पर सफेद धब्बे दिख रहे हैं तो यह पाउडरी मिल्ड्यू हो सकता है। नीम का तेल छिड़कें। • White spots on leaves could be powdery mildew. Spray neem oil.',
      'तना छेदक कीट के लिए फेरोमोन ट्रैप का उपयोग करें। • Use pheromone traps for stem borer pest.',
      'जैविक कीटनाशक का उपयोग करें। रासायनिक दवा से बचें। • Use organic pesticides. Avoid chemical medicines.'
    ],
    'soil': [
      'मिट्टी की जांच कराएं। pH 6.5-7.5 के बीच होना चाहिए। • Get soil tested. pH should be between 6.5-7.5.',
      'जैविक खाद का उपयोग करें। गोबर की खाद सबसे अच्छी है। • Use organic fertilizer. Cow dung manure is the best.',
      'मिट्टी में नाइट्रोजन की कमी है। यूरिया का छिड़काव करें। • Soil lacks nitrogen. Spray urea.'
    ],
    'default': [
      'यह एक दिलचस्प सवाल है। मुझे और जानकारी चाहिए। • This is an interesting question. I need more information.',
      'कृपया अपना सवाल और स्पष्ट करें। • Please clarify your question more.',
      'मैं आपकी मदद करने की कोशिश कर रहा हूं। • I am trying to help you.'
    ]
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('crop') || lowerMessage.includes('फसल') || lowerMessage.includes('धान') || lowerMessage.includes('गेहूं')) {
      return aiResponses.crop[Math.floor(Math.random() * aiResponses.crop.length)];
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम') || lowerMessage.includes('बारिश')) {
      return aiResponses.weather[Math.floor(Math.random() * aiResponses.weather.length)];
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('कीट') || lowerMessage.includes('बीमारी')) {
      return aiResponses.pest[Math.floor(Math.random() * aiResponses.pest.length)];
    } else if (lowerMessage.includes('soil') || lowerMessage.includes('मिट्टी') || lowerMessage.includes('खाद')) {
      return aiResponses.soil[Math.floor(Math.random() * aiResponses.soil.length)];
    } else {
      return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };

      recognition.start();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">🤖 AI कृषि सलाहकार • AI Agricultural Advisor</h2>
                <p className="text-sm text-green-100">आपका व्यक्तिगत खेती सलाहकार • Your Personal Farming Consultant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-100' 
                      : 'bg-gradient-to-br from-green-100 to-blue-100'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Bot className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-br from-gray-50 to-green-50 text-gray-800 border border-green-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('hi-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-4 border border-green-100">
                    <div className="flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin text-green-600" />
                      <span className="text-sm text-gray-600">AI सोच रहा है... • AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="अपना सवाल यहां लिखें... • Type your question here..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">भेजें • Send</span>
              </motion.button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                '🌾 फसल की सिफारिश • Crop Recommendation',
                '🌤️ मौसम की जानकारी • Weather Info',
                '🐛 कीट की समस्या • Pest Problem',
                '🌱 मिट्टी की जांच • Soil Test'
              ].map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInputMessage(action.split(' • ')[1] || action)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:border-green-300 transition-colors"
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}