import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Footer = () => {
  return (
    <footer 
      className="w-full relative" 
      style={{
        background: 'linear-gradient(135deg, #1d40b0 0%, #1e3a8a 100%)'
      }}
    >
      {/* Subtle top border for section separation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          {/* Left side - Empty for balance */}
          <div className="flex-1"></div>
          
          {/* Center - Logo and tagline */}
          <div className="flex flex-col items-center flex-1">
            <img 
              src="/logos/logo-white-v2.png" 
              alt="Antifragility Labs" 
              className="h-16 mb-6" 
              style={{
                transform: 'scale(2.5)',
                transformOrigin: 'center center'
              }}
            />
            <div className={`${inter.className} text-base font-light text-white/85 text-center`}>
              Helping you rank on both AI and search engines alike.
            </div>
          </div>
          
          {/* Right side - LinkedIn pill button */}
          <div className="flex-1 flex justify-end">
            <a
              href="https://www.linkedin.com/company/antifragility-labs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-200 group"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
              </svg>
              <span className={`${inter.className} text-sm text-white/90 group-hover:text-white transition-colors`}>
                Follow us on LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Separator line */}
      <div className="border-t border-white/20"></div>
      
      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-8 py-3">
        <div className={`${inter.className} text-center text-sm text-white/70`}>
          © 2025 Antifragility Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 