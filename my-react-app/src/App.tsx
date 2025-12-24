import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import ScrollSections from './sections/ScrollSections';
import InteractiveCardSection from './sections/InteractiveCardSection';
import StickyHorizontalScroll from './sections/StickyHorizontalScroll';
import StackedCardsSection from './sections/StackedCardsSection';
import CTASection from './sections/CTASection';
import { fetchCMSData } from './services/cms';
import { preloadAllLottieFiles, prefetchLottieFiles } from './utils/lottiePreloader';
import type { CMSData } from './types/cms';
import './App.css';

function App() {
  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Preload lottie files as early as possible
  useEffect(() => {
    // Use prefetch for browser-level caching (non-blocking)
    prefetchLottieFiles();
    
    // Also preload and cache the actual data (blocking but ensures availability)
    preloadAllLottieFiles().catch((error) => {
      console.warn('Failed to preload lottie files:', error);
    });
  }, []);

  useEffect(() => {
    fetchCMSData()
      .then((data) => {
        setCmsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching CMS data:', error);
        // Set loading to false to show the app with fallback data
        setLoading(false);
        // Note: fetchCMSData already returns default data on error,
        // so we can still render the app with fallback content
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <HeroSection cmsData={cmsData} />
        <ScrollSections cmsData={cmsData} />
        <InteractiveCardSection cmsData={cmsData} />
        <StickyHorizontalScroll cmsData={cmsData} />
        <StackedCardsSection cmsData={cmsData} />
        <CTASection cmsData={cmsData} />
      </main>
      <Footer cmsData={cmsData} />
    </div>
  );
}

export default App;

