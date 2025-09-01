'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const navItems = [
  { 
    name: 'Contact Us', 
    href: 'https://calendly.com/noah-barbaros/introductory-chat',
    isExternal: true 
  },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/5 backdrop-blur-3xl border-b border-white/10 shadow-lg' 
          : 'bg-white/2 backdrop-blur-xl border-b border-gray-200/30 shadow-sm'
      }`}
      style={{
        backdropFilter: scrolled 
          ? 'blur(20px) saturate(180%)' 
          : 'blur(10px) saturate(150%)',
        WebkitBackdropFilter: scrolled 
          ? 'blur(20px) saturate(180%)' 
          : 'blur(10px) saturate(150%)'
      }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center h-16">
            <Image
              src="/logo-new.png"
              alt="Antifragility Labs Logo"
              width={140}
              height={40}
              priority
            />
          </Link>
          
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              item.isExternal ? (
                <button
                  key={item.name}
                  onClick={() => {
                                    try {
                  if (typeof window !== 'undefined' && window.Calendly) {
                    window.Calendly.initPopupWidget({url: item.href});
                  } else {
                    window.open(item.href, '_blank');
                  }
                } catch (error) {
                  window.open(item.href, '_blank');
                }
                  }}
                  className={`${inter.className} text-white px-6 py-2 rounded-full font-medium transition-all hover:opacity-90`}
                  style={{backgroundColor: '#1d40b0'}}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${inter.className} text-white px-6 py-2 rounded-full font-medium transition-all hover:opacity-90`}
                  style={{backgroundColor: '#1d40b0'}}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 