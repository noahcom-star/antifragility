'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Inter } from 'next/font/google';
import Navigation from './Navigation';
import Image from 'next/image';
import FAQAccordion from './FAQAccordion';

const inter = Inter({ subsets: ['latin'] });

const searchQueries = [
  "How do I rank on LLMs like Gemini and ChatGPT?",
  "What's the modern SEO strategy for 2025?",
  "How do I get found by generative engines?"
];

const TYPING_SPEED = 75;
const DELETE_SPEED = 50;
const PAUSE_DURATION = 3000;
const PAUSE_BEFORE_DELETE = 2000;

const logos = [
  { src: '/logos/openai.png', alt: 'OpenAI', className: 'h-[35px]' },
  { src: '/logos/google.png', alt: 'Google', className: 'h-[30px]' },
  { src: '/logos/bing.png', alt: 'Bing', className: 'h-[65px]' },
  { src: '/logos/claude.png', alt: 'Claude', className: 'h-[35px]' },
  { src: '/logos/gemini.png', alt: 'Gemini', className: 'h-[55px]' },
  { src: '/logos/meta.png', alt: 'Meta', className: 'h-[60px]' },
];

export default function Hero() {
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPositioning, setShowPositioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showNextSection, setShowNextSection] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  
  const { scrollY } = useScroll();
  const searchBarOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const searchBarScale = useTransform(scrollY, [0, 200], [0.8, 1]);
  const contentOpacity = useTransform(scrollY, [0, 200, 400], [1, 0, 0]);
  const rankingOpacity = useTransform(scrollY, [0, 100, 300], [1, 0.5, 0]);
  const rankingY = useTransform(scrollY, [0, 300], [0, 50]);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const stats = [
    {
      image: '/banners/ctr-drop.png',
      title: <><span className="text-blue-300">34.5%</span> CTR Drop with AI Overviews</>,
      desc: 'In a 2025 analysis of 300,000 keywords, AI Overviews correlate with a 34.5% drop in average CTR for the #1 result compared to similar queries without Overviews.',
      source: {
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7318665460118376448/',
        label: 'View Research',
      },
      bg: 'bg-gradient-to-br from-blue-900 via-blue-800 to-black',
    },
    {
      image: '/banners/chatgpt-users.png',
      title: <><span className="text-blue-300">27%</span> Users Ditch Google for ChatGPT</>,
      desc: 'More than a quarter of Americans (27%) report using AI chatbots like ChatGPT instead of traditional search engines. Consumers are shifting to conversational AI for instant answers.',
      source: {
        url: 'https://www.tomsguide.com/ai/new-study-reveals-people-are-ditching-google-for-the-likes-of-chatgpt-search-heres-why',
        label: 'View Research',
      },
      bg: 'bg-gradient-to-br from-purple-900 via-purple-800 to-black',
    },
    {
      image: '/banners/ai-overviews.png',
      title: <>AI Overviews Cover <span className="text-blue-300">87%</span><br />of Google Searches</>,
      desc: "AI Overviews dominate: Google's new Search Generative Experience (SGE) is everywhere in its test phase – appearing for ~87% of all queries when enabled.",
      source: {
        url: 'https://seo.ai/blog/search-generative-experience-sge-statistics',
        label: 'View Research',
      },
      bg: 'bg-gradient-to-br from-blue-800 via-purple-800 to-black',
    },
  ];

  const typeText = useCallback(async (text: string) => {
    if (!isTyping) return;
    
    const typeNextChar = (currentText: string, targetText: string) => {
      if (!isTyping) return;
      
      if (currentText.length < targetText.length) {
        setCurrentQuery(targetText.slice(0, currentText.length + 1));
        typingTimeoutRef.current = setTimeout(() => {
          typeNextChar(currentText + targetText[currentText.length], targetText);
        }, TYPING_SPEED);
      } else {
        setIsPaused(true);
        typingTimeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          startDeleting(targetText);
        }, PAUSE_DURATION);
      }
    };

    const startDeleting = (text: string) => {
      if (!isTyping) return;
      setIsDeleting(true);

      const deleteNextChar = (currentText: string) => {
        if (!isTyping) return;
        
        if (currentText.length > 0) {
          setCurrentQuery(currentText.slice(0, -1));
          typingTimeoutRef.current = setTimeout(() => {
            deleteNextChar(currentText.slice(0, -1));
          }, DELETE_SPEED);
        } else {
          setIsDeleting(false);
          typingTimeoutRef.current = setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % searchQueries.length);
          }, 500);
        }
      };

      setTimeout(() => {
        deleteNextChar(text);
      }, PAUSE_BEFORE_DELETE);
    };

    typeNextChar('', text);
  }, [isTyping]);

  useEffect(() => {
    setIsTyping(true);
    typeText(searchQueries[currentIndex]);
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setIsTyping(false);
    };
  }, [currentIndex, typeText]);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden" ref={containerRef}>
        <Navigation />
        
        {/* Background particles */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,black,rgba(0,0,0,0))]" />
        </div>

        <motion.div 
          style={{ opacity: contentOpacity }}
          className="container mx-auto px-4 pt-20 pb-4 relative z-10 min-h-screen flex flex-col"
        >
          <div className="flex-1 flex flex-col items-center text-center max-w-6xl mx-auto justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`${inter.className} text-5xl md:text-7xl font-bold text-gray-900 mb-3`}>
                Built to grow your traffic.<br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block leading-[1.2]">
                  On AI & search engines alike
                </span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl mb-6 max-w-4xl mx-auto">
                We blend Generative Engine Optimization (GEO)
                <br />
                and <span className="whitespace-nowrap">Search Engine Optimization (SEO).</span> to build growth systems that scale with you — and the AI era.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-4xl mx-auto mb-6"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200" />
                <div className="relative bg-white/80 backdrop-blur-sm p-5 border border-blue-100 shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-gray-800 text-lg md:text-xl min-h-[32px] font-mono">
                        {currentQuery}
                        <span className={`inline-block w-[2px] h-5 ml-0.5 bg-gray-800 ${isPaused ? 'opacity-0' : 'animate-blink'}`}></span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 text-center">
                    From intent to impact — on autopilot.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity shadow-lg text-lg"
                onClick={() => setShowBooking(true)}
              >
                Let's Talk
              </button>
              <button
                className="px-8 py-3 bg-white rounded-lg text-gray-800 font-semibold hover:bg-gray-50 transition-all border border-gray-200 shadow-md text-lg"
                onClick={() => {
                  const el = document.getElementById('geo-seo-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </button>
            </motion.div>

            {/* Rank on Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-gray-600 text-lg mb-6"
            >
              We help rank on:
            </motion.div>

            {/* Company Logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="w-full max-w-5xl mx-auto mb-2"
            >
              <div className="grid grid-cols-6 items-center justify-items-center gap-x-10">
                {logos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ 
                      duration: 0.6,
                      delay: 1.2 + (0.1 * index),
                      ease: "easeOut"
                    }}
                    className="flex items-center justify-center w-full"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={200}
                      height={200}
                      className={`object-contain w-auto ${logo.className} filter brightness-0 opacity-50 hover:opacity-100 transition-opacity`}
                      style={{ maxWidth: '100%' }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Down Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-2"
            >
              <div className="animate-bounce text-gray-400 text-2xl">↓</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search Transition */}
        <AnimatePresence>
          {showNextSection && !showNextSection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] z-50"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 blur-xl rounded-2xl" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-5 h-5 relative">
                        <div className="absolute inset-0 border-2 border-blue-600 rounded-full" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-600 rounded-full" />
                      </div>
                      <div className="text-gray-800 text-xl font-mono">
                        Searching for features
                        <span className="inline-flex ml-1">
                          <span className="animate-bounce delay-0">.</span>
                          <span className="animate-bounce delay-100">.</span>
                          <span className="animate-bounce delay-200">.</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-100 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-full animate-search-progress" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Antifragility Value Timeline Section (Horizontal Scroll) */}
      <section id="geo-seo-section" className="relative w-full py-20 md:py-28 mt-20 md:mt-32 mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Antifragility Labs: GEO + SEO for the AI Era
        </h2>
        <p className="text-gray-500 mb-12 text-lg md:text-xl text-center max-w-4xl mx-auto">
          We don't just optimize for Google—we optimize for every search platform, human and AI. Our<br />
          <span className="whitespace-nowrap">unique approach blends Generative Engine Optimization (GEO) and Search Engine Optimization (SEO).</span>
          <br className="hidden md:block" />
          <span className="font-semibold text-blue-600">Double your discovery. Future-proof your brand.</span>
        </p>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 px-6 md:px-16 justify-center">
            {/* GEO + SEO, Unified */}
            <div className="relative w-full h-[380px] md:h-[420px] rounded-3xl overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 flex flex-col justify-end">
              {/* Illustration: Google + AI Result, visually unified */}
              <svg className="absolute inset-0 w-full h-full object-cover" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Google Result */}
                <rect x="36" y="60" width="150" height="70" rx="10" fill="#fff" fillOpacity="0.97" />
                <rect x="50" y="80" width="90" height="14" rx="7" fill="#3b82f6" />
                <rect x="50" y="100" width="60" height="10" rx="5" fill="#22c55e" />
                <rect x="50" y="115" width="110" height="8" rx="4" fill="#a3a3a3" fillOpacity="0.3" />
                <rect x="50" y="127" width="80" height="8" rx="4" fill="#a3a3a3" fillOpacity="0.2" />
                {/* Divider */}
                <rect x="200" y="70" width="2" height="60" rx="1" fill="#a78bfa" fillOpacity="0.18" />
                {/* AI/LLM Result */}
                <rect x="234" y="60" width="150" height="70" rx="10" fill="#fff" fillOpacity="0.97" />
                <rect x="250" y="80" width="60" height="14" rx="7" fill="#a78bfa" />
                <rect x="315" y="80" width="30" height="14" rx="7" fill="#6366f1" fillOpacity="0.18" />
                <rect x="250" y="100" width="110" height="10" rx="5" fill="#6366f1" fillOpacity="0.12" />
                <rect x="250" y="115" width="80" height="8" rx="4" fill="#a3a3a3" fillOpacity="0.2" />
                {/* AI badge */}
                <rect x="355" y="65" width="28" height="18" rx="6" fill="#a78bfa" fillOpacity="0.18" />
                <text x="369" y="78" textAnchor="middle" fontSize="10" fill="#7c3aed" fontWeight="bold">AI</text>
                {/* Unified background */}
                <rect x="36" y="160" width="348" height="180" rx="18" fill="#e0e7ff" fillOpacity="0.22" />
              </svg>
              <div className="relative z-10 p-8 pt-32 flex flex-col items-center justify-end bg-gradient-to-t from-white/90 via-white/70 to-transparent">
                <span className="text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-3">Unified Approach</span>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">GEO + SEO, Unified</h3>
                <p className="text-gray-600 text-base">We optimize for both LLMs and search engines, so you're found by humans and AI alike—on Google, ChatGPT, Gemini, and beyond.</p>
              </div>
            </div>
            {/* AI-First Content & Trust */}
            <div className="relative w-full h-[380px] md:h-[420px] rounded-3xl overflow-hidden border border-purple-100 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex flex-col justify-end">
              {/* Improved Illustration: AI answer box with citation and trust badge */}
              <svg className="absolute inset-0 w-full h-full object-cover" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glow/gradient behind answer box */}
                <ellipse cx="210" cy="120" rx="120" ry="48" fill="#a78bfa" fillOpacity="0.12" />
                {/* Main AI answer box */}
                <rect x="70" y="70" width="280" height="80" rx="18" fill="#fff" fillOpacity="0.98" />
                {/* AI badge */}
                <rect x="90" y="85" width="38" height="20" rx="8" fill="#a78bfa" fillOpacity="0.18" />
                <text x="109" y="100" textAnchor="middle" fontSize="12" fill="#7c3aed" fontWeight="bold">AI</text>
                {/* Answer lines */}
                <rect x="140" y="90" width="140" height="14" rx="7" fill="#a78bfa" fillOpacity="0.18" />
                <rect x="140" y="110" width="110" height="10" rx="5" fill="#6366f1" fillOpacity="0.12" />
                {/* Citation badge */}
                <circle cx="320" cy="100" r="13" fill="#3b82f6" fillOpacity="0.18" />
                <text x="320" y="105" textAnchor="middle" fontSize="12" fill="#6366f1" fontWeight="bold">1</text>
                {/* Trust badge (shield with checkmark) */}
                <g>
                  <path d="M370 90 l10 8 v10 a12 12 0 0 1 -10 10 a12 12 0 0 1 -10 -10 v-10 z" fill="#a78bfa" fillOpacity="0.18" />
                  <path d="M370 104 l4 4 l-8-8" stroke="#6366f1" strokeWidth="2" fill="none" />
                </g>
                {/* Subtle background card for context */}
                <rect x="60" y="180" width="300" height="160" rx="18" fill="#ede9fe" fillOpacity="0.25" />
              </svg>
              <div className="relative z-10 p-8 pt-32 flex flex-col items-center justify-end bg-gradient-to-t from-white/90 via-white/70 to-transparent">
                <span className="text-xs font-bold uppercase tracking-widest bg-purple-100 text-purple-700 px-3 py-1 rounded-full mb-3">AI-First</span>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-First Content & Trust</h3>
                <p className="text-gray-600 text-base">We structure and enhance your content for AI comprehension, citation, and trust—so you're recommended by the next generation of search.</p>
              </div>
            </div>
            {/* Compounding Growth */}
            <div className="relative w-full h-[380px] md:h-[420px] rounded-3xl overflow-hidden border border-pink-100 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col justify-end">
              {/* Illustration: Growth Chart */}
              <svg className="absolute inset-0 w-full h-full object-cover" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="60" y="80" width="300" height="80" rx="16" fill="#fff" fillOpacity="0.95" />
                <path d="M90 150L170 110L250 170L330 90" stroke="#a78bfa" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="170" cy="110" r="8" fill="#6366f1" fillOpacity="0.18" />
                <circle cx="250" cy="170" r="8" fill="#6366f1" fillOpacity="0.18" />
                <circle cx="330" cy="90" r="8" fill="#3b82f6" fillOpacity="0.18" />
                <rect x="60" y="180" width="300" height="160" rx="18" fill="#f3e8ff" fillOpacity="0.25" />
              </svg>
              <div className="relative z-10 p-8 pt-32 flex flex-col items-center justify-end bg-gradient-to-t from-white/90 via-white/70 to-transparent">
                <span className="text-xs font-bold uppercase tracking-widest bg-pink-100 text-pink-700 px-3 py-1 rounded-full mb-3">Growth Engine</span>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Compounding Growth</h3>
                <p className="text-gray-600 text-base">Our systems adapt and improve over time, compounding your results and keeping you ahead of every search trend—human or AI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is GEO Section */}
      <section className="relative w-full py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        {/* Container */}
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What is GEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">(Generative Engine Optimization)</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The landscape of search and discovery is evolving. Here's how GEO is different.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Status Quo Side */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">The Status Quo</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Businesses are still optimizing for Google—stuffing keywords, chasing backlinks, and ranking for SERPs—while missing the fact that LLMs like ChatGPT and Claude are becoming the new interface for discovery.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-sm">1</span>
                    </div>
                    <p className="text-gray-600">Focus on traditional search engine rankings</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-sm">2</span>
                    </div>
                    <p className="text-gray-600">Keyword optimization and backlink building</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-sm">3</span>
                    </div>
                    <p className="text-gray-600">Technical SEO and metadata optimization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GEO Side */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Enter: GEO</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <p className="text-gray-700 text-lg leading-relaxed">
                  GEO is built for the AI era, optimizing content to be discovered, cited, and recommended by AI engines. It's about creating content that AI systems understand, trust, and prioritize in their responses.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-sm">1</span>
                    </div>
                    <p className="text-gray-600">Optimized for AI understanding and citation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-sm">2</span>
                    </div>
                    <p className="text-gray-600">Structured for LLM comprehension and recall</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-sm">3</span>
                    </div>
                    <p className="text-gray-600">Enhanced for AI-powered discovery systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setShowBooking(true)}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg font-bold rounded-lg shadow-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Book a Free Chat!
            </button>
          </div>
        </div>
      </section>

      {/* GEO + SEO Story Banner */}
      <div className="w-full overflow-x-hidden">
        <div className="w-full bg-gray-100 rounded-lg py-12 px-2 md:px-0 mb-24">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-gray-900 font-mono">
              Your all-in-one agency for ranking from search engines like Google, to AI like ChatGPT.
            </h2>
          </div>
        </div>
      </div>

      {/* Why Now Section - Swipeable Carousel */}
      <section className="relative w-full px-0 bg-black">
        <div className="relative w-full min-h-[480px] flex flex-col justify-center overflow-hidden py-20 md:py-28">
          {/* Full-bleed background image */}
          <Image
            src={stats[current].image}
            alt=""
            fill
            className="object-cover w-full h-full absolute inset-0 z-0"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70 z-10" />
          {/* Content */}
          <div className="relative z-20 w-full h-full flex flex-col justify-center items-start px-4 md:px-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg text-left leading-tight max-w-4xl">
              {stats[current].title}
            </h2>
            <div className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl drop-shadow-md text-left">
              {stats[current].desc}
            </div>
            <div className="mb-6">
              <a href={stats[current].source.url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-blue-200 underline hover:text-white transition-colors">
                {stats[current].source.label}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setShowBooking(true)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-lg transition-colors"
            >
              Contact us to learn more
            </button>
          </div>
          {/* Arrows */}
          <button onClick={() => {
            setDirection(-1);
            setCurrent((current + stats.length - 1) % stats.length);
          }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 shadow-lg z-20 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
          <button onClick={() => {
            setDirection(1);
            setCurrent((current + 1) % stats.length);
          }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 shadow-lg z-20 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {stats.map((_, i: number) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white' : 'bg-white/40'}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="w-full bg-white py-10 md:py-14 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6">
          <div className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Trusted by startups from:</div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-8 md:gap-14">
            <img src="/logos/yc.png" alt="Y Combinator" className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="/logos/cdl.png" alt="Creative Destruction Lab" className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="/logos/betaworks.png" alt="Betaworks" className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="/logos/loi.png" alt="League of Innovators" className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </section>

      {/* Why Antifragility Section */}
      <section id="why-antifragility" className="relative w-full py-28 px-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-hidden">
        {/* Abstract SVG background illustration */}
        <svg className="absolute left-1/2 top-0 -translate-x-1/2 opacity-20 w-[900px] h-[340px] pointer-events-none select-none" viewBox="0 0 900 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="450" cy="170" rx="420" ry="120" fill="url(#antifragile-gradient)" />
          <path d="M120 200 Q 450 60 780 200" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" fill="none"/>
          <path d="M200 120 Q 450 300 700 120" stroke="#a78bfa" strokeWidth="6" strokeLinecap="round" fill="none"/>
          <defs>
            <linearGradient id="antifragile-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#f3e8ff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative max-w-3xl mx-auto px-6">
          {/* Accent chip */}
          <div className="flex justify-center mb-6">
            <span className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-blue-200 rounded-full text-blue-700 font-semibold shadow-sm text-sm">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4v8m0 0l3-3m-3 3l-3-3" /></svg>
              Our Philosophy
            </span>
          </div>
          {/* Glassmorphic card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 px-8 py-14 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 leading-tight">Why Antifragility</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-normal">Most companies aim to be resilient — to survive shocks. We aim higher.</p>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-normal">Antifragile systems don't just survive stress — they get stronger because of it. That's the core of how we operate: every client project, failed test, or algorithm shift becomes a feedback loop. We learn. We adapt. We evolve.</p>
            <p className="text-lg md:text-xl text-blue-700 font-semibold leading-relaxed mt-10 underline decoration-blue-300 decoration-4">In an ecosystem as unpredictable as AI search, fragility breaks, resilience endures, but antifragility wins.</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faqs" className="w-full bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
          <FAQAccordion />
        </div>
      </section>

      {/* 2nd CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-24 mx-auto">
          {/* Left: Immersive Live Dashboard Mockup */}
          <div className="flex-1 w-full md:w-1/2 flex justify-center items-center mb-12 md:mb-0">
            <div className="relative group">
              {/* Glassmorphic background glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-white/0 rounded-3xl blur-2xl z-0" />
              <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-100 p-8 flex flex-col gap-6 items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-200/60" style={{boxShadow: '0 8px 40px 0 rgba(80,100,200,0.10)'}}>
                {/* Large Chart (shorter height) */}
                <div className="w-full h-36 md:h-44 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 420 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <path d="M20 110L80 40L140 80L200 20L260 80L320 30L400 90" stroke="#6366f1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="20,110 80,40 140,80 200,20 260,80 320,30 400,90" fill="url(#chart-gradient)" />
                    <circle cx="80" cy="40" r="10" fill="#6366f1" fillOpacity="0.18" />
                    <circle cx="200" cy="20" r="10" fill="#3b82f6" fillOpacity="0.18" />
                    <circle cx="320" cy="30" r="10" fill="#22c55e" fillOpacity="0.18" />
                    <circle cx="400" cy="90" r="10" fill="#a78bfa" fillOpacity="0.18" />
                  </svg>
                </div>
                <div className="mt-2 text-xs text-blue-500 font-mono bg-blue-50/60 px-3 py-1 rounded-full inline-block">Live Data</div>
                {/* Metric Cards */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-row gap-4 w-full">
                    {/* Revenue Card */}
                    <div className="flex-1 bg-white/90 rounded-xl p-4 shadow border border-blue-100 flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-500 mb-1">Revenue</span>
                      <span className="text-xl md:text-2xl font-bold text-blue-700 flex items-center gap-1">$8,420 <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l4 4 6-8" /></svg></span>
                      <span className="text-xs text-green-600 font-semibold mt-1">+12% this month</span>
                    </div>
                    {/* Leads Card */}
                    <div className="flex-1 bg-white/90 rounded-xl p-4 shadow border border-purple-100 flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-500 mb-1">Leads</span>
                      <span className="text-xl md:text-2xl font-bold text-purple-600 flex items-center gap-1">+127 <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l4 4 6-8" /></svg></span>
                      <span className="text-xs text-green-600 font-semibold mt-1">+8% this month</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 w-full">
                    {/* AI Citations Card */}
                    <div className="flex-1 bg-white/90 rounded-xl p-4 shadow border border-green-100 flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-500 mb-1">AI Citations</span>
                      <span className="text-xl md:text-2xl font-bold text-green-600 flex items-center gap-1">23 <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l4 4 6-8" /></svg></span>
                      <span className="text-xs text-green-600 font-semibold mt-1">+5 this week</span>
                    </div>
                    {/* Activity Card */}
                    <div className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-white rounded-xl p-4 shadow border border-blue-100 flex flex-col items-center justify-center">
                      <span className="text-xs font-semibold text-blue-700 mb-1">Status</span>
                      <span className="text-base font-bold text-blue-700 flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block"></span> Live</span>
                      <span className="text-xs text-blue-500 mt-1">AI picking up your content</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Text and CTA */}
          <div className="flex-1 w-full md:w-1/2 flex flex-col items-start justify-center md:pl-12">
            {/* Accent bar and icon */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" /></svg>
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">SEO & GEO that actually drives revenue.</h3>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-xl leading-relaxed">We don't just optimize for rankings—we build systems that deliver measurable growth, more leads, and real business results. Ready to see the impact?</p>
            <a
              href="https://calendly.com/noah-barbaros/introductory-chat?"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-12 py-6 bg-blue-700 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all mt-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="4"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              Book your free strategy call
            </a>
            <span className="mt-4 text-base text-gray-500">No sales pitch. Just actionable insights.</span>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
          <div
            className="absolute inset-0 bg-black/60" onClick={() => setShowBooking(false)}
            aria-label="Close booking modal background"
          />
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-0 overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh', width: '90vw' }}
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-gray-500 hover:text-gray-900 text-2xl font-bold px-2"
                  aria-label="Close booking modal"
                >
                  ×
                </button>
              </div>
              <iframe
                src="https://calendly.com/noah-barbaros/introductory-chat?"
                title="Book a Free Chat"
                className="w-full flex-1 min-h-[500px] md:min-h-[650px] border-0"
                allow="camera; microphone; fullscreen;"
                style={{ minHeight: '70vh' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add this at the top of your file with other styles */}
      <style jsx global>{`
        @keyframes search-progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-search-progress {
          animation: search-progress 2s ease-in-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
        @keyframes fadeinup {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeinup1 {
          animation: fadeinup 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s both;
        }
        .animate-fadeinup2 {
          animation: fadeinup 0.7s cubic-bezier(0.4,0,0.2,1) 0.4s both;
        }
        .animate-fadeinup3 {
          animation: fadeinup 0.7s cubic-bezier(0.4,0,0.2,1) 0.7s both;
        }
        @keyframes slidein {
          0% { opacity: 0; transform: translateY(32px) translateX(-32px); }
          100% { opacity: 1; transform: translateY(0) translateX(0); }
        }
        .animate-slidein {
          animation: slidein 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @media (max-width: 640px) {
          .calendly-modal {
            width: 100vw !important;
            max-width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
          }
        }
        .card-wipe::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%);
          opacity: 0;
          transform: scale(0.96);
          filter: blur(2px);
          transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1);
          pointer-events: none;
        }
        .card-wipe:hover::before {
          opacity: 1;
          transform: scale(1.04);
        }
        .card-wipe > * {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </>
  );
} 