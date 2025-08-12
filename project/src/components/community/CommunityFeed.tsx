import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Clock,
  CheckCircle,
  HelpCircle,
  Wheat,
  Bug,
  Droplets,
  Sun,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, CommunityPost } from '../../lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

interface CommunityFeedProps {
  onCreatePost: () => void;
}

export default function CommunityFeed({ onCreatePost }: CommunityFeedProps) {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          farmer:farmer_profiles(*)
        `)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('category', filter);
      }

      const { data, error } = await query;
      if (error) throw error;

      setPosts(data || []);
    } catch (error: any) {
      toast.error('Error loading posts: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('farmer_id', user.id)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('farmer_id', user.id);

        // Update post likes count
        await supabase.rpc('decrement_post_likes', { post_id: postId });
      } else {
        // Like
        await supabase
          .from('post_likes')
          .insert([{ post_id: postId, farmer_id: user.id }]);

        // Update post likes count
        await supabase.rpc('increment_post_likes', { post_id: postId });
      }

      // Refresh posts
      fetchPosts();
    } catch (error: any) {
      toast.error('Error updating like: ' + error.message);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crop': return Wheat;
      case 'pest': return Bug;
      case 'weather': return Sun;
      case 'irrigation': return Droplets;
      case 'market': return TrendingUp;
      case 'general': return MessageCircle;
      default: return HelpCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crop': return 'bg-green-100 text-green-800';
      case 'pest': return 'bg-red-100 text-red-800';
      case 'weather': return 'bg-blue-100 text-blue-800';
      case 'irrigation': return 'bg-cyan-100 text-cyan-800';
      case 'market': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">👥 किसान समुदाय • Farmer Community</h2>
            <p className="text-green-100">
              अन्य किसानों से जुड़ें, सवाल पूछें, अनुभव साझा करें • Connect with farmers, ask questions, share experiences
            </p>
          </div>
          <div className="text-6xl">🤝</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-4 border border-green-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">12.5K</p>
              <p className="text-sm text-gray-600">सक्रिय किसान • Active Farmers</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-4 border border-blue-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">8.2K</p>
              <p className="text-sm text-gray-600">चर्चाएं • Discussions</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-4 border border-purple-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">3.1K</p>
              <p className="text-sm text-gray-600">समाधान • Solutions</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-4 border border-orange-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">1.8K</p>
              <p className="text-sm text-gray-600">सवाल • Questions</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="खोजें... • Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">सभी • All</option>
                <option value="crop">फसल • Crops</option>
                <option value="pest">कीट • Pests</option>
                <option value="weather">मौसम • Weather</option>
                <option value="irrigation">सिंचाई • Irrigation</option>
                <option value="market">बाजार • Market</option>
                <option value="general">सामान्य • General</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCreatePost}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            नई पोस्ट • New Post
          </motion.button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredPosts.map((post, index) => {
            const CategoryIcon = getCategoryIcon(post.category);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">👨‍🌾</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{post.farmer?.full_name || 'Anonymous Farmer'}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{post.farmer?.village}, {post.farmer?.district}</span>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      <CategoryIcon className="w-3 h-3" />
                      {post.category}
                    </span>
                    {post.is_question && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <HelpCircle className="w-3 h-3" />
                        सवाल • Question
                      </span>
                    )}
                    {post.is_solved && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        हल हो गया • Solved
                      </span>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                </div>

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    {post.images.slice(0, 3).map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Post image ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                    {post.images.length > 3 && (
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                        +{post.images.length - 3} more
                      </div>
                    )}
                  </div>
                )}

                {/* Post Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{post.likes_count} पसंद • Likes</span>
                    </motion.button>

                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments_count} टिप्पणी • Comments</span>
                    </button>

                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>साझा करें • Share</span>
                    </button>
                  </div>

                  <div className="text-sm text-gray-500">
                    {post.farmer?.experience_years} साल का अनुभव • {post.farmer?.experience_years} years experience
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">कोई पोस्ट नहीं मिली • No Posts Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'अपनी खोज बदलें या नई पोस्ट बनाएं • Try different search or create new post' : 'पहली पोस्ट बनाएं • Create the first post'}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCreatePost}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300"
            >
              नई पोस्ट बनाएं • Create New Post
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}