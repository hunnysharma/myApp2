import { useEffect, useState, useMemo, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import LottieAnimation from '../components/LottieAnimation';
import './HeroSection.css';

function HeroSection({ cmsData }) {
  const [animationData, setAnimationData] = useState(null);
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
    if (cmsData?.hero?.lottieAnimationUrl) {
      fetch(cmsData.hero.lottieAnimationUrl)
        .then(res => res.json())
        .then(data => setAnimationData(data))
        .catch(() => {
          loadLocalAnimation();
        });
    } else {
      loadLocalAnimation();
    }
  }, [cmsData]);

  const loadLocalAnimation = () => {
    fetch('/assets/lottie/Hero_knowledge Insight_F (1).json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => {});
  };

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
