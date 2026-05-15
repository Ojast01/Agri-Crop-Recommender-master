import React, { useState } from 'react';
import { Leaf, Sun, Moon, Languages, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ currentLang, setLang, theme, toggleTheme, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-4 md:px-6 py-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Leaf className="w-5 md:h-6 md:w-6 text-dark" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight">AgriSmart</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-6 mr-6 border-r border-white/10 pr-6">
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">{t.home}</a>
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">{t.about}</a>
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">{t.contact}</a>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="p-2 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2 text-sm">
                <Languages className="w-4 h-4" />
                <span className="uppercase font-bold">{currentLang}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-32 glass-card rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLang(lang.code)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${currentLang === lang.code ? 'bg-primary text-dark' : 'hover:bg-white/5'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="btn-primary py-2 px-4 text-sm whitespace-nowrap">{t.getStarted}</button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
           <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-white/5 rounded-xl text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-4 glass-card rounded-2xl p-4 flex flex-col gap-4"
          >
            <a href="#" className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors">{t.home}</a>
            <a href="#" className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors">{t.about}</a>
            <a href="#" className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors">{t.contact}</a>
            <div className="h-px bg-white/10 mx-4" />
            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-medium">Language</span>
              <div className="flex gap-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLang(lang.code)}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors ${currentLang === lang.code ? 'bg-primary text-dark font-bold' : 'bg-white/5'}`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn-primary w-full py-3 mt-2">{t.getStarted}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
