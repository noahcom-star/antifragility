import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "What's the difference between SEO and GEO?",
    a: "SEO helps you rank on search engines like Google through links and keywords. GEO helps you rank in AI-generated answers (ChatGPT, SGE, Claude) by optimizing for how LLMs retrieve, rank, and cite sources.",
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
    q: "How do I measure success in GEO?",
    a: "We track citations, summary mentions, and traffic lift from AI interfaces — not just clicks, but brand presence in AI responses.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="divide-y divide-blue-100 rounded-2xl shadow-xl bg-white overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={faq.q}>
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none focus:bg-blue-50 transition-colors group"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{faq.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 90 : 0 }}
                className="ml-4 text-blue-600"
              >
                ▶
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden px-6 pb-5 text-gray-700 text-base md:text-lg bg-blue-50/40"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <a
          href="https://calendly.com/noah-barbaros/introductory-chat?"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-blue-600 text-blue-700 text-lg font-bold rounded-xl shadow-md hover:bg-blue-50 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="4"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          Have more questions? Let's chat!
        </a>
      </div>
    </>
  );
} 