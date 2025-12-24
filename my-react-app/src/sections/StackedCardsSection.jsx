import { useLayoutEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StackedCardsSection.css';

gsap.registerPlugin(ScrollTrigger);

function StackedCardsSection({ cmsData }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const defaultData = useMemo(() => ({
    title: "Everything you need to build your AI workforce now",
    description: "From conversational AI Employee creation to enterprise-grade security & trust, Ema handles the complexity so you can focus on results.",
    cards: [
      { title: "Breakthrough autonomy", text: "Use Ema’s AI Employee Builder to instantly create enterprise-ready agentic workflows. Free up your employees from execution to focus on vision, creativity and growth.", image: "https://heroic-chocolate-319b05815e.media.strapiapp.com/Frame_2147229495_14b4a2a7ea.png" },
      { title: "Optimized, transparent, and trustworthy", text: "Ema’s AI Employees are powered by EmaFusion™, which combines the outputs of 100+ LLMs so your AI investments are always optimized and future-proof. Get encrypted PII protection and compliance with leading security protocols from day one.", image: "https://heroic-chocolate-319b05815e.media.strapiapp.com/img_04_17ebec3991.png" },
      { title: "Autonomy with judgment", text: "Ema’s AI employees reason and learn when to involve humans, so automation stays fast and accurate, but also trusted.", image: "https://heroic-chocolate-319b05815e.media.strapiapp.com/image_10_1_f48b2ffb75.png" },
      { title: "Democratized AI workforce creation", text: "No code, no bottlenecks. Business users build AI employees, turning ideas into impact in minutes.", image: "https://heroic-chocolate-319b05815e.media.strapiapp.com/img_05_da0056faca.png" },
      { title: "The future of work, made simple", text: "Transform your business with Ema's enterprise-grade agentic AI platform: accessible, powerful, and easy to scale.", image: "https://heroic-chocolate-319b05815e.media.strapiapp.com/img_01_36aea7cc73.png" },
    ],
  }), []);

  const cmsSection = cmsData?.stackedCardsSection;
  const title = cmsSection?.title || defaultData.title;
  const description = cmsSection?.description || defaultData.description;
  
  const cards = useMemo(() => {
    if (cmsSection?.cards && cmsSection.cards.length > 0) {
      return [...cmsSection.cards].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    return defaultData.cards;
  }, [cmsSection?.cards, defaultData.cards]);

  useLayoutEffect(() => {
    let timeoutId = null;
    const checkMobile = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const container = containerRef.current;
    const cardEls = cardsRef.current.filter(Boolean);

    if (!section || !content || !container || cardEls.length === 0) return;

    const triggerElement = isMobile ? container : section;
    const headerHeight = 150;
    const startPoint = isMobile ? `top top+=${headerHeight}` : "top top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        pin: content,
        pinSpacing: true,
        scrub: 1,
        start: startPoint,
        end: "+=3000",
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    tl.to(cardEls[0], { yPercent: 0, opacity: 1 });

    cardEls.slice(1).forEach((current) => {
      tl.from(current, { yPercent: 80, opacity: 0 }, "-=0.4");
      tl.to(current, { yPercent: 0, opacity: 1 }, "-=0.2");
    });

    return () => tl.scrollTrigger?.kill();
  }, [cards, isMobile]);

  return (
    <section ref={sectionRef} className="stacked-cards-section">
      <div ref={contentRef} className="stacked-cards-content">
        <div className="stacked-cards-header">
          <h2 className="stacked-cards-title">{title}</h2>
          <p className="stacked-cards-desc">{description}</p>
        </div>

        <div ref={containerRef} className="stacked-cards-container">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={el => (cardsRef.current[index] = el)}
              className="stacked-card"
            >
              <div className="stacked-card-content">
                <div>
                  <h3 className="stacked-card-title">{card.title}</h3>
                  <p className="stacked-card-text">{card.text}</p>
                </div>
              </div>

              {card.image && (
                <div className="stacked-card-image-wrapper">
                  <img
                    src={card.image}
                    alt={card.title || 'Card image'}
                    className="stacked-card-image"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StackedCardsSection;