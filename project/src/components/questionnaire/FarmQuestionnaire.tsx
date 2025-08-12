import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Wheat, 
  Bug, 
  Thermometer, 
  Droplets, 
  MapPin, 
  Camera, 
  Send,
  AlertTriangle,
  Leaf,
  Sun,
  Cloud
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const questionnaireSchema = yup.object({
  crop_type: yup.string().required('Crop type is required'),
  problem_category: yup.string().required('Problem category is required'),
  symptoms: yup.array().min(1, 'Select at least one symptom'),
  severity: yup.number().min(1).max(5).required('Severity is required'),
  affected_area: yup.number().positive('Affected area must be positive').required('Affected area is required'),
  weather_conditions: yup.string().required('Weather conditions are required'),
  soil_type: yup.string().required('Soil type is required'),
});

interface FarmQuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FarmQuestionnaire({ isOpen, onClose }: FarmQuestionnaireProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);

  const form = useForm({
    resolver: yupResolver(questionnaireSchema),
    defaultValues: {
      crop_type: '',
      problem_category: '',
      symptoms: [],
      severity: 3,
      affected_area: 0,
      weather_conditions: '',
      soil_type: '',
    },
  });

  const cropTypes = [
    { value: 'rice', label: '🌾 धान • Rice', icon: '🌾' },
    { value: 'wheat', label: '🌾 गेहूं • Wheat', icon: '🌾' },
    { value: 'cotton', label: '🌱 कपास • Cotton', icon: '🌱' },
    { value: 'sugarcane', label: '🎋 गन्ना • Sugarcane', icon: '🎋' },
    { value: 'maize', label: '🌽 मक्का • Maize', icon: '🌽' },
    { value: 'soybean', label: '🫘 सोयाबीन • Soybean', icon: '🫘' },
    { value: 'tomato', label: '🍅 टमाटर • Tomato', icon: '🍅' },
    { value: 'potato', label: '🥔 आलू • Potato', icon: '🥔' },
    { value: 'onion', label: '🧅 प्याज • Onion', icon: '🧅' },
    { value: 'other', label: '🌿 अन्य • Other', icon: '🌿' },
  ];

  const problemCategories = [
    { value: 'pest', label: '🐛 कीट • Pest Attack', icon: Bug },
    { value: 'disease', label: '🦠 बीमारी • Disease', icon: AlertTriangle },
    { value: 'nutrient', label: '🌱 पोषक तत्व • Nutrient Deficiency', icon: Leaf },
    { value: 'weather', label: '🌤️ मौसम • Weather Damage', icon: Cloud },
    { value: 'soil', label: '🌍 मिट्टी • Soil Problem', icon: MapPin },
    { value: 'water', label: '💧 पानी • Water Issue', icon: Droplets },
  ];

  const symptoms = [
    'पत्तियों का पीला होना • Yellowing leaves',
    'पत्तियों पर धब्बे • Spots on leaves',
    'पत्तियों का मुरझाना • Wilting leaves',
    'तने में छेद • Holes in stem',
    'जड़ों का सड़ना • Root rot',
    'फलों में कीड़े • Insects in fruits',
    'फूलों का गिरना • Flower drop',
    'पौधे की धीमी वृद्धि • Slow growth',
    'पत्तियों का कुरकुराना • Crispy leaves',
    'असामान्य गंध • Unusual smell',
  ];

  const weatherConditions = [
    { value: 'sunny', label: '☀️ धूप • Sunny', icon: Sun },
    { value: 'rainy', label: '🌧️ बारिश • Rainy', icon: Cloud },
    { value: 'cloudy', label: '☁️ बादल • Cloudy', icon: Cloud },
    { value: 'hot', label: '🌡️ गर्म • Hot', icon: Thermometer },
    { value: 'cold', label: '❄️ ठंड • Cold', icon: Thermometer },
    { value: 'humid', label: '💨 नम • Humid', icon: Droplets },
  ];

  const soilTypes = [
    { value: 'clay', label: '🟤 चिकनी मिट्टी • Clay Soil' },
    { value: 'sandy', label: '🟡 रेतीली मिट्टी • Sandy Soil' },
    { value: 'loamy', label: '🟫 दोमट मिट्टी • Loamy Soil' },
    { value: 'black', label: '⚫ काली मिट्टी • Black Soil' },
    { value: 'red', label: '🔴 लाल मिट्टी • Red Soil' },
    { value: 'alluvial', label: '🌊 जलोढ़ मिट्टी • Alluvial Soil' },
  ];

  const onSubmit = async (data: any) => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    setLoading(true);
    try {
      // Upload images if any
      let imageUrls: string[] = [];
      if (images.length > 0) {
        for (const image of images) {
          const fileName = `${Date.now()}-${image.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('questionnaire-images')
            .upload(fileName, image);

          if (uploadError) throw uploadError;
          
          const { data: { publicUrl } } = supabase.storage
            .from('questionnaire-images')
            .getPublicUrl(fileName);
          
          imageUrls.push(publicUrl);
        }
      }

      // Save questionnaire
      const { error } = await supabase
        .from('questionnaires')
        .insert([
          {
            farmer_id: user.id,
            ...data,
            images: imageUrls,
            status: 'pending',
          },
        ]);

      if (error) throw error;

      toast.success('प्रश्नावली सफलतापूर्वक भेजी गई! • Questionnaire submitted successfully!');
      onClose();
      form.reset();
      setImages([]);
      setCurrentStep(1);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Wheat className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    🌾 फसल समस्या प्रश्नावली • Crop Problem Questionnaire
                  </h2>
                  <p className="text-sm text-gray-600">
                    अपनी समस्या बताएं, AI मदद करेगा • Tell us your problem, AI will help
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  चरण {currentStep} / 4 • Step {currentStep} / 4
                </span>
                <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      🌱 फसल और समस्या की जानकारी • Crop and Problem Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        कौन सी फसल है? • Which crop? *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {cropTypes.map((crop) => (
                          <label
                            key={crop.value}
                            className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              form.watch('crop_type') === crop.value
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                          >
                            <input
                              {...form.register('crop_type')}
                              type="radio"
                              value={crop.value}
                              className="sr-only"
                            />
                            <span className="text-2xl">{crop.icon}</span>
                            <span className="text-sm font-medium">{crop.label}</span>
                          </label>
                        ))}
                      </div>
                      {form.formState.errors.crop_type && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.crop_type.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        समस्या का प्रकार • Problem Category *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {problemCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <label
                              key={category.value}
                              className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                form.watch('problem_category') === category.value
                                  ? 'border-red-500 bg-red-50'
                                  : 'border-gray-200 hover:border-red-300'
                              }`}
                            >
                              <input
                                {...form.register('problem_category')}
                                type="radio"
                                value={category.value}
                                className="sr-only"
                              />
                              <Icon className="w-6 h-6 text-red-600" />
                              <span className="text-sm font-medium">{category.label}</span>
                            </label>
                          );
                        })}
                      </div>
                      {form.formState.errors.problem_category && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.problem_category.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      🔍 लक्षण और गंभीरता • Symptoms and Severity
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        कौन से लक्षण दिख रहे हैं? • What symptoms do you see? *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {symptoms.map((symptom, index) => (
                          <label
                            key={index}
                            className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                              form.watch('symptoms')?.includes(symptom)
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-300'
                            }`}
                          >
                            <input
                              {...form.register('symptoms')}
                              type="checkbox"
                              value={symptom}
                              className="w-4 h-4 text-orange-600 rounded"
                            />
                            <span className="text-sm">{symptom}</span>
                          </label>
                        ))}
                      </div>
                      {form.formState.errors.symptoms && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.symptoms.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        समस्या की गंभीरता • Problem Severity (1-5) *
                      </label>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">हल्की • Mild</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <label key={level} className="cursor-pointer">
                              <input
                                {...form.register('severity')}
                                type="radio"
                                value={level}
                                className="sr-only"
                              />
                              <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                  form.watch('severity') === level
                                    ? 'border-red-500 bg-red-500 text-white'
                                    : 'border-gray-300 hover:border-red-300'
                                }`}
                              >
                                {level}
                              </div>
                            </label>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">गंभीर • Severe</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        प्रभावित क्षेत्र (एकड़ में) • Affected Area (in acres) *
                      </label>
                      <input
                        {...form.register('affected_area')}
                        type="number"
                        step="0.1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="1.5"
                      />
                      {form.formState.errors.affected_area && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.affected_area.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      🌤️ मौसम और मिट्टी • Weather and Soil
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        हाल का मौसम कैसा था? • Recent weather conditions? *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {weatherConditions.map((weather) => {
                          const Icon = weather.icon;
                          return (
                            <label
                              key={weather.value}
                              className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                form.watch('weather_conditions') === weather.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-blue-300'
                              }`}
                            >
                              <input
                                {...form.register('weather_conditions')}
                                type="radio"
                                value={weather.value}
                                className="sr-only"
                              />
                              <Icon className="w-6 h-6 text-blue-600" />
                              <span className="text-sm font-medium">{weather.label}</span>
                            </label>
                          );
                        })}
                      </div>
                      {form.formState.errors.weather_conditions && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.weather_conditions.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        मिट्टी का प्रकार • Soil Type *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {soilTypes.map((soil) => (
                          <label
                            key={soil.value}
                            className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              form.watch('soil_type') === soil.value
                                ? 'border-brown-500 bg-yellow-50'
                                : 'border-gray-200 hover:border-brown-300'
                            }`}
                          >
                            <input
                              {...form.register('soil_type')}
                              type="radio"
                              value={soil.value}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">{soil.label}</span>
                          </label>
                        ))}
                      </div>
                      {form.formState.errors.soil_type && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.soil_type.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      📸 तस्वीरें और समीक्षा • Photos and Review
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        समस्या की तस्वीरें अपलोड करें • Upload problem photos (वैकल्पिक • Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          📷 तस्वीर चुनें • Choose Photos
                        </label>
                        <p className="text-sm text-gray-500 mt-2">
                          अधिकतम 5 तस्वीरें • Maximum 5 photos
                        </p>
                      </div>

                      {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-bold text-green-800 mb-2">📋 आपकी जानकारी • Your Information</h4>
                      <div className="space-y-2 text-sm text-green-700">
                        <p><strong>फसल • Crop:</strong> {form.watch('crop_type')}</p>
                        <p><strong>समस्या • Problem:</strong> {form.watch('problem_category')}</p>
                        <p><strong>गंभीरता • Severity:</strong> {form.watch('severity')}/5</p>
                        <p><strong>प्रभावित क्षेत्र • Affected Area:</strong> {form.watch('affected_area')} acres</p>
                        <p><strong>मौसम • Weather:</strong> {form.watch('weather_conditions')}</p>
                        <p><strong>मिट्टी • Soil:</strong> {form.watch('soil_type')}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    ← पिछला • Previous
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="ml-auto px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    अगला • Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    {loading ? 'भेजा जा रहा है... • Submitting...' : 'भेजें • Submit'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}