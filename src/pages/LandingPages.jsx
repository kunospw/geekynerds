import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import ProductSection from '../components/ProductSection.jsx';
import WhyGeekyNerds from '../components/WhyGeekyNerds.jsx';
import NewsletterSection from '../components/NewsletterSection.jsx';
import Footer from '../components/Footer.jsx';

const LandingPages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* All sections are now self-contained and responsive */}
        <HeroSection />
        <ProductSection />
        <WhyGeekyNerds />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPages;