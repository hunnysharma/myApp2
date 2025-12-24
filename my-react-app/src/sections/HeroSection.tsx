import { useEffect, useState, useMemo, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import LottieAnimation from '../components/LottieAnimation';
import { getLottieData } from '../utils/lottiePreloader';
import type { CMSData } from '../types/cms';
import './HeroSection.css';

interface HeroSectionProps {
  cmsData?: CMSData | null;
}

function HeroSection({ cmsData }: HeroSectionProps) {
  const [animationData, setAnimationData] = useState<unknown>(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const hero = useMemo(() => (cmsData?.hero || {
    label: 'KNOWLEDGE INSIGHTS',
    title: 'Empower Teams with the Right Knowledge, Instantly',
    subtitle: 'Unify all your enterprise knowledge into a single source of truth, so you can ask questions, surface insights, and take action—right when you need it',
  }), [cmsData?.hero]);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const url = cmsData?.hero?.lottieAnimationUrl || '/assets/lottie/Hero_knowledge Insight_F (1).json';
        const data = await getLottieData(url);
        if (data) {
          setAnimationData(data);
        } else {
          // Fallback: try direct fetch if cache miss
          const response = await fetch('/assets/lottie/Hero_knowledge Insight_F (1).json');
          if (response.ok) {
            const fallbackData = await response.json();
            setAnimationData(fallbackData);
          }
        }
      } catch (error) {
        console.warn('Failed to load hero animation:', error);
      }
    };

    loadAnimation();
  }, [cmsData]);

  return (
    <section ref={ref} className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-label">{hero.label}</div>
          <h1 className="hero-title">{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
        </div>
      </div>
      <div className="hero-animation">
        {animationData && (
          <LottieAnimation
            animationData={animationData}
            className="lottie-hero"
            loop={false}
            autoplay={inView}
          />
        )}
      </div>
    </section>
  );
}

export default memo(HeroSection);

