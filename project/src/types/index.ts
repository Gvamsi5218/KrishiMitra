export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

export interface CropPrice {
  crop: string;
  price: number;
  change: number;
  market: string;
}

export interface CropRecommendation {
  name: string;
  suitability: number;
  expectedYield: number;
  profitability: number;
  reasons: string[];
  icon: string;
}

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  health: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface GovernmentScheme {
  name: string;
  description: string;
  eligibility: string[];
  amount: number;
  deadline: string;
  status: 'eligible' | 'applied' | 'approved' | 'not-eligible';
}

export interface FarmDigitalTwin {
  id: string;
  size: number;
  location: { lat: number; lng: number };
  currentCrops: string[];
  soilData: SoilData;
  irrigationStatus: string;
  predictedYield: number;
}

export interface VoiceCommand {
  text: string;
  confidence: number;
  intent: string;
  entities: Record<string, any>;
}