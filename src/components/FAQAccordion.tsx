import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const faqs = [
  {
    q: "What's the difference between SEO and GEO?",
    a: "SEO helps you rank on search engines like Google through links and keywords. GEO helps you rank in AI-generated answers (ChatGPT, SGE, Claude) by optimizing for how LLMs retrieve, rank, and cite sources. We do both.",
  },
  {
    q: "Why do I need both SEO and GEO?",
    a: "Generative engines often pull from well-optimized, credible SEO content — but they interpret and summarize it differently. SEO gets you indexed; GEO gets you surfaced in AI results.",
  },
  {
    q: "Do you handle technical SEO too?",
    a: "Yes. We ensure your site is crawlable, fast, and structured for both traditional and generative engines — schema markup, meta tags, and link structure included.",
  },
  {
    q: "How does GEO actually work behind the scenes?",
    a: "We analyze how LLMs select sources, then engineer your content to match those signals — formatting, phrasing, credibility indicators, and entity coverage.",
  },
  {
    q: "If I already have an SEO agency, can you just do GEO?",
    a: "Yes. We can work alongside your SEO team or take the lead — GEO strategies are distinct but complementary.",
  },
  {
    q: "How quickly will I see results?",
    a: "Timeline varies by strategy. With GEO, once optimized pages go live, results can appear almost instantly. Competitive keywords take longer to win, but most brands see their first new citations within days. SEO, on the other hand, is a long game—results typically come in within 3-6 months.",
  },
  {
    q: "Why is now the right time to invest in GEO?",
    a: "AI tools like ChatGPT, Perplexity, Claude, and Gemini are quickly becoming the go-to starting point for brand discovery. With chatbot traffic more than doubling in the past year—and sites like Zapier now getting nearly half their referrals from AI instead of Google—investing in GEO today means staying ahead of the curve before your competitors catch up.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={faq.q} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <button
              className="w-full flex items-center justify-between px-8 py-6 text-left focus:outline-none transition-all duration-200 group rounded-xl"
              style={{
                backgroundColor: open === i ? 'rgba(29, 64, 176, 0.02)' : 'transparent'
              }}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className={`${inter.className} text-lg md:text-xl font-light text-gray-900 transition-colors group-hover:text-gray-700 pr-4`}>
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: open === i ? 180 : 0 }}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                transition={{ duration: 0.2 }}
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  style={{color: '#1d40b0'}}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className={`${inter.className} px-8 pb-6 text-gray-600 text-base md:text-lg leading-relaxed font-light`}>
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      

    </>
  );
} 