import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  X, 
  Send, 
  User, 
  Bot,
  HeadphonesIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

interface SupportTicket {
  id: string;
  message: string;
  response: string;
  timestamp: Date;
  status: 'pending' | 'resolved';
  type: 'user' | 'support';
}

export default function CustomerSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      message: 'मेरी फसल में कीट लग गए हैं, क्या करूं? • My crops have pests, what should I do?',
      response: 'नीम का तेल छिड़कें और जैविक कीटनाशक का उपयोग करें। • Spray neem oil and use organic pesticides.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'resolved',
      type: 'user'
    }
  ]);

  const supportOptions = [
    {
      id: 'chat',
      name: 'लाइव चैट • Live Chat',
      icon: MessageCircle,
      description: 'तत्काल सहायता • Instant Help',
      available: true
    },
    {
      id: 'phone',
      name: 'फोन सहायता • Phone Support',
      icon: Phone,
      description: '1800-180-1551 (निःशुल्क • Toll Free)',
      available: true
    },
    {
      id: 'email',
      name: 'ईमेल सहायता • Email Support',
      icon: Mail,
      description: 'support@krishimitra.gov.in',
      available: true
    }
  ];

  const quickHelp = [
    '🌾 फसल की समस्या • Crop Problems',
    '🌤️ मौसम की जानकारी • Weather Information',
    '💰 सरकारी योजनाएं • Government Schemes',
    '📈 बाजार भाव • Market Prices',
    '🐛 कीट नियंत्रण • Pest Control',
    '💧 सिंचाई सलाह • Irrigation Advice'
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      message,
      response: getAutoResponse(message),
      timestamp: new Date(),
      status: 'resolved',
      type: 'user'
    };

    setTickets(prev => [newTicket, ...prev]);
    setMessage('');
  };

  const getAutoResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('कीट') || lowerQuery.includes('pest')) {
      return 'नीम का तेल और जैविक कीटनाशक का उपयोग करें। विशेषज्ञ से सलाह के लिए 1800-180-1551 पर कॉल करें। • Use neem oil and organic pesticides. Call 1800-180-1551 for expert advice.';
    } else if (lowerQuery.includes('मौसम') || lowerQuery.includes('weather')) {
      return 'मौसम की जानकारी के लिए हमारा वेदर सेक्शन देखें या IMD की वेबसाइट पर जाएं। • Check our weather section or visit IMD website for weather information.';
    } else if (lowerQuery.includes('योजना') || lowerQuery.includes('scheme')) {
      return 'PM-KISAN, फसल बीमा और अन्य योजनाओं की जानकारी के लिए हमारा स्कीम सेक्शन देखें। • Check our schemes section for PM-KISAN, crop insurance and other schemes.';
    } else {
      return 'आपका प्रश्न प्राप्त हुआ है। हमारे विशेषज्ञ जल्द ही आपसे संपर्क करेंगे। तत्काल सहायता के लिए 1800-180-1551 पर कॉल करें। • Your query is received. Our experts will contact you soon. For immediate help, call 1800-180-1551.';
    }
  };

  return (
    <>
      {/* Support Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <HeadphonesIcon className="w-8 h-8" />
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>

      {/* Support Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <HeadphonesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">🎧 ग्राहक सहायता • Customer Support</h2>
                    <p className="text-sm text-blue-100">24/7 उपलब्ध • Available 24/7</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Support Options */}
              <div className="flex border-b border-gray-200">
                {supportOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setActiveTab(option.id)}
                      className={`flex-1 flex items-center gap-3 p-4 transition-all duration-300 ${
                        activeTab === option.id
                          ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{option.name}</div>
                        <div className="text-xs opacity-70">{option.description}</div>
                      </div>
                      {option.available && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex-1 flex">
                {/* Chat Section */}
                {activeTab === 'chat' && (
                  <div className="flex-1 flex flex-col">
                    {/* Quick Help */}
                    <div className="p-4 bg-gray-50 border-b">
                      <h3 className="font-bold text-gray-800 mb-3">त्वरित सहायता • Quick Help</h3>
                      <div className="flex flex-wrap gap-2">
                        {quickHelp.map((help, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setMessage(help)}
                            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            {help}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {tickets.map((ticket) => (
                        <div key={ticket.id} className="space-y-3">
                          {/* User Message */}
                          <div className="flex justify-end">
                            <div className="flex items-start gap-3 max-w-[80%]">
                              <div className="bg-blue-600 text-white rounded-2xl p-4">
                                <p className="text-sm">{ticket.message}</p>
                                <p className="text-xs text-blue-100 mt-2">
                                  {ticket.timestamp.toLocaleTimeString('hi-IN')}
                                </p>
                              </div>
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                            </div>
                          </div>

                          {/* Support Response */}
                          <div className="flex justify-start">
                            <div className="flex items-start gap-3 max-w-[80%]">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="bg-gray-100 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-green-700">KrishiMitra Support</span>
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                </div>
                                <p className="text-sm text-gray-700">{ticket.response}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {ticket.timestamp.toLocaleTimeString('hi-IN')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="अपना प्रश्न यहां लिखें... • Type your question here..."
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50"
                        >
                          <Send className="w-4 h-4" />
                          भेजें • Send
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone Support */}
                {activeTab === 'phone' && (
                  <div className="flex-1 p-6">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Phone className="w-12 h-12 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          📞 फोन सहायता • Phone Support
                        </h3>
                        <p className="text-gray-600">
                          हमारे विशेषज्ञों से सीधे बात करें • Talk directly to our experts
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <Phone className="w-6 h-6 text-green-600" />
                            <span className="text-2xl font-bold text-green-700">1800-180-1551</span>
                          </div>
                          <p className="text-green-700 font-medium">निःशुल्क हेल्पलाइन • Toll Free Helpline</p>
                          <p className="text-sm text-green-600 mt-2">24/7 उपलब्ध • Available 24/7</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-5 h-5 text-blue-600" />
                              <span className="font-medium text-blue-700">कार्य समय • Working Hours</span>
                            </div>
                            <p className="text-sm text-blue-600">सोमवार - शुक्रवार: 9 AM - 6 PM</p>
                            <p className="text-sm text-blue-600">शनिवार: 9 AM - 1 PM</p>
                          </div>

                          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-5 h-5 text-purple-600" />
                              <span className="font-medium text-purple-700">आपातकालीन • Emergency</span>
                            </div>
                            <p className="text-sm text-purple-600">24/7 आपातकालीन सहायता</p>
                            <p className="text-sm text-purple-600">Emergency Support Available</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Support */}
                {activeTab === 'email' && (
                  <div className="flex-1 p-6">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Mail className="w-12 h-12 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          📧 ईमेल सहायता • Email Support
                        </h3>
                        <p className="text-gray-600">
                          विस्तृत सहायता के लिए ईमेल करें • Email us for detailed support
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-blue-600" />
                            <span className="text-lg font-bold text-blue-700">support@krishimitra.gov.in</span>
                          </div>
                          <p className="text-blue-700 font-medium">मुख्य सहायता ईमेल • Main Support Email</p>
                          <p className="text-sm text-blue-600 mt-2">24 घंटे में जवाब • Reply within 24 hours</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <h4 className="font-medium text-green-700 mb-2">तकनीकी सहायता • Technical Support</h4>
                            <p className="text-sm text-green-600">tech@krishimitra.gov.in</p>
                          </div>

                          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <h4 className="font-medium text-orange-700 mb-2">फीडबैक • Feedback</h4>
                            <p className="text-sm text-orange-600">feedback@krishimitra.gov.in</p>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            <span className="font-medium text-yellow-700">महत्वपूर्ण • Important</span>
                          </div>
                          <p className="text-sm text-yellow-600">
                            कृपया अपना पंजीकृत मोबाइल नंबर और किसान ID शामिल करें।
                            <br />
                            Please include your registered mobile number and farmer ID.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}