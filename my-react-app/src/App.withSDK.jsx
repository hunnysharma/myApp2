// Alternative App.jsx using Sanity App SDK with React hooks
// To use this, rename it to App.jsx and install @sanity/sdk-react
import { Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import ScrollSections from './sections/ScrollSections';
import InteractiveCardSection from './sections/InteractiveCardSection';
import StickyHorizontalScroll from './sections/StickyHorizontalScroll';
import VerticalCardReveal from './sections/VerticalCardReveal';
import StaticSections from './sections/StaticSections';
import { CMSProvider } from './components/CMSProvider';
import { useCMSData } from './hooks/useCMSData';
import './App.css';

function AppContent() {
  const cmsData = useCMSData(); // This hook suspends, so must be in Suspense boundary

  return (
    <div id="smooth-wrapper" className="app">
      <div id="smooth-content">
        <Header />
        <main className="main-content">
          <HeroSection cmsData={cmsData} />
          <ScrollSections cmsData={cmsData} />
          <InteractiveCardSection cmsData={cmsData} />
          <StickyHorizontalScroll cmsData={cmsData} />
          <VerticalCardReveal cmsData={cmsData} />
          <StaticSections cmsData={cmsData} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <CMSProvider>
      <Suspense fallback={
        <div className="loading-screen">
          <div className="loader"></div>
        </div>
      }>
        <AppContent />
      </Suspense>
    </CMSProvider>
  );
}

export default App;

