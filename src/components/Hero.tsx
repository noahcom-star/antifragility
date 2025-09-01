'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Inter } from 'next/font/google';
import Navigation from './Navigation';
import Image from 'next/image';
import FAQAccordion from './FAQAccordion';

const inter = Inter({ subsets: ['latin'] });

// Logo Carousel Component
const LogoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const logos = [
    { src: '/footerlogos/openai.png', alt: 'OpenAI' },
    { src: '/footerlogos/google.png', alt: 'Google' },
    { src: '/footerlogos/gemini.png', alt: 'Gemini' },
    { src: '/footerlogos/perplexity.png', alt: 'Perplexity' },
    { src: '/footerlogos/claude.png', alt: 'Claude' },
    { src: '/footerlogos/bing.png', alt: 'Bing' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2000); // 2 seconds per logo

    return () => clearInterval(interval);
  }, [logos.length]);

  // Determine animation direction based on logo
  const getAnimationProps = (index: number) => {
    const isOpenAI = logos[index].alt === 'OpenAI';
    return {
      initial: { 
        opacity: 0, 
        y: isOpenAI ? -40 : 40 // OpenAI comes from top, others from bottom
      },
      animate: { 
        opacity: 1, 
        y: 0 
      },
      exit: { 
        opacity: 0, 
        y: isOpenAI ? 40 : -40 // OpenAI exits to bottom, others to top
      }
    };
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          {...getAnimationProps(currentIndex)}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full flex items-center justify-center"
        >
          <img 
            src={logos[currentIndex].src} 
            alt={logos[currentIndex].alt} 
            className="object-contain filter brightness-0 w-[300px] h-[300px]"
            style={{ transform: 'skewX(-10deg)' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const searchQueries = [
  "How do I get cited by LLMs like Gemini and ChatGPT?",
  "How do I rank in Google's AI Overviews & AI Mode?",
  "How can I show up in AI answers?"
];

const TYPING_SPEED = 75;
const DELETE_SPEED = 50;
const PAUSE_DURATION = 3000;
const PAUSE_BEFORE_DELETE = 2000;

const logos = [
  { src: '/logos/openai.png', alt: 'OpenAI', className: 'h-16 md:h-24 lg:h-[350px]' },
  { src: '/logos/google.png', alt: 'Google', className: 'h-14 md:h-20 lg:h-[300px] ml-2' },
  { src: '/logos/bing.png', alt: 'Bing', className: 'h-20 md:h-32 lg:h-[900px]' },
  { src: '/logos/claude.png', alt: 'Claude', className: 'h-16 md:h-28 lg:h-[700px]' },
  { src: '/logos/gemini.png', alt: 'Gemini', className: 'h-16 md:h-24 lg:h-[800px] -mt-3' },
  { src: '/logos/perplexity.png', alt: 'Perplexity', className: 'h-20 md:h-32 lg:h-[1000px]' },
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
  


  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [currentService, setCurrentService] = useState(0);

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
      bg: 'bg-gradient-to-br from-blue-900 via-blue-800 to-black',
    },
    {
      image: '/banners/ai-overviews.png',
      title: <>AI Overviews Cover <span className="text-blue-300">87%</span><br />of Google Searches</>,
      desc: "AI Overviews dominate: Google's new Search Generative Experience (SGE) is everywhere in its test phase – appearing for ~87% of all queries when enabled.",
      source: {
        url: 'https://seo.ai/blog/search-generative-experience-sge-statistics',
        label: 'View Research',
      },
      bg: 'bg-gradient-to-br from-blue-800 via-blue-900 to-black',
    },
  ];

  const services = [
    {
      title: "Your All-in-One Solution for Search",
      description: "Antifragility Labs is a full-service agency that ranks you in both search engines and AI results for the cost of one. Traditional SEO isn’t enough anymore—the future of search is AI. That’s why you need GEO, our area of expertise.",
      features: [],
      icon: '<svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
      iconBg: "bg-blue-50",
      numberBg: "bg-blue-100",
      numberText: "text-blue-700",
      featureBg: "bg-blue-50",
      featureText: "text-blue-700",
      imagePlaceholder: "SEO vs GEO Comparison",
      imageDescription: "Side-by-side comparison of traditional Google search and AI-powered results",
      // imageSrc: "/screenshots/seo-geo-comparison.png" // Add this when you have the image
    },
    {
      title: "Weekly Updates",
      description: "Your trust is our highest priority, that's why we provide regular optimization cycles with performance reports and continuous improvements across all search platforms.",
      features: [],
      icon: '<svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      iconBg: "bg-green-50",
      numberBg: "bg-green-100",
      numberText: "text-green-700",
      featureBg: "bg-green-50",
      featureText: "text-green-700",
      imagePlaceholder: "Weekly Update Email",
      imageDescription: "Screenshot of detailed performance and ranking report",
      // imageSrc: "/screenshots/weekly-update.png" // Add this when you have the image
    },
    {
      title: "Prompt Handoff",
      description: "We wish you continued success. Once our work is done we provide you with a complete transition that contains optimized prompts and strategies for your team to scale across all search platforms.",
              features: [],
      icon: '<svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>',
      iconBg: "bg-orange-50",
      numberBg: "bg-orange-100",
      numberText: "text-orange-700",
      featureBg: "bg-orange-50",
      featureText: "text-orange-700",
      imagePlaceholder: "Handoff Documentation",
      imageDescription: "Screenshot of comprehensive strategy handoff materials",
      // imageSrc: "/screenshots/handoff-docs.png" // Add this when you have the image
    }
  ];

  const handleNextService = () => {
    setCurrentService((prev) => (prev + 1) % services.length);
  };

  const handlePrevService = () => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length);
  };

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

  // Auto-play services carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 12000); // Change service every 12 seconds (slower pace for better readability)

    return () => clearInterval(interval);
  }, [services.length]);

  // Auto-play stats carousel with longer delay
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % stats.length);
    }, 15000); // Change stats every 15 seconds (longer for better reading)

    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden" ref={containerRef}>
        <Navigation />
        
        {/* Background particles */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,black,rgba(0,0,0,0))]" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-4 relative z-10 min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col items-center text-center max-w-6xl mx-auto justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`${inter.className} text-5xl md:text-7xl text-gray-900 mb-2`}>
                <span className="font-light">Built to grow your traffic.</span><br />
                <span className="text-blue-800 font-medium block leading-[1.2]">
                  On AI & search engines alike
                </span>
              </h1>

              <p className="text-gray-500 text-lg md:text-xl mb-8 max-w-4xl mx-auto font-light">
                We blend Generative Engine Optimization and Search Engine Optimization to build growth systems that scale with you — and the AI era.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-4xl mx-auto mb-4"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-blue-100" />
                <div className="relative bg-white/80 backdrop-blur-sm p-5 border border-blue-200 shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-gray-800 text-lg md:text-xl min-h-[32px] font-mono text-center">
                        {currentQuery}
                        <span className={`inline-block w-[2px] h-5 ml-0.5 bg-gray-800 ${isPaused ? 'opacity-0' : 'animate-blink'}`}></span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <button
                className="px-8 py-3 rounded-lg text-white font-semibold transition-colors shadow-lg text-lg hover:opacity-90"
                style={{backgroundColor: '#1d40b0'}}
                onClick={() => {
                  try {
                    if (typeof window !== 'undefined' && window.Calendly) {
                      window.Calendly.initPopupWidget({url: 'https://calendly.com/noah-barbaros/introductory-chat'});
                    } else {
                      window.open('https://calendly.com/noah-barbaros/introductory-chat', '_blank');
                    }
                  } catch (error) {
                    window.open('https://calendly.com/noah-barbaros/introductory-chat', '_blank');
                  }
                }}
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
              className="text-gray-600 text-lg mb-8"
            >
              We help rank on:
            </motion.div>

            {/* Company Logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="w-full max-w-5xl mx-auto mb-10"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-x-4 md:gap-x-8 lg:gap-x-24 gap-y-4">
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
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`object-contain filter brightness-0 opacity-50 hover:opacity-100 transition-opacity ${logo.className}`}
                      style={{ 
                        height: '80px',
                        width: '120px',
                        display: 'block',
                        objectFit: 'contain'
                      }}
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
              className="-mt-4"
            >
              <div className="animate-bounce text-2xl text-gray-600">↓</div>
            </motion.div>
          </div>
        </div>

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
                <div className="absolute inset-0 bg-blue-100 blur-xl rounded-2xl" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg">
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
                                            <div className="h-full bg-blue-800 w-full animate-search-progress" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* How We Work Section */}
      <section id="geo-seo-section" className="relative w-full py-20 md:py-32 mt-20 md:mt-32 mb-8 md:mb-12">
        <div className="relative z-10">
          <div className="text-center mb-4">
            <span className="text-sm font-light text-gray-500 uppercase tracking-widest">HERE'S WHAT WE DO</span>
          </div>
          <h2 className={`${inter.className} text-3xl md:text-4xl font-light text-gray-900 mb-4 text-center`}>
            Get your business discoverable, everywhere.
          </h2>
          <p className="text-gray-400 mb-16 text-lg md:text-xl text-center max-w-3xl mx-auto font-light">
          Your marketing solutions should work for you. We help drive more revenue through SEO and GEO.
          </p>
          
          {/* Services Carousel */}
          <div className="relative max-w-6xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-xl">
              
                            {/* Service Cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 min-h-[500px] items-center"
                >
                  {/* Left Side - Visual Mockup */}
                  <div className="order-2 lg:order-1">
                    <div className="relative rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden aspect-[4/3]">
                      {/* Service-specific visual mockup */}
                                            {currentService === 0 && (
                        // Creative Logo Showcase - Scaled Up
                        <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 p-4 flex flex-col justify-center items-center">
                          {/* Central Hub Design - Much Larger */}
                          <div className="relative w-80 h-80 flex items-center justify-center">
                            {/* Center circle - Antifragility Labs Logo */}
                            <div className="w-32 h-32 rounded-full shadow-xl flex items-center justify-center border-3 border-blue-200 z-10" style={{backgroundColor: '#1d40b0'}}>
                              <img src="/Orbit/antifragility.png" alt="Antifragility Labs" className="object-contain w-20 h-20" />
                            </div>
                            
                            {/* Orbiting logos - Much larger and further apart */}
                                                                                    <div className="absolute top-0 left-[50%] transform -translate-x-1/2">
                              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:shadow-xl transition-shadow">
                                <img src="/Orbit/Google.png" alt="Google" className="object-contain w-9 h-9" />
                              </div>
                            </div>
                            
                            <div className="absolute top-[50%] right-0 transform -translate-y-1/2">
                              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:shadow-xl transition-shadow">
                                <Image src="/Orbit/Bing.png" alt="Bing" width={52} height={52} className="object-contain" />
                          </div>
                          </div>
                            
                            <div className="absolute bottom-0 left-[50%] transform -translate-x-1/2">
                              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:shadow-xl transition-shadow">
                                <Image src="/Orbit/openai.png" alt="ChatGPT" width={42} height={42} className="object-contain" />
                          </div>
                        </div>
                            
                            <div className="absolute top-[50%] left-0 transform -translate-y-1/2">
                              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:shadow-xl transition-shadow">
                                <Image src="/Orbit/claude.png" alt="Claude" width={40} height={40} className="object-contain" />
                      </div>
                    </div>
                            
                            {/* Diagonal positions - Same size now */}
                            <div className="absolute top-6 right-6">
                              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:shadow-xl transition-shadow">
                                <Image src="/Orbit/Gemini.png" alt="Gemini" width={42} height={42} className="object-contain" />
                  </div>
                  </div>
                  
                            <div className="absolute bottom-6 left-6">
                              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:shadow-xl transition-shadow">
                                <Image src="/Orbit/perplexity.png" alt="Perplexity" width={48} height={48} className="object-contain" />
                              </div>
                            </div>
                            
                            {/* Connection lines - Clean circles without dashes */}
                            <div className="absolute inset-0 pointer-events-none">
                              <svg className="w-full h-full" viewBox="0 0 320 320">
                                <circle cx="160" cy="160" r="140" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.2"/>
                                <circle cx="160" cy="160" r="100" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.15"/>
                                <circle cx="160" cy="160" r="70" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.1"/>
                              </svg>
                            </div>
                          </div>
                          
                          {/* Minimal text */}
                          <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600 font-light">Complete optimization across all platforms</p>
                      </div>
                        </div>
                      )}
                      
                                            {currentService === 1 && (
                        // Gmail Screenshot Mockup
                        <div className="h-full bg-gray-100">
                          {/* Gmail Interface */}
                          <div className="bg-white h-full">
                            {/* Gmail Header */}
                            <div className="bg-white border-b border-gray-200 p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819c.904 0 1.636.732 1.636 1.636z"/>
                                  </svg>
                                  <span className="text-sm font-medium text-gray-900">Gmail</span>
                      </div>
                      </div>
                    </div>
                            
                            {/* Email */}
                            <div className="p-4">
                              {/* Email Header */}
                              <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h2 className="text-lg font-semibold text-gray-900">Weekly SEO/GEO Performance Report</h2>
                                  <span className="text-xs text-gray-500">Jan 15, 2024</span>
                  </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                    AF
                                  </div>
                                  <span>from: noah@antifragility.co</span>
                </div>
                </div>
                
                              {/* Email Content */}
                              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-semibold text-gray-900">Key Metrics This Week</h3>
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    ↗ 23% Growth
                                  </span>
                                </div>
                                
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-white p-3 rounded border">
                                    <div className="text-xs text-gray-600 mb-1">Organic Traffic</div>
                                    <div className="text-lg font-bold text-gray-900">12,847</div>
                                    <div className="text-xs text-green-600">+1,234 vs last week</div>
                                  </div>
                                  <div className="bg-white p-3 rounded border">
                                    <div className="text-xs text-gray-600 mb-1">AI Citations</div>
                                    <div className="text-lg font-bold text-gray-900">47</div>
                                    <div className="text-xs text-blue-600">+8 new mentions</div>
                                  </div>
                                  <div className="bg-white p-3 rounded border">
                                    <div className="text-xs text-gray-600 mb-1">Google Rankings</div>
                                    <div className="text-lg font-bold text-gray-900">Pos. 3.2</div>
                                    <div className="text-xs text-green-600">+2.1 improvement</div>
                                  </div>
                                  <div className="bg-white p-3 rounded border">
                                    <div className="text-xs text-gray-600 mb-1">ChatGPT Mentions</div>
                                    <div className="text-lg font-bold text-gray-900">23</div>
                                    <div className="text-xs text-purple-600">+5 this week</div>
                                  </div>
                </div>
                
                                <div className="text-xs text-gray-600 mt-3">
                                  <p>Your content performed exceptionally well this week. The "Marketing Strategy Guide" article gained significant traction in AI citations...</p>
                      </div>
                      </div>
                      </div>
                          </div>
                        </div>
                      )}
                      
                                            {currentService === 2 && (
                        // Notion Document Screenshot Mockup
                        <div className="h-full bg-white">
                          {/* Notion Header */}
                          <div className="bg-white border-b border-gray-200 p-3">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3z"/>
                              </svg>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">Antifragility SEO/GEO Strategy Handoff</div>
                                <div className="text-xs text-gray-500">Complete implementation guide</div>
                    </div>
                    </div>
                  </div>
                  
                          {/* Document Content */}
                          <div className="p-4 space-y-4">
                            {/* Title */}
                            <h1 className="text-lg font-bold text-gray-900">🚀 SEO/GEO Implementation Guide</h1>
                            
                            {/* Table of Contents */}
                            <div className="bg-gray-50 rounded-lg p-3">
                              <h3 className="text-sm font-semibold text-gray-900 mb-2">📋 Table of Contents</h3>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-orange-600">1.</span>
                                  <span className="text-gray-700">Keyword Strategy & Target Terms</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-orange-600">2.</span>
                                  <span className="text-gray-700">AI Citation Optimization Framework</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-orange-600">3.</span>
                                  <span className="text-gray-700">Content Templates & Prompts</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-orange-600">4.</span>
                                  <span className="text-gray-700">Monitoring & KPI Dashboard</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Sample Content */}
                            <div className="space-y-3">
                              <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                                <h4 className="text-sm font-semibold text-blue-900 mb-1">💡 Key Insight</h4>
                                <p className="text-xs text-blue-800">Optimize for both traditional search engines and AI models by structuring content with clear headings and citations.</p>
                      </div>
                  
                              <div className="bg-white border border-gray-200 rounded p-3">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">📊 Performance Targets</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-gray-600">AI Citations:</span>
                                    <span className="font-semibold text-green-600 ml-1">40+ per month</span>
                      </div>
                                  <div>
                                    <span className="text-gray-600">Organic Traffic:</span>
                                    <span className="font-semibold text-green-600 ml-1">+25% growth</span>
                      </div>
                                  <div>
                                    <span className="text-gray-600">Google Rankings:</span>
                                    <span className="font-semibold text-green-600 ml-1">Top 3 positions</span>
                    </div>
                                  <div>
                                    <span className="text-gray-600">LLM Mentions:</span>
                                    <span className="font-semibold text-green-600 ml-1">15+ weekly</span>
                  </div>
                </div>
                </div>
                
                              <div className="bg-gray-900 rounded p-3">
                                <div className="text-green-400 text-xs mb-1 font-mono">Content Optimization Checklist:</div>
                                <div className="text-gray-300 text-xs space-y-0.5 font-mono">
                                  <div>☑ Clear H1/H2 structure</div>
                                  <div>☑ Authority citations included</div>
                                  <div>☑ FAQ section added</div>
                                  <div>☑ Schema markup implemented</div>
                </div>
                      </div>
                      </div>
                      </div>
                    </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Right Side - Content */}
                  <div className="order-1 lg:order-2 text-center lg:text-left">
                    {/* Service Number */}
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold mb-4 ${services[currentService].numberBg} ${services[currentService].numberText}`}>
                      {String(currentService + 1).padStart(2, '0')}
                      </div>
                  
                    {/* Service Title */}
                    <h3 className={`${inter.className} text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight`}>
                      {services[currentService].title}
                    </h3>
                    
                    {/* Service Description */}
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {services[currentService].description}
                    </p>
                    
                    {/* Service Features */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {services[currentService].features.map((feature, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${services[currentService].featureBg} ${services[currentService].featureText}`}
                        >
                          {feature}
                        </span>
                      ))}
                      </div>
                      </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevService}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNextService}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
                    </div>
                  
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentService(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentService 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
                </div>
                
            {/* Progress Bar */}
            <div className="mt-4 max-w-xs mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${((currentService + 1) / services.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is GEO Section */}
       <section className="relative w-full py-32 px-4 bg-white">
        {/* Container */}
         <div className="max-w-6xl mx-auto">
           {/* Header - Main Title */}
           <div className="mb-24">
             <div className="max-w-4xl">
               <div className="text-sm font-light text-gray-500 uppercase tracking-widest mb-6">■ Overview</div>
               <div className="w-full h-px bg-gray-200 mb-8"></div>
                               <h2 className={`${inter.className} text-4xl font-normal text-gray-900 mb-8 leading-[1.1]`}>
                  What is GEO (Generative Engine Optimization)?
            </h2>
                <p className="text-xl text-gray-500 leading-relaxed max-w-3xl font-light">
              The landscape of search and discovery is evolving. Here's how GEO is different.
            </p>
                    </div>
          </div>

                       {/* What search used to look like */}
            <div className="mb-32">
              <div className="grid lg:grid-cols-2 gap-20 items-start">
               {/* Traditional Search Visual */}
               <div className="relative">
                 <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                   {/* Browser mockup */}
                   <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                     {/* Browser header */}
                     <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                         <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                         <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                         <div className="ml-4 flex-1 bg-white rounded-md px-3 py-1 text-sm text-gray-500">
                           google.com/search?q=best+marketing...
                </div>
              </div>
                    </div>
                     
                     {/* Search results */}
                     <div className="p-6">
                       {/* Search bar */}
                       <div className="flex items-center gap-3 mb-6">
                         <Image src="/Orbit/Google.png" alt="Google" width={24} height={24} />
                         <div className="flex-1 border rounded-full px-4 py-2 text-sm text-gray-400">
                           best marketing agencies
                  </div>
                    </div>
                  
                       {/* Blue links */}
                       <div className="space-y-5">
                         <div>
                           <div className="h-4 bg-blue-600 rounded w-4/5 mb-2"></div>
                           <div className="h-2 bg-gray-300 rounded w-full mb-1"></div>
                           <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  </div>
                         <div>
                           <div className="h-4 bg-blue-600 rounded w-5/6 mb-2"></div>
                           <div className="h-2 bg-gray-300 rounded w-full mb-1"></div>
                           <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                    </div>
                         <div>
                           <div className="h-4 bg-blue-600 rounded w-3/4 mb-2"></div>
                           <div className="h-2 bg-gray-300 rounded w-5/6 mb-1"></div>
                           <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                  </div>
                         <div>
                           <div className="h-4 bg-blue-600 rounded w-4/5 mb-2"></div>
                           <div className="h-2 bg-gray-300 rounded w-full mb-1"></div>
                           <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
                </div>
              </div>
            </div>

                               {/* Explanation */}
                <div className="relative lg:pt-12">
                  <h3 className="text-4xl font-light text-gray-900 mb-8 leading-tight">
                    What search used to look like
                  </h3>
                  <p className="text-xl text-gray-500 leading-relaxed mb-12 font-light">
                   The traditional "10 blue links" dominated search for decades. Users would scan through multiple pages, clicking links to find information scattered across different websites.
                 </p>
                 
                                   <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-500 text-lg font-light">Click through multiple websites</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-500 text-lg font-light">Compare information from different sources</p>
                  </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-500 text-lg font-light">Spend time synthesizing answers</p>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
                
                       {/* What search is now */}
            <div className="mb-32">
              <div className="grid lg:grid-cols-5 gap-12 items-center">
                               {/* Modern Search Explanation - Takes 2 columns */}
                <div className="lg:col-span-2 relative">
                  <h3 className="text-3xl font-light text-gray-900 mb-6 leading-tight">
                    What search is now
                  </h3>
                  <p className="text-lg text-gray-500 leading-relaxed mb-8 font-light">
                   AI engines like ChatGPT, Claude, and Gemini provide direct answers with clear source citations. Users get comprehensive responses without the need to visit multiple websites.
                 </p>
                 
                                   <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-500 font-light">Get direct, comprehensive answers</p>
              </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-500 font-light">See clearly cited sources</p>
                  </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-500 font-light">Save time with synthesized information</p>
                    </div>
            </div>
          </div>

                               {/* AI Citation Example - Takes 3 columns for MAXIMUM size */}
                <div className="lg:col-span-3 relative w-full">
                  <Image 
                    src="/gptantifragility.png" 
                    alt="AI Citation Example" 
                    width={2400}
                    height={900}
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
            </div>
          </div>

           {/* Bottom CTA */}
           <div className="text-center">
            <button
              type="button"
              onClick={() => {
                try {
                  if (typeof window !== 'undefined' && window.Calendly) {
                    window.Calendly.initPopupWidget({url: 'https://calendly.com/noah-barbaros/introductory-chat'});
                  } else {
                    window.open('https://calendly.com/noah-barbaros/introductory-chat', '_blank');
                  }
                } catch (error) {
                  window.open('https://calendly.com/noah-barbaros/introductory-chat', '_blank');
                }
              }}
               className="px-12 py-4 text-white font-medium rounded-2xl hover:opacity-90 transition-colors"
               style={{backgroundColor: '#1d40b0'}}
            >
               Get your first AI citation now →
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile Responsive */}
      <section className="relative w-full text-white py-16 md:py-24" style={{backgroundColor: '#1d40b0'}}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Main Content */}
            <div className="flex flex-col justify-center text-center lg:text-left mb-8 lg:mb-0">
              <h2 className={`${inter.className} text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight`}>
                Find out why we're<br />
                <span className="font-medium">best-in-class</span>
              </h2>
              <p className={`${inter.className} text-base md:text-lg lg:text-xl leading-relaxed opacity-90 font-light max-w-lg mx-auto lg:mx-0`}>
                The #1 GEO and SEO agency that gets you visibility, traffic, and sales, in both AI and search engines alike.
              </p>
            </div>

            {/* Right Side - Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Stat 1 */}
              <div className="text-center lg:text-left">
                <div className={`${inter.className} text-2xl md:text-3xl lg:text-4xl font-bold mb-2`}>
                  15x Growth in Impressions
                </div>
                <div className={`${inter.className} text-sm opacity-80 font-light`}>
                  Seen by our clients*
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center lg:text-left">
                <div className={`${inter.className} text-2xl md:text-3xl lg:text-4xl font-bold mb-2`}>
                  5x Increase in Clicks
                </div>
                <div className={`${inter.className} text-sm opacity-80 font-light`}>
                  Seen by our clients*
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center lg:text-left">
                <div className={`${inter.className} text-2xl md:text-3xl lg:text-4xl font-bold mb-2`}>
                  Page 1 Rankings
                </div>
                <div className={`${inter.className} text-sm opacity-80 font-light`}>
                  For all competitive keywords*
                </div>
              </div>

              {/* Stat 4 */}
              <div className="text-center lg:text-left">
                <div className={`${inter.className} text-2xl md:text-3xl lg:text-4xl font-bold mb-2`}>
                  Over 1000 AI Citations
                </div>
                <div className={`${inter.className} text-sm opacity-80 font-light`}>
                  Won across AI platforms*
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GEO + SEO Story Banner */}
      <div className="w-full overflow-x-hidden py-24">
        <div className="w-full bg-gray-100 rounded-lg py-16 px-2 md:px-0">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light leading-tight text-gray-900 font-mono">
              Your all-in-one agency for ranking from search engines like Google, to AI like ChatGPT.
            </h2>
          </div>
        </div>
      </div>

      {/* Why Now Section - Smooth Auto-Carousel */}
      <section className="relative w-full px-0 bg-black">
        <div 
          className="relative w-full min-h-[480px] flex flex-col justify-center overflow-hidden py-20 md:py-28"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            setTouchStart(touch.clientX);
          }}
          onTouchEnd={(e) => {
            if (!touchStart) return;
            const touch = e.changedTouches[0];
            const diff = touchStart - touch.clientX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
              if (diff > 0) {
                // Swipe left - next
                setDirection(1);
                setCurrent((current + 1) % stats.length);
              } else {
                // Swipe right - previous
                setDirection(-1);
                setCurrent((current + stats.length - 1) % stats.length);
              }
            }
            setTouchStart(null);
          }}
        >
          {/* Background images with smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeInOut",
                opacity: { duration: 0.8 },
                scale: { duration: 1.2 }
              }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={stats[current].image}
                alt=""
                fill
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70 z-10" />
          
          {/* Content with smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.2
              }}
              className="relative z-20 w-full h-full flex flex-col justify-center items-start px-4 md:px-24"
            >
              <h2 className={`${inter.className} text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 drop-shadow-lg text-left leading-tight max-w-4xl`}>
                {stats[current].title}
              </h2>
              <div className={`${inter.className} text-lg md:text-xl text-white/90 mb-4 max-w-2xl drop-shadow-md text-left font-light`}>
                {stats[current].desc}
              </div>
              <div className="mb-6">
                <a href={stats[current].source.url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-blue-200 underline hover:text-white transition-colors">
                  {stats[current].source.label}
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  try {
                    if (typeof window !== 'undefined' && window.Calendly) {
                      window.Calendly.initPopupWidget({url: 'https://calendly.com/noah-barbaros/introductory-chat'});
                    } else {
                      window.open('https://calendly.com/noah-barbaros/introductory-chat', '_blank');
                    }
                  } catch (error) {
                    window.open('https://calendly.com/noah-barbaros/introductory-chat', '_blank');
                  }
                }}
                className="px-8 py-4 text-white text-lg font-bold rounded-lg shadow-lg transition-colors hover:opacity-90"
                style={{backgroundColor: '#1d40b0'}}
              >
                Contact us to learn more
              </button>
            </motion.div>
          </AnimatePresence>
          {/* Arrows - Hidden on mobile */}
          <button onClick={() => {
            setDirection(-1);
            setCurrent((current + stats.length - 1) % stats.length);
          }} className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 shadow-lg z-20 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
          <button onClick={() => {
            setDirection(1);
            setCurrent((current + 1) % stats.length);
          }} className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 shadow-lg z-20 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
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
      <section id="why-antifragility" className="relative w-full py-28 px-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Elegant curved background elements */}
        <svg className="absolute left-1/2 top-0 -translate-x-1/2 opacity-10 w-[900px] h-[340px] pointer-events-none select-none" viewBox="0 0 900 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="450" cy="170" rx="420" ry="120" fill="url(#brand-gradient)" />
          <path d="M120 200 Q 450 60 780 200" stroke="#1d40b0" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M200 120 Q 450 300 700 120" stroke="#1d40b0" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
          <defs>
            <linearGradient id="brand-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1d40b0" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1d40b0" stopOpacity="0.02" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="relative max-w-3xl mx-auto px-6">
          {/* Elegant accent chip with halo */}
          <div className="flex justify-center mb-6">
            <span className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full font-semibold shadow-lg text-sm" style={{color: '#1d40b0', boxShadow: '0 8px 32px rgba(29, 64, 176, 0.15)'}}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" style={{color: '#1d40b0'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4v8m0 0l3-3m-3 3l-3-3" />
              </svg>
              Our Philosophy
            </span>
          </div>
          
          {/* Glassmorphic card with subtle enhancement */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 px-8 py-14 text-center" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.9)'}}>
            <h2 className={`${inter.className} text-2xl md:text-3xl font-light text-gray-900 mb-6 leading-tight`}>The Antifragile Way</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-normal">Most companies aim to be resilient — to survive shocks. We aim higher.</p>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-normal">Antifragile systems don't just survive stress — they get stronger because of it. That's the core of how we operate: every client project, failed test, or algorithm shift becomes a feedback loop. We learn. We adapt. We evolve.</p>
            <p className="text-lg md:text-xl font-semibold leading-relaxed mt-10" style={{color: '#1d40b0'}}>In an ecosystem as unpredictable as AI search, fragility breaks, resilience endures, but antifragility wins.</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faqs" className="w-full bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className={`${inter.className} text-3xl md:text-4xl font-light text-center mb-10 text-gray-900`}>Frequently Asked Questions</h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Get Cited On Section - Simple & Clean */}
      <section className="w-full flex flex-col items-center justify-center py-12 px-4 bg-white">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Main Headline with Inline Logo Carousel */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <h2 className={`${inter.className} text-4xl md:text-6xl font-light text-gray-900 leading-tight`}>
              Get cited on
            </h2>
            <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
              <LogoCarousel />
            </div>
          </div>
          
          <p className={`${inter.className} text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto font-light`}>
            Every major AI platform, every search engine, every time someone asks about your industry, we get you there.
          </p>

          {/* Simple CTA */}
          <button
            onClick={() => {
              try {
                if (typeof window !== 'undefined' && window.Calendly) {
                  window.Calendly.initPopupWidget({url: 'https://calendly.com/noah-barbaros/introductory-chat'});
                } else {
                  window.open('https://calendly.com/noah-barbaros/introductory-chat', '_blank');
                }
              } catch (error) {
                window.open('https://calendly.com/noah-barbaros/introductory-chat', '_blank');
              }
            }}
            className={`${inter.className} px-8 py-4 text-lg font-medium rounded-lg transition-all border-2 hover:text-white`}
            style={{backgroundColor: 'transparent', borderColor: '#1d40b0', color: '#1d40b0'}}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#1d40b0';
              target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'transparent';
              target.style.color = '#1d40b0';
            }}
          >
            Get your first AI citation now →
          </button>
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
                src="https://calendly.com/noah-barbaros/introductory-chat"
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
        .brand-blue-arrow {
          color: #1d40b0 !important;
        }
        
        @keyframes text-flip {
          0% {
            transform: translateY(0);
          }
          16.66% {
            transform: translateY(-100%);
          }
          33.33% {
            transform: translateY(-200%);
          }
          50% {
            transform: translateY(-300%);
          }
          66.66% {
            transform: translateY(-400%);
          }
          83.33% {
            transform: translateY(-500%);
          }
          100% {
            transform: translateY(-600%);
          }
        }
        
        .animate-text-flip {
          animation: text-flip 30s steps(6) infinite !important;
        }
        
        .animate-text-flip:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </>
  );
} 