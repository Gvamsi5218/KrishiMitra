import { WeatherData, CropPrice, CropRecommendation, SoilData, GovernmentScheme } from '../types';

export const mockWeatherData: WeatherData = {
  temperature: 28,
  humidity: 65,
  rainfall: 12.5,
  windSpeed: 8.2,
  condition: 'Partly Cloudy',
  icon: '⛅'
};

export const mockCropPrices: CropPrice[] = [
  { crop: 'Rice', price: 2850, change: 2.5, market: 'Delhi Mandi' },
  { crop: 'Wheat', price: 2250, change: -1.2, market: 'Punjab APMC' },
  { crop: 'Cotton', price: 6800, change: 4.8, market: 'Gujarat Market' },
  { crop: 'Sugarcane', price: 385, change: 1.5, market: 'UP Cooperative' }
];

export const mockCropRecommendations: CropRecommendation[] = [
  {
    name: 'Kharif Rice',
    suitability: 95,
    expectedYield: 4.2,
    profitability: 88,
    reasons: [
      'Optimal soil pH (6.2) for rice cultivation',
      'Adequate monsoon forecast (850mm expected)',
      'High market demand in your region',
      'Government MSP support available'
    ],
    icon: '🌾'
  },
  {
    name: 'Cotton',
    suitability: 78,
    expectedYield: 18.5,
    profitability: 75,
    reasons: [
      'Good soil drainage conditions',
      'Suitable temperature range',
      'Strong export market demand',
      'Pest-resistant varieties available'
    ],
    icon: '🌱'
  },
  {
    name: 'Pulses (Arhar)',
    suitability: 85,
    expectedYield: 1.8,
    profitability: 82,
    reasons: [
      'Nitrogen-fixing benefits for soil',
      'Lower water requirement',
      'Government procurement guarantee',
      'Good intercropping option'
    ],
    icon: '🫘'
  }
];

export const mockSoilData: SoilData = {
  ph: 6.2,
  nitrogen: 245,
  phosphorus: 28,
  potassium: 185,
  organicMatter: 2.8,
  health: 'good'
};

export const mockGovernmentSchemes: GovernmentScheme[] = [
  {
    name: 'PM-KISAN',
    description: 'Direct income support of ₹6,000 per year to eligible farmers',
    eligibility: ['Landholding farmer', 'Valid Aadhaar card', 'Bank account linked'],
    amount: 6000,
    deadline: '2024-03-31',
    status: 'eligible'
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Comprehensive crop insurance scheme for all farmers',
    eligibility: ['All farmers including sharecroppers', 'Crop cultivation proof', 'Bank account'],
    amount: 50000,
    deadline: '2024-04-15',
    status: 'applied'
  },
  {
    name: 'Kisan Credit Card',
    description: 'Flexible credit facility for agricultural and allied activities',
    eligibility: ['Farmer with land records', 'Good credit history', 'Aadhaar linking'],
    amount: 300000,
    deadline: 'Open',
    status: 'approved'
  }
];

export const mockMarketTrends = [
  { month: 'Jan', rice: 2650, wheat: 2100, cotton: 6200 },
  { month: 'Feb', rice: 2700, wheat: 2150, cotton: 6400 },
  { month: 'Mar', rice: 2750, wheat: 2200, cotton: 6600 },
  { month: 'Apr', rice: 2800, wheat: 2250, cotton: 6800 },
  { month: 'May', rice: 2850, wheat: 2300, cotton: 7000 },
  { month: 'Jun', rice: 2900, wheat: 2200, cotton: 6900 }
];

export const mockYieldPredictions = [
  { scenario: 'Optimal', yield: 4.2, probability: 30 },
  { scenario: 'Good', yield: 3.8, probability: 40 },
  { scenario: 'Average', yield: 3.2, probability: 20 },
  { scenario: 'Poor', yield: 2.5, probability: 10 }
];

export const mockRealTimeAlerts = [
  {
    id: '1',
    type: 'weather',
    title: '🌧️ भारी बारिश की चेतावनी • Heavy Rain Warning',
    message: 'अगले 24 घंटों में भारी बारिश की संभावना है। फसल को सुरक्षित रखें। • Heavy rain expected in next 24 hours. Protect your crops.',
    timestamp: new Date(),
    priority: 'high',
    actionRequired: true,
  },
  {
    id: '2',
    type: 'pest',
    title: '🐛 कीट प्रकोप की संभावना • Pest Outbreak Alert',
    message: 'आपके क्षेत्र में तना छेदक कीट का प्रकोप देखा गया है। तुरंत उपचार करें। • Stem borer pest outbreak detected in your area. Take immediate action.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    priority: 'high',
    actionRequired: true,
  },
  {
    id: '3',
    type: 'market',
    title: '📈 गेहूं की कीमत में वृद्धि • Wheat Price Surge',
    message: 'गेहूं की कीमत 12% बढ़ गई है। बेचने का अच्छा समय है। • Wheat prices increased by 12%. Good time to sell.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    priority: 'medium',
    actionRequired: false,
  },
];

export const mockAIInsights = [
  {
    id: '1',
    type: 'recommendation',
    title: 'धान की बुआई का सही समय • Optimal Rice Sowing Time',
    description: 'मौसम विभाग के अनुसार अगले सप्ताह बारिश की संभावना है। धान की बुआई के लिए यह सबसे अच्छा समय है। • According to weather department, rain is expected next week. This is the best time for rice sowing.',
    confidence: 94,
    impact: 'high',
    category: 'crop',
    actionable: true,
  },
  {
    id: '2',
    type: 'warning',
    title: 'मिट्टी में नाइट्रोजन की कमी • Nitrogen Deficiency in Soil',
    description: 'मिट्टी परीक्षण रिपोर्ट के आधार पर यूरिया का छिड़काव करने की सलाह दी जाती है। • Based on soil test report, urea application is recommended.',
    confidence: 87,
    impact: 'medium',
    category: 'soil',
    actionable: true,
  },
  {
    id: '3',
    type: 'opportunity',
    title: 'कपास की कीमत बढ़ने की संभावना • Cotton Price Likely to Rise',
    description: 'बाजार विश्लेषण के अनुसार कपास की कीमत अगले महीने 15% तक बढ़ सकती है। • Market analysis suggests cotton prices may rise by 15% next month.',
    confidence: 78,
    impact: 'high',
    category: 'market',
    actionable: false,
  },
  {
    id: '4',
    type: 'tip',
    title: 'जैविक खाद का उपयोग करें • Use Organic Fertilizer',
    description: 'गोबर की खाद का उपयोग करने से मिट्टी की गुणवत्ता में सुधार होगा और लागत भी कम आएगी। • Using cow dung manure will improve soil quality and reduce costs.',
    confidence: 92,
    impact: 'medium',
    category: 'soil',
    actionable: true,
  },
];