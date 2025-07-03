import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="bg-[#2762eb] px-8 flex flex-col items-center justify-center" style={{ minHeight: '120px' }}>
        <div className="flex flex-col items-center" style={{ lineHeight: 1 }}>
          <img src="/logos/logo-white-v2.png" alt="Antifragility Labs" className="h-32" style={{ marginBottom: '-16px' }} />
          <div className="text-base text-white mb-1 text-center" style={{ marginTop: '-8px' }}>Helping you rank for both search engines and AI alike.</div>
        </div>
        <div className="flex space-x-2 mb-0.5 mt-1">
        <a
            href="https://www.linkedin.com/company/antifragility-labs/"
          target="_blank"
          rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#2762eb] hover:bg-blue-700 transition border border-white"
        >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
          </svg>
        </a>
      </div>
      </div>
      <div className="bg-[#2762eb] px-8 py-1 text-xs text-white w-full border-t border-white/20 text-center">
        © 2025 Antifragility Labs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 