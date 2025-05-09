import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-start px-4 pb-16">
      {/* Navbar */}
      <Navigation />

      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-tr from-blue-200/40 via-purple-100/30 to-transparent z-0" />
      <div className="absolute right-0 top-40 w-72 h-72 bg-purple-100/30 rounded-full blur-2xl z-0" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-blue-100/20 rounded-full blur-2xl z-0" />

      {/* Hero Section */}
      <section className="relative w-full max-w-3xl mx-auto text-center pt-36 pb-12 z-10">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-4 rounded-2xl shadow-xl inline-block animate-fadeinup1">
            <Image src="/pricing-hero.svg" alt="Custom Pricing" width={80} height={80} className="mx-auto" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-2 tracking-tight animate-fadeinup2">
            Individualized Pricing,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Real Results</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto animate-fadeinup3">
            Every business is unique—so your growth plan should be too. We don't do cookie-cutter packages. Instead, we craft a custom strategy and pricing model based on your goals, market, and growth stage.
          </p>
        </div>
      </section>

      {/* Card Section */}
      <section className="relative w-full flex flex-col items-center z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 md:p-16 border border-blue-100 max-w-2xl mx-auto flex flex-col items-center gap-6 animate-fadeinup2">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">How It Works</h2>
          <ul className="text-left text-gray-700 space-y-3 mb-4 text-lg">
            <li>• We learn about your business, goals, and challenges.</li>
            <li>• We design a tailored GEO + SEO plan for your needs.</li>
            <li>• You get transparent, individualized pricing—no surprises.</li>
          </ul>
          <p className="text-gray-500 mb-2 text-center">Ready to see what's possible for your brand?</p>
          <a
            href="https://calendly.com/noah-barbaros/introductory-chat?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-xl shadow-lg hover:scale-105 hover:opacity-90 transition-all mb-2 animate-fadeinup3"
          >
            Book Your Free Strategy Call
          </a>
          <div className="text-xs text-gray-400 mt-2 text-center">No pressure, no hard sell—just real advice and a custom plan.</div>
        </div>
      </section>
    </main>
  );
} 