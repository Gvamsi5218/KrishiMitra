import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Tag, HelpCircle, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const postSchema = yup.object({
  title: yup.string().required('Title is required').min(10, 'Title must be at least 10 characters'),
  content: yup.string().required('Content is required').min(20, 'Content must be at least 20 characters'),
  category: yup.string().required('Category is required'),
  is_question: yup.boolean(),
  tags: yup.string(),
});

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export default function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const form = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'general',
      is_question: false,
      tags: '',
    },
  });

  const categories = [
    { value: 'general', label: '💬 सामान्य • General', description: 'General farming discussions' },
    { value: 'crop', label: '🌾 फसल • Crops', description: 'Crop-related questions and tips' },
    { value: 'pest', label: '🐛 कीट • Pests', description: 'Pest control and management' },
    { value: 'weather', label: '🌤️ मौसम • Weather', description: 'Weather-related discussions' },
    { value: 'irrigation', label: '💧 सिंचाई • Irrigation', description: 'Water management and irrigation' },
    { value: 'market', label: '📈 बाजार • Market', description: 'Market prices and trends' },
    { value: 'technology', label: '🚜 तकनीक • Technology', description: 'Farm technology and tools' },
    { value: 'success', label: '🏆 सफलता • Success Story', description: 'Share your success stories' },
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
            .from('community-images')
            .upload(fileName, image);

          if (uploadError) throw uploadError;
          
          const { data: { publicUrl } } = supabase.storage
            .from('community-images')
            .getPublicUrl(fileName);
          
          imageUrls.push(publicUrl);
        }
      }

      // Process tags
      const tags = data.tags
        ? data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        : [];

      // Create post
      const { error } = await supabase
        .from('community_posts')
        .insert([
          {
            farmer_id: user.id,
            title: data.title,
            content: data.content,
            category: data.category,
            is_question: data.is_question,
            tags,
            images: imageUrls,
            likes_count: 0,
            comments_count: 0,
            is_solved: false,
          },
        ]);

      if (error) throw error;

      toast.success('पोस्ट सफलतापूर्वक बनाई गई! • Post created successfully!');
      onPostCreated();
      onClose();
      form.reset();
      setImages([]);
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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    ✍️ नई पोस्ट बनाएं • Create New Post
                  </h2>
                  <p className="text-sm text-gray-600">
                    अपना अनुभव साझा करें या सवाल पूछें • Share your experience or ask questions
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

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Post Type */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...form.register('is_question')}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    यह एक सवाल है • This is a question
                  </span>
                </label>
                <p className="text-sm text-blue-700">
                  सवाल के रूप में पोस्ट करने से अन्य किसान बेहतर मदद कर सकेंगे • Posting as a question helps other farmers provide better help
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  श्रेणी चुनें • Choose Category *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <label
                      key={category.value}
                      className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        form.watch('category') === category.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        {...form.register('category')}
                        type="radio"
                        value={category.value}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{category.label}</div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {form.formState.errors.category && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.category.message}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  शीर्षक • Title *
                </label>
                <input
                  {...form.register('title')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={form.watch('is_question') ? 
                    "मेरी फसल में पत्तियां पीली हो रही हैं, क्या करूं? • My crop leaves are turning yellow, what should I do?" :
                    "धान की खेती में मेरा अनुभव • My experience with rice farming"
                  }
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  विवरण • Content *
                </label>
                <textarea
                  {...form.register('content')}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder={form.watch('is_question') ?
                    "अपनी समस्या का विस्तार से वर्णन करें... • Describe your problem in detail..." :
                    "अपना अनुभव या सुझाव साझा करें... • Share your experience or suggestions..."
                  }
                />
                {form.formState.errors.content && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.content.message}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  टैग • Tags (वैकल्पिक • Optional)
                </label>
                <input
                  {...form.register('tags')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="धान, कीट, जैविक, सिंचाई (कॉमा से अलग करें • Separate with commas)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  टैग से आपकी पोस्ट आसानी से मिल जाएगी • Tags help others find your post easily
                </p>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Camera className="w-4 h-4 inline mr-2" />
                  तस्वीरें जोड़ें • Add Photos (वैकल्पिक • Optional)
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

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  रद्द करें • Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'पोस्ट हो रहा है... • Posting...' : 'पोस्ट करें • Post'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}