'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: 'Why Us?', href: '#why-us' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Contact Us', href: '#contact' },
];

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
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
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 