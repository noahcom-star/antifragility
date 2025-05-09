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
                We blend Generative Engine Optimization (GEO) and Search Engine Optimization (SEO) to build growth systems that scale with you — and the AI era.
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
      <section id="geo-seo-section" className="relative w-full bg-white py-20 md:py-28 mt-20 md:mt-32 mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Antifragility Labs: GEO + SEO for the AI Era
        </h2>
        <p className="text-gray-500 mb-12 text-lg md:text-xl text-center max-w-4xl mx-auto">
          We don't just optimize for Google—we optimize for every search platform, human and AI. Our unique approach blends Generative Engine Optimization (GEO) and Search Engine Optimization (SEO) to maximize your visibility, trust, and growth in both traditional and generative search. 
          <br className="hidden md:block" />
          <span className="font-semibold text-blue-600">Double your discovery. Future-proof your brand.</span>
        </p>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex flex-row gap-8 md:gap-16 min-w-[900px] md:min-w-[1200px] px-6 md:px-16">
            {/* GEO + SEO, Unified */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="card-wipe group flex-shrink-0 w-[320px] md:w-[400px] relative rounded-3xl overflow-hidden shadow-lg border border-blue-100 px-8 py-12 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-3xl text-blue-500">🌐</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">GEO + SEO, Unified</h3>
                <p className="text-gray-600 text-base">We optimize for both LLMs and search engines, so you're found by humans and AI alike—on Google, ChatGPT, Gemini, and beyond.</p>
              </div>
            </motion.div>
            {/* AI-First Content & Trust */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-wipe group flex-shrink-0 w-[320px] md:w-[400px] relative rounded-3xl overflow-hidden shadow-lg border border-blue-100 px-8 py-12 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-purple-100" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-3xl text-blue-500">🤖</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-First Content & Trust</h3>
                <p className="text-gray-600 text-base">We structure and enhance your content for AI comprehension, citation, and trust—so you're recommended by the next generation of search.</p>
              </div>
            </motion.div>
            {/* Compounding Growth */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="card-wipe group flex-shrink-0 w-[320px] md:w-[400px] relative rounded-3xl overflow-hidden shadow-lg border border-blue-100 px-8 py-12 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-100" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-3xl text-blue-500">🚀</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Compounding Growth</h3>
                <p className="text-gray-600 text-base">Our systems adapt and improve over time, compounding your results and keeping you ahead of every search trend—human or AI.</p>
              </div>
            </motion.div>
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
        {(() => {
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
          const [current, setCurrent] = useState(0);
          const [direction, setDirection] = useState(0);
          const go = (i: number) => {
            setDirection(i);
            setCurrent((current + i + stats.length) % stats.length);
          };
          return (
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
              <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 shadow-lg z-20 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
              <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 shadow-lg z-20 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {stats.map((_, i: number) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white' : 'bg-white/40'}`}></button>
                ))}
              </div>
            </div>
          );
        })()}
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

      {/* FAQ Accordion Section */}
      <section id="faqs" className="w-full bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
          <FAQAccordion />
            </div>
          </section>

      {/* 2nd CTA Section */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-purple-100 py-16 px-4 flex flex-col items-center justify-center">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">Let's build your GEO moat before your competitors do.</h3>
        <a
          href="https://calendly.com/noah-barbaros/introductory-chat?"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-lg shadow-lg hover:opacity-90 transition-all mb-2"
        >
          Book Your Free GEO & SEO Audit
        </a>
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