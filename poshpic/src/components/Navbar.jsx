import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiSearch, FiArrowRight } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userProfile } from '../Redux/authAction';
import { selectUserProfile } from '../Redux/authSlice';

const LandingPageNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfileData = useSelector(selectUserProfile);
  const authToken = localStorage.getItem('authtoken');

  useEffect(() => {
    if (authToken) {
      dispatch(userProfile());
    }
  }, [authToken, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const goToProfile = () => {
    if (userProfileData?.PhotographerData) {
      navigate('/photographeruserprofile');
    } else {
      navigate('/userprofile');
    }
  };

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Photographers', path: '/photographers' },
    { name: 'Gallery', path: '/posts' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    ...(userProfileData?.username === 'admin' ? [{ name: 'Admin', path: '/viewphotographer' }] : []),
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl py-2' : 'bg-transparent backdrop-blur-none py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                scrolled ? 'bg-purple-600' : 'bg-white'
              }`}>
                <RiFlashlightFill className={scrolled ? 'text-white' : 'text-purple-600'} size={20} />
              </div>
              <span className={`text-2xl font-bold transition-all ${
                scrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'
              }`}>
                PoshPic
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                      scrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <motion.span
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                        scrolled ? 'bg-purple-600' : 'bg-white'
                      }`}
                    />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-colors ${
                  scrolled ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/20 text-white'
                }`}
                onClick={() => setSearchOpen(true)}
              >
                <FiSearch size={20} />
              </motion.button>

              {authToken ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full transition-colors relative ${
                      scrolled ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/20 text-white'
                    }`}
                  >
                    <IoMdNotificationsOutline size={22} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </motion.button>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    onClick={goToProfile}
                  >
                    <Avatar
                      src={userProfileData?.profile_pic || '/default-avatar.jpg'}
                      sx={{
                        width: 36,
                        height: 36,
                        border: `2px solid ${scrolled ? 'rgba(124, 58, 237, 0.3)' : 'rgba(255, 255, 255, 0.3)'}`,
                        '&:hover': {
                          borderColor: scrolled ? 'rgba(124, 58, 237, 0.8)' : 'rgba(255, 255, 255, 0.8)'
                        }
                      }}
                    />
                  </motion.div>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 ${
                    scrolled
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-white text-purple-600 hover:bg-gray-100'
                  }`}
                  onClick={() => navigate('/register')}
                >
                  Sign Up <FiArrowRight size={16} />
                </motion.button>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-colors ${
                  scrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/20 text-white'
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className={`px-4 pt-2 pb-8 space-y-2 ${
                scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-black/80 backdrop-blur-lg'
              }`}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="px-3 py-2 rounded-md hover:bg-white/10"
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                  >
                    <div className={`flex items-center space-x-3 ${
                      scrolled ? 'text-gray-700' : 'text-white'
                    }`}>
                      <span>{item.name}</span>
                    </div>
                  </motion.div>
                ))}

                {authToken ? (
                  <div className="border-t border-white/20 pt-4 mt-2">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 px-3 py-2 text-red-400 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </motion.div>
                  </div>
                ) : (
                  <div className="pt-4 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-full font-medium flex items-center justify-center gap-2"
                      onClick={() => {
                        navigate('/register');
                        setIsOpen(false);
                      }}
                    >
                      Sign Up <FiArrowRight size={16} />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search photographers, locations, styles..."
                  className="w-full py-5 px-6 rounded-xl shadow-2xl border-0 focus:ring-2 focus:ring-purple-500 text-lg bg-white/95 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                  <FiSearch size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!scrolled && (
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-xl flex items-center justify-center text-white"
            onClick={() => setSearchOpen(true)}
          >
            <FiSearch size={24} />
          </motion.button>
        </div>
      )}
    </>
  );
};

export default LandingPageNavbar;