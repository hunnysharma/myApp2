import { useLayoutEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StickyHorizontalScroll.css';

gsap.registerPlugin(ScrollTrigger);

function StickyHorizontalScroll({ cmsData }) {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const defaultData = useMemo(() => ({
    label: "Choose Ema's role to start",
    title: "Meet your on-demand AI Employees",
    cards: [
      { title: 'Employee Assistant', description: 'Streamline daily inquiries with instant answers on policies, procedures, and shared documents. No more pinging teammates or wading through folders.', order: 1 },
      { title: 'Sales Assistant', description: 'Quickly access account status, pipeline updates, and CRM insights. Focus on closing deals while Ema handles research and repetitive tasks.', order: 2 },
      { title: 'Marketing Assistant', description: 'Find campaign assets, performance metrics, and brand guidelines in seconds. Optimize strategy with real-time, data-driven suggestions.', order: 3 },
      { title: 'Technical Assistant', description: 'Retrieve code snippets, engineering docs, or product specs on demand. Spend less time searching and more time building.', order: 4 },
      { title: 'Leadership Assistant', description: 'Gain unified insights across departments to make data-backed decisions fast. Get top-level metrics and reports in one conversation.', order: 5 },
      { title: 'Legal & Compliance Assistant', description: 'Surface regulations, contracts, and guidelines instantly. Stay on top of evolving compliance requirements without the manual chase.', order: 6 },
      { title: 'Support Data Analyst', description: 'Consolidate ticket logs, track resolution metrics, and highlight improvement areas. Drive upsells and implement changes rooted in data, provide proactive, data-driven support.', order: 7 },
      { title: 'Voice of Customer Analyst', description: 'Synthesize calls, chats, and social media feedback. Spot key trends, inform product roadmaps, and strengthen customer relationships.', order: 8 },
    ],
  }), []);

  const sectionData = cmsData?.stickyHorizontalScroll || defaultData;
  const { label, title, cards = [] } = sectionData;

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
    const container = cardsContainerRef.current;

    if (!section || !container || cards.length === 0) return;

    let anim = null;

    const initHorizontalScroll = () => {
      if (anim) {
        anim.scrollTrigger?.kill();
        anim.kill();
      }

      if (isMobile) {
        return;
      }

      const cardsWrapper = container.parentElement;
      if (!cardsWrapper) return;

      const containerMaxWidth = 1070;
      const containerPadding = 32;
      const viewportWidth = window.innerWidth;
      
      const containerStart = viewportWidth > containerMaxWidth 
        ? (viewportWidth - containerMaxWidth) / 2 + containerPadding
        : containerPadding;

      const containerWidth = viewportWidth > containerMaxWidth 
        ? containerMaxWidth - (containerPadding * 2)
        : viewportWidth - (containerPadding * 2);

      const totalCardsWidth = container.scrollWidth;
      
      const firstCard = container.querySelector('.sticky-horizontal-card');
      const cardWidth = firstCard ? firstCard.offsetWidth : 378;
      
      const buffer = cardWidth * 0.5;
      const totalScrollWidth = totalCardsWidth - containerWidth + buffer;

      anim = gsap.to(container, {
        x: () => -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: "margin",
          pinnedContainer: section,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: 1,
          id: "sticky-horizontal",
        },
      });

      ScrollTrigger.refresh();
    };

    initHorizontalScroll();

    let resizeTimeout = null;
    const onResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initHorizontalScroll();
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const images = section.querySelectorAll("img");
    let loaded = 0;
    const totalImages = images.length;

    if (totalImages > 0) {
      images.forEach((img) => {
        if (img.complete) {
          loaded++;
          if (loaded === totalImages) ScrollTrigger.refresh();
        } else {
          img.onload = () => {
            loaded++;
            if (loaded === totalImages) ScrollTrigger.refresh();
          };
        }
      });
    }

    return () => {
      if (anim) {
        anim.scrollTrigger?.kill();
        anim.kill();
      }
      window.removeEventListener("resize", onResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [cards, isMobile]);

  return (
    <section ref={sectionRef} className="sticky-horizontal-section">
      <div className="sticky-horizontal-header-container">
        {label && <div className="sticky-horizontal-label">{label}</div>}
        <h2 className="sticky-horizontal-title">{title}</h2>
      </div>

      <div className="sticky-horizontal-cards-wrapper">
        <div ref={cardsContainerRef} className="sticky-horizontal-cards-container">
          {cards.map((card, index) => (
            <div key={card.order || index} className="sticky-horizontal-card">
              {card.imageUrl && (
                <div className="sticky-horizontal-card-image-wrapper">
                  <img
                    src={card.imageUrl}
                    alt={card.title || "Card image"}
                    className="sticky-horizontal-card-image"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="sticky-horizontal-card-content">
                <h3 className="sticky-horizontal-card-title">{card.title}</h3>
                <p className="sticky-horizontal-card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StickyHorizontalScroll;
