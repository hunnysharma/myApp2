// App.jsx with Visibility Control
// Marketing team can show/hide sections from Sanity
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import ScrollSections from './sections/ScrollSections';
import InteractiveCardSection from './sections/InteractiveCardSection';
import StickyHorizontalScroll from './sections/StickyHorizontalScroll';
import VerticalCardReveal from './sections/VerticalCardReveal';
import StaticSections from './sections/StaticSections';
import { fetchCMSData } from './services/cms-with-visibility';
import './App.css';

function App() {
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch CMS data on mount
    fetchCMSData()
      .then(data => {
        setCmsData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching CMS data:', error);
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

  const visibility = cmsData?.sectionsVisibility || {};

  return (
    <div id="smooth-wrapper" className="app">
      <div id="smooth-content">
        <Header />
        <main className="main-content">
          {/* Only render sections if they're visible */}
          {visibility.hero !== false && (
            <HeroSection cmsData={cmsData} />
          )}
          
          {visibility.scrollSections !== false && (
            <ScrollSections cmsData={cmsData} />
          )}
          
          {visibility.interactiveCards !== false && (
            <InteractiveCardSection cmsData={cmsData} />
          )}
          
          {visibility.stickyHorizontalScroll !== false && (
            <StickyHorizontalScroll cmsData={cmsData} />
          )}
          
          {visibility.verticalCardReveal !== false && (
            <VerticalCardReveal cmsData={cmsData} />
          )}
          
          {visibility.staticSections !== false && (
            <StaticSections cmsData={cmsData} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

