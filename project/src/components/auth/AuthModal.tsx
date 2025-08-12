import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Wheat, GraduationCap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const signUpSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  full_name: yup.string().required('Full name is required'),
  phone: yup.string().required('Phone number is required'),
  village: yup.string().required('Village is required'),
  district: yup.string().required('District is required'),
  state: yup.string().required('State is required'),
  farm_size: yup.number().positive('Farm size must be positive').required('Farm size is required'),
  farm_type: yup.string().required('Farm type is required'),
  experience_years: yup.number().min(0, 'Experience cannot be negative').required('Experience is required'),
  education_level: yup.string().required('Education level is required'),
});

const signInSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useTranslation();
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUpForm = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      phone: '',
      village: '',
      district: '',
      state: '',
      farm_size: 0,
      farm_type: 'mixed',
      experience_years: 0,
      education_level: 'primary',
      preferred_language: 'hi',
    },
  });

  const signInForm = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignUp = async (data: any) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, {
        full_name: data.full_name,
        phone: data.phone,
        village: data.village,
        district: data.district,
        state: data.state,
        farm_size: data.farm_size,
        farm_type: data.farm_type,
        experience_years: data.experience_years,
        education_level: data.education_level,
        preferred_language: data.preferred_language,
        primary_crops: [],
      });
      onClose();
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSignIn = async (data: any) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      onClose();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isSignUp ? 'किसान पंजीकरण • Farmer Registration' : 'लॉगिन • Login'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {isSignUp ? 'अपना खाता बनाएं • Create your account' : 'अपने खाते में प्रवेश करें • Sign in to your account'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {isSignUp ? (
              <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      ईमेल • Email *
                    </label>
                    <input
                      {...signUpForm.register('email')}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="farmer@example.com"
                    />
                    {signUpForm.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      पासवर्ड • Password *
                    </label>
                    <input
                      {...signUpForm.register('password')}
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    {signUpForm.formState.errors.password && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      पूरा नाम • Full Name *
                    </label>
                    <input
                      {...signUpForm.register('full_name')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="राम कुमार • Ram Kumar"
                    />
                    {signUpForm.formState.errors.full_name && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.full_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      फोन नंबर • Phone Number *
                    </label>
                    <input
                      {...signUpForm.register('phone')}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                    {signUpForm.formState.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      गांव • Village *
                    </label>
                    <input
                      {...signUpForm.register('village')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="खुशीपुर • Khushipur"
                    />
                    {signUpForm.formState.errors.village && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.village.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      जिला • District *
                    </label>
                    <input
                      {...signUpForm.register('district')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="लुधियाना • Ludhiana"
                    />
                    {signUpForm.formState.errors.district && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.district.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      राज्य • State *
                    </label>
                    <select
                      {...signUpForm.register('state')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">राज्य चुनें • Select State</option>
                      <option value="punjab">पंजाब • Punjab</option>
                      <option value="haryana">हरियाणा • Haryana</option>
                      <option value="uttar-pradesh">उत्तर प्रदेश • Uttar Pradesh</option>
                      <option value="bihar">बिहार • Bihar</option>
                      <option value="west-bengal">पश्चिम बंगाल • West Bengal</option>
                      <option value="maharashtra">महाराष्ट्र • Maharashtra</option>
                      <option value="gujarat">गुजरात • Gujarat</option>
                      <option value="rajasthan">राजस्थान • Rajasthan</option>
                      <option value="madhya-pradesh">मध्य प्रदेश • Madhya Pradesh</option>
                      <option value="karnataka">कर्नाटक • Karnataka</option>
                      <option value="andhra-pradesh">आंध्र प्रदेश • Andhra Pradesh</option>
                      <option value="telangana">तेलंगाना • Telangana</option>
                      <option value="tamil-nadu">तमिल नाडु • Tamil Nadu</option>
                      <option value="kerala">केरल • Kerala</option>
                      <option value="odisha">ओडिशा • Odisha</option>
                    </select>
                    {signUpForm.formState.errors.state && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Wheat className="w-4 h-4 inline mr-2" />
                      खेत का आकार (एकड़) • Farm Size (Acres) *
                    </label>
                    <input
                      {...signUpForm.register('farm_size')}
                      type="number"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="5.0"
                    />
                    {signUpForm.formState.errors.farm_size && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.farm_size.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      खेती का प्रकार • Farm Type *
                    </label>
                    <select
                      {...signUpForm.register('farm_type')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="mixed">मिश्रित • Mixed Farming</option>
                      <option value="crop">फसल • Crop Only</option>
                      <option value="livestock">पशुपालन • Livestock</option>
                      <option value="organic">जैविक • Organic</option>
                      <option value="commercial">व्यावसायिक • Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      अनुभव (वर्ष) • Experience (Years) *
                    </label>
                    <input
                      {...signUpForm.register('experience_years')}
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="10"
                    />
                    {signUpForm.formState.errors.experience_years && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.experience_years.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-2" />
                      शिक्षा स्तर • Education Level *
                    </label>
                    <select
                      {...signUpForm.register('education_level')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="primary">प्राथमिक • Primary</option>
                      <option value="secondary">माध्यमिक • Secondary</option>
                      <option value="higher_secondary">उच्च माध्यमिक • Higher Secondary</option>
                      <option value="graduate">स्नातक • Graduate</option>
                      <option value="postgraduate">स्नातकोत्तर • Post Graduate</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? 'पंजीकरण हो रहा है... • Registering...' : 'पंजीकरण करें • Register'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    लॉगिन • Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    ईमेल • Email
                  </label>
                  <input
                    {...signInForm.register('email')}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="farmer@example.com"
                  />
                  {signInForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{signInForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पासवर्ड • Password
                  </label>
                  <input
                    {...signInForm.register('password')}
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  {signInForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{signInForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? 'लॉगिन हो रहा है... • Signing in...' : 'लॉगिन • Sign In'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    पंजीकरण • Register
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}