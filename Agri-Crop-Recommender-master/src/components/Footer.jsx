import React from 'react';
import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-white tracking-tight">AgriSmart</span>
          </div>
          <p className="text-gray-400 max-w-sm">
            Empowering farmers with AI-driven crop recommendations. Optimize your yield with data-backed insights for a sustainable future.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Project</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © 2024 AgriSmart AI. All rights reserved.
        </p>
        <div className="flex gap-6 text-gray-500 text-sm">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
