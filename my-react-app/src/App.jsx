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
import './App.css';

function App() {
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCMSData()
      .then(data => {
        setCmsData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
