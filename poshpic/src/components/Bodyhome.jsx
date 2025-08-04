import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiSearch, FiArrowRight, FiChevronRight, FiHeart, FiShare2, FiClock, FiAward } from 'react-icons/fi';
import { RiCameraLensFill, RiFlashlightFill, RiCustomerService2Fill } from 'react-icons/ri';
import { MdOutlineCelebration, MdOutlineRestaurant, MdOutlineStreetview, MdOutlineShoppingBag } from 'react-icons/md';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';

const PremiumHomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const [activeTab, setActiveTab] = useState('trending');
  const [isBookmarked, setIsBookmarked] = useState({});
  const controls = useAnimation();

  // Sample data
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1887&auto=format&fit=crop',
      title: 'Capture Your Perfect Moments',
      subtitle: 'Professional photographers for every occasion'
    },
    {
      image: 'https://images.unsplash.com/photo-1529635769365-75d6ac5e5aaf?q=80&w=1887&auto=format&fit-crop',
      title: 'Timeless Wedding Memories',
      subtitle: 'Expert wedding photographers to preserve your special day'
    },
    {
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
      title: 'Elevate Your Brand',
      subtitle: 'Commercial photography that tells your story'
    }
  ];

  const categories = [
    {
      id: 1,
      title: 'Wedding Photography',
      icon: <MdOutlineCelebration size={40} />,
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1887&auto=format&fit=crop',
      description: 'Capture your special day with our talented wedding photographers'
    },
    {
      id: 2,
      title: 'Food Photography',
      icon: <MdOutlineRestaurant size={40} />,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
      description: 'Showcase your culinary creations with stunning food photography'
    },
    {
      id: 3,
      title: 'Street Photography',
      icon: <MdOutlineStreetview size={40} />,
      image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058&auto=format&fit=crop',
      description: 'Urban stories captured through the lens of our street photographers'
    },
    {
      id: 4,
      title: 'Product Photography',
      icon: <MdOutlineShoppingBag size={40} />,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1887&auto=format&fit=crop',
      description: 'Professional product shots that boost your sales'
    }
  ];

  const photographers = [
    {
      id: 1,
      name: 'Alex Johnson',
      specialty: 'Wedding Photography',
      rating: 4.8,
      reviews: 124,
      price: '$250/hr',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
      portfolio: ['url1', 'url2', 'url3']
    },
    {
      id: 2,
      name: 'Maria Garcia',
      specialty: 'Food Photography',
      rating: 4.9,
      reviews: 89,
      price: '$200/hr',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop',
      portfolio: ['url1', 'url2', 'url3']
    },
    {
      id: 3,
      name: 'James Wilson',
      specialty: 'Street Photography',
      rating: 4.7,
      reviews: 156,
      price: '$180/hr',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
      portfolio: ['url1', 'url2', 'url3']
    },
    {
      id: 4,
      name: 'Sarah Lee',
      specialty: 'Product Photography',
      rating: 4.9,
      reviews: 201,
      price: '$220/hr',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop',
      portfolio: ['url1', 'url2', 'url3']
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Michael & Emily',
      role: 'Wedding Clients',
      content: 'Our wedding photos are absolutely stunning! The photographer captured every special moment perfectly.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Restaurant Owner',
      role: 'Business Client',
      content: 'The food photography increased our online orders by 40%! Absolutely worth the investment.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Fashion Brand',
      role: 'Commercial Client',
      content: 'Our product photos look professional and have significantly boosted our conversion rates.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop'
    }
  ];

  const stats = [
    { value: '5,000+', label: 'Happy Clients' },
    { value: '1,200+', label: 'Professional Photographers' },
    { value: '50,000+', label: 'Photos Taken' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  // Animation controls
  const nextSlide = () => {
    controls.start({
      x: '-100%',
      transition: { duration: 0.5 }
    }).then(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      controls.set({ x: '100%' });
      controls.start({
        x: 0,
        transition: { duration: 0.5 }
      });
    });
  };

  const prevSlide = () => {
    controls.start({
      x: '100%',
      transition: { duration: 0.5 }
    }).then(() => {
      setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      controls.set({ x: '-100%' });
      controls.start({
        x: 0,
        transition: { duration: 0.5 }
      });
    });
  };

  const toggleBookmark = (id) => {
    setIsBookmarked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-black"
          >
            <img
              src={slides[activeSlide].image}
              alt="Background"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {slides[activeSlide].title}
            </h1>
            <p className="text-xl text-gray-200 mb-8">{slides[activeSlide].subtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search photographers, locations, styles..."
                  className="w-full pl-12 pr-6 py-4 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Search <FiArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${activeSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>

        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors z-10"
        >
          <FiChevronRight className="transform rotate-180" size={24} />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors z-10"
        >
          <FiChevronRight size={24} />
        </motion.button>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <RiCameraLensFill className="text-purple-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">About PoshPic</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover a world of talented photographers ready to turn your special occasions into timeless memories. Whether it's a wedding, engagement, family reunion, or a personal photoshoot, PoshPic connects you with skilled photographers who specialize in various styles and genres.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 p-4 rounded-xl text-center"
                >
                  <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1522206024047-9c925421675b?q=80&w=1887&auto=format&fit=crop"
              alt="Photographer at work"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white text-lg">"Capturing moments that last a lifetime"</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Photography Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of photography services tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setIsHovered(category.id)}
                onHoverEnd={() => setIsHovered(null)}
                className="relative group rounded-2xl overflow-hidden shadow-lg h-96 cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <AnimatePresence>
                    {isHovered === category.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-200 text-sm mb-4"
                      >
                        {category.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="self-start bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-colors text-sm"
                  >
                    Explore <FiArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photographers Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Photographers</h2>
                <p className="text-lg text-gray-600">Browse our top-rated professionals</p>
              </div>
              <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
                {['trending', 'wedding', 'portrait', 'commercial'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {photographers.map((photographer) => (
              <motion.div
                key={photographer.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={photographer.image}
                    alt={photographer.name}
                    className="w-full h-48 object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleBookmark(photographer.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md"
                  >
                    <FiHeart
                      className={isBookmarked[photographer.id] ? 'text-red-500 fill-current' : 'text-gray-600'}
                      size={20}
                    />
                  </motion.button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{photographer.name}</h3>
                      <p className="text-gray-600 text-sm">{photographer.specialty}</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {photographer.price}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center">
                    <div className="flex mr-2">
                      {renderStars(photographer.rating)}
                    </div>
                    <span className="text-gray-500 text-sm">
                      ({photographer.reviews} reviews)
                    </span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      View Portfolio
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-600 hover:text-purple-600 rounded-lg border border-gray-200 hover:border-purple-600"
                    >
                      <FiShare2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to book your perfect photographer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiSearch size={32} className="text-purple-600" />,
                title: "Search & Discover",
                description: "Browse our curated selection of professional photographers and their portfolios"
              },
              {
                icon: <FiClock size={32} className="text-purple-600" />,
                title: "Book a Session",
                description: "Select your preferred date, time, and package with just a few clicks"
              },
              {
                icon: <RiCameraLensFill size={32} className="text-purple-600" />,
                title: "Capture Memories",
                description: "Enjoy your photoshoot and receive high-quality edited photos"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="mt-4 text-purple-600 font-medium">
                  Step {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from people who've experienced our photography services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

 
      {/* FAQ Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How do I book a photographer?",
                answer: "Simply search for photographers in your area, view their portfolios, and book directly through our platform."
              },
              {
                question: "What if I need to reschedule my session?",
                answer: "You can reschedule up to 48 hours before your session through your account dashboard."
              },
              {
                question: "How long does it take to receive my photos?",
                answer: "Most photographers deliver edited photos within 7-14 days after the session."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and in some cases, direct bank transfers."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 sm:p-12 text-center">
            <RiCustomerService2Fill className="mx-auto text-purple-600" size={48} />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6 mb-4">
              Need help choosing the right photographer?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Our photography consultants are here to help you find the perfect match for your needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              Contact Our Team <FiArrowRight />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumHomePage;