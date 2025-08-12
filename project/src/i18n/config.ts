import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      crops: "My Crops",
      weather: "Weather",
      finance: "Money Help",
      community: "Farmer Friends",
      market: "Market Prices",
      schemes: "Government Help",
      profile: "My Profile",
      
      // Dashboard
      welcome: "Welcome, Farmer",
      todaysWeather: "Today's Weather",
      cropPrices: "Market Prices",
      recommendations: "AI Suggestions",
      myFarm: "My Farm",
      
      // Weather
      temperature: "Temperature",
      humidity: "Humidity",
      rainfall: "Rain",
      windSpeed: "Wind",
      
      // Crops
      recommendedCrops: "Best Crops for You",
      currentSeason: "This Season",
      soilHealth: "Soil Health",
      plantingTime: "Best Time to Plant",
      
      // Finance
      availableSchemes: "Government Schemes",
      pmKisan: "PM-KISAN Money",
      cropInsurance: "Crop Protection",
      loanHelp: "Loan Help",
      
      // Voice Interface
      listening: "Listening...",
      speak: "Speak Now",
      processing: "Thinking...",
      
      // Actions
      getRecommendation: "Get AI Help",
      viewDetails: "See More",
      apply: "Apply Now",
      learnMore: "Learn More",
      
      // Common
      good: "Good",
      excellent: "Excellent",
      poor: "Needs Care",
      fair: "Okay"
    }
  },
  hi: {
    translation: {
      // Navigation
      dashboard: "मुख्य पृष्ठ",
      crops: "मेरी फसल",
      weather: "मौसम",
      finance: "पैसे की मदद",
      community: "किसान मित्र",
      market: "बाजार भाव",
      schemes: "सरकारी योजना",
      profile: "मेरी जानकारी",
      
      // Dashboard
      welcome: "स्वागत, किसान जी",
      todaysWeather: "आज का मौसम",
      cropPrices: "बाजार भाव",
      recommendations: "AI सुझाव",
      myFarm: "मेरा खेत",
      
      // Weather
      temperature: "तापमान",
      humidity: "नमी",
      rainfall: "बारिश",
      windSpeed: "हवा",
      
      // Crops
      recommendedCrops: "आपके लिए बेहतरीन फसल",
      currentSeason: "इस मौसम में",
      soilHealth: "मिट्टी की सेहत",
      plantingTime: "बोने का सही समय",
      
      // Finance
      availableSchemes: "सरकारी योजनाएं",
      pmKisan: "पीएम-किसान पैसा",
      cropInsurance: "फसल सुरक्षा",
      loanHelp: "कर्ज की मदद",
      
      // Voice Interface
      listening: "सुन रहा है...",
      speak: "अभी बोलें",
      processing: "सोच रहा है...",
      
      // Actions
      getRecommendation: "AI से मदद लें",
      viewDetails: "और देखें",
      apply: "अभी आवेदन करें",
      learnMore: "और जानें",
      
      // Common
      good: "अच्छा",
      excellent: "बहुत अच्छा",
      poor: "देखभाल चाहिए",
      fair: "ठीक है"
    }
  },
  ta: {
    translation: {
      // Navigation
      dashboard: "முதன்மை பக்கம்",
      crops: "என் பயிர்கள்",
      weather: "வானிலை",
      finance: "பண உதவி",
      community: "விவசாயி நண்பர்கள்",
      market: "சந்தை விலை",
      schemes: "அரசு உதவி",
      profile: "என் விவரம்",
      
      // Dashboard
      welcome: "வரவேற்கிறோம், விவசாயி",
      todaysWeather: "இன்றைய வானிலை",
      cropPrices: "சந்தை விலை",
      recommendations: "AI பரிந்துரைகள்",
      myFarm: "என் பண்ணை",
      
      // Actions
      getRecommendation: "AI உதவி பெறுங்கள்",
      viewDetails: "மேலும் பார்க்கவும்",
      apply: "இப்போது விண்ணப்பிக்கவும்",
      learnMore: "மேலும் அறியவும்"
    }
  },
  te: {
    translation: {
      dashboard: "ముఖ్య పేజీ",
      crops: "నా పంటలు",
      weather: "వాతావరణం",
      finance: "డబ్బు సహాయం",
      community: "రైతు మిత్రులు",
      welcome: "స్వాగతం, రైతు గారు",
      getRecommendation: "AI సహాయం పొందండి"
    }
  },
  bn: {
    translation: {
      dashboard: "প্রধান পাতা",
      crops: "আমার ফসল",
      weather: "আবহাওয়া",
      finance: "টাকার সাহায্য",
      community: "কৃষক বন্ধুরা",
      welcome: "স্বাগতম, কৃষক",
      getRecommendation: "AI সাহায্য নিন"
    }
  },
  mr: {
    translation: {
      dashboard: "मुख्य पान",
      crops: "माझी पिके",
      weather: "हवामान",
      finance: "पैशाची मदत",
      community: "शेतकरी मित्र",
      welcome: "स्वागत, शेतकरी",
      getRecommendation: "AI मदत घ्या"
    }
  },
  gu: {
    translation: {
      dashboard: "મુખ્ય પાનું",
      crops: "મારા પાક",
      weather: "હવામાન",
      finance: "પૈસાની મદદ",
      community: "ખેડૂત મિત્રો",
      welcome: "સ્વાગત, ખેડૂત",
      getRecommendation: "AI મદદ લો"
    }
  },
  kn: {
    translation: {
      dashboard: "ಮುಖ್ಯ ಪುಟ",
      crops: "ನನ್ನ ಬೆಳೆಗಳು",
      weather: "ಹವಾಮಾನ",
      finance: "ಹಣದ ಸಹಾಯ",
      community: "ರೈತ ಸ್ನೇಹಿತರು",
      welcome: "ಸ್ವಾಗತ, ರೈತ",
      getRecommendation: "AI ಸಹಾಯ ಪಡೆಯಿರಿ"
    }
  },
  ml: {
    translation: {
      dashboard: "പ്രധാന പേജ്",
      crops: "എന്റെ വിളകൾ",
      weather: "കാലാവസ്ഥ",
      finance: "പണ സഹായം",
      community: "കർഷക സുഹൃത്തുക്കൾ",
      welcome: "സ്വാഗതം, കർഷകൻ",
      getRecommendation: "AI സഹായം നേടുക"
    }
  },
  or: {
    translation: {
      dashboard: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
      crops: "ମୋର ଫସଲ",
      weather: "ପାଗ",
      finance: "ଟଙ୍କା ସାହାଯ୍ୟ",
      community: "କୃଷକ ବନ୍ଧୁ",
      welcome: "ସ୍ୱାଗତ, କୃଷକ",
      getRecommendation: "AI ସାହାଯ୍ୟ ନିଅନ୍ତୁ"
    }
  },
  pa: {
    translation: {
      dashboard: "ਮੁੱਖ ਪੰਨਾ",
      crops: "ਮੇਰੀਆਂ ਫਸਲਾਂ",
      weather: "ਮੌਸਮ",
      finance: "ਪੈਸੇ ਦੀ ਮਦਦ",
      community: "ਕਿਸਾਨ ਦੋਸਤ",
      welcome: "ਸਵਾਗਤ, ਕਿਸਾਨ",
      getRecommendation: "AI ਮਦਦ ਲਓ"
    }
  },
  as: {
    translation: {
      dashboard: "মুখ্য পৃষ্ঠা",
      crops: "মোৰ শস্য",
      weather: "বতৰ",
      finance: "টকাৰ সহায়",
      community: "কৃষক বন্ধু",
      welcome: "স্বাগতম, কৃষক",
      getRecommendation: "AI সহায় লওক"
    }
  },
  ur: {
    translation: {
      dashboard: "اصل صفحہ",
      crops: "میری فصلیں",
      weather: "موسم",
      finance: "پیسے کی مدد",
      community: "کسان دوست",
      welcome: "خوش آمدید، کسان",
      getRecommendation: "AI مدد لیں"
    }
  },
  // Add more languages with basic translations
  ne: { translation: { dashboard: "मुख्य पृष्ठ", welcome: "स्वागत, किसान" } },
  si: { translation: { dashboard: "ප්‍රධාන පිටුව", welcome: "ආයුබෝවන්, ගොවියා" } },
  my: { translation: { dashboard: "ပင်မစာမျက်နှာ", welcome: "ကြိုဆိုပါတယ်၊ လယ်သမား" } },
  dz: { translation: { dashboard: "གཙོ་བོའི་ཤོག་ལེབ", welcome: "བསུ་འདེགས་ཞུ། ཞིང་པ།" } },
  kok: { translation: { dashboard: "मुख्य पान", welcome: "स्वागत, शेतकरी" } },
  mni: { translation: { dashboard: "অহানবা লমাই", welcome: "তরাং কৈথবা, লৌমী" } },
  sd: { translation: { dashboard: "بنيادي صفحو", welcome: "ڀلي ڪري آيا، هاري" } },
  ks: { translation: { dashboard: "اصل صفحہ", welcome: "خوش آمدید، کسان" } },
  doi: { translation: { dashboard: "मुख्य पन्ना", welcome: "स्वागत, किसान" } },
  sat: { translation: { dashboard: "ᱢᱩᱬ ᱥᱟᱦᱴᱟ", welcome: "ᱡᱚᱦᱟᱨ, ᱦᱟᱹᱨᱭᱟᱹᱲ" } },
  mai: { translation: { dashboard: "मुख्य पन्ना", welcome: "स्वागत, किसान" } },
  bho: { translation: { dashboard: "मुख्य पन्ना", welcome: "स्वागत, किसान" } },
  brx: { translation: { dashboard: "गावसारि पान्ना", welcome: "जुहार, हारि" } }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'hi', // Default to Hindi for Indian farmers
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;