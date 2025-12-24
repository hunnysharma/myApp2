import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LottieAnimation from '../components/LottieAnimation';
import type { LottieRef } from '../components/LottieAnimation';
import policyAppsSvgFallback from '../assets/policyapps.svg';
import { getLottieData } from '../utils/lottiePreloader';
import type { CMSData } from '../types/cms';
import './ScrollSections.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionsProps {
  cmsData?: CMSData | null;
}

interface Animations {
  scroll1: unknown | null;
  scroll2: unknown | null;
  scroll3: unknown | null;
  scroll4: unknown | null;
}

interface Loading {
  scroll1: boolean;
  scroll2: boolean;
  scroll3: boolean;
  scroll4: boolean;
}

function ScrollSections({ cmsData }: ScrollSectionsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lottieRefs = useRef<(LottieRef | null)[]>([]);
  const [animations, setAnimations] = useState<Animations>({
    scroll1: null,
    scroll2: null,
    scroll3: null,
    scroll4: null,
  });
  const [loading, setLoading] = useState<Loading>({
    scroll1: true,
    scroll2: true,
    scroll3: true,
    scroll4: true,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openCardIndex, setOpenCardIndex] = useState<number>(0);

  const scrollSection = useMemo(() => cmsData?.scrollSection || {
    heading: 'Go beyond enterprise search perform action at scale',
    sections: [
      {
        title: 'One-stop search and analysis',
        description: 'Bring together documents, files, apps, and data—no more endless hunting in siloed systems.',
        order: 1,
      },
      {
        title: 'Agentic intelligence',
        description: 'Ema doesn\'t just "find" information; it can take multiple steps, pull in structured data, query databases, write code, and automate follow-up tasks to deliver real answers.',
        order: 2,
      },
      {
        title: 'Contextual answers, zero guesswork',
        description: 'Every response is cited at the paragraph level, with built-in charts, code snippets, and more.',
        order: 3,
      },
      {
        title: 'Self-updating knowledge',
        description: 'Connect new data automatically— Ema keeps learning from your latest tools, files, and repositories.',
        order: 4,
      },
    ],
  }, [cmsData?.scrollSection]);

  const scrollData = useMemo(() => scrollSection.sections || [], [scrollSection.sections]);
  const headingText = scrollSection.heading || 'Go beyond enterprise search perform action at scale';

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
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

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const loadAnimation = async (url: string | undefined, key: keyof Animations, fallbackPath: string) => {
          try {
            // Use preloader utility which checks cache first
            const targetUrl = url || fallbackPath;
            const data = await getLottieData(targetUrl);

            if (data) {
              setAnimations(prev => ({ ...prev, [key]: data }));
              setLoading(prev => ({ ...prev, [key]: false }));
            } else {
              // Fallback: try direct fetch if cache miss
              const response = await fetch(fallbackPath);
              if (response.ok) {
                const fallbackData = await response.json();
                setAnimations(prev => ({ ...prev, [key]: fallbackData }));
                setLoading(prev => ({ ...prev, [key]: false }));
              } else {
                setLoading(prev => ({ ...prev, [key]: false }));
              }
            }
          } catch (error) {
            console.error(`Error loading animation for ${key}:`, error);
            setLoading(prev => ({ ...prev, [key]: false }));
          }
        };

        await Promise.all([
          loadAnimation(scrollData[0]?.lottieAnimationUrl, 'scroll1', '/assets/lottie/KI_scroll1_sq.json'),
          loadAnimation(scrollData[1]?.lottieAnimationUrl, 'scroll2', '/assets/lottie/KI_scroll2_sq.json'),
          loadAnimation(scrollData[2]?.lottieAnimationUrl, 'scroll3', '/assets/lottie/KI_scroll3_sq.json'),
          loadAnimation(scrollData[3]?.lottieAnimationUrl, 'scroll4', '/assets/lottie/KI_scroll4_sq.json'),
        ]);
      } catch (error) {
        console.warn('Error loading scroll animations:', error);
      }
    };

    loadAnimations();
  }, [scrollData]);

  useEffect(() => {
    if (!sectionRef.current || isMobile) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const progressSegments = sectionRef.current.querySelectorAll('.progress-segment');

    gsap.set(progressSegments, { background: '#E5E7EB' });
    if (progressSegments[0]) {
      gsap.set(progressSegments[0], { background: '#1F2937' });
    }

    const animationTriggered = new Set<number>();
    const cardStates = new Map<number, 'open' | 'closed'>();
    const totalCards = cards.length;
    const scrollDistancePerCard = window.innerHeight;
    const totalScrollDistance = scrollDistancePerCard * (totalCards - 1);

    const peekAmount = 100;
    const stackedCardsWidth = peekAmount * (totalCards - 1);

    const container = sectionRef.current?.querySelector('.scroll-cards-wrapper') as HTMLElement | null;

    const positionCards = () => {
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const activeCardWidth = containerWidth - stackedCardsWidth;

      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: totalCards - index,
          opacity: 1,
          visibility: 'visible',
        });

        const cardContent = card.querySelector('.card-content') as HTMLElement | null;
        const cardAnimation = card.querySelector('.card-animation') as HTMLElement | null;

        if (index === 0) {
          gsap.set(card, {
            width: activeCardWidth,
            flexBasis: activeCardWidth,
          });

          if (cardContent) {
            gsap.set(cardContent, {
              opacity: 1,
              visibility: 'visible',
            });
          }
          if (cardAnimation) {
            gsap.set(cardAnimation, {
              opacity: 1,
              visibility: 'visible',
            });
          }

          cardStates.set(index, 'open');

          if (lottieRefs.current[0] && !animationTriggered.has(0)) {
            lottieRefs.current[0]!.goToAndPlay(0);
            animationTriggered.add(0);
          }
        } else {
          gsap.set(card, {
            width: peekAmount,
            flexBasis: peekAmount,
          });

          if (cardContent) {
            gsap.set(cardContent, {
              opacity: 0,
              visibility: 'hidden',
            });
          }
          if (cardAnimation) {
            gsap.set(cardAnimation, {
              opacity: 0,
              visibility: 'hidden',
            });
          }

          cardStates.set(index, 'closed');
        }
      });
    };

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        positionCards();
        ScrollTrigger.refresh();
      }, 150);
    };

    positionCards();

    requestAnimationFrame(() => {
      positionCards();
      ScrollTrigger.refresh();
    });

    window.addEventListener('resize', handleResize, { passive: true });

    const getCardsWrapperOffset = () => {
      if (!sectionRef.current || !container) return 0;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const cardsRect = container.getBoundingClientRect();
      return cardsRect.top - sectionRect.top;
    };

    const cardsOffset = getCardsWrapperOffset();
    const headerHeight = 80;
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: cardsOffset > 0 ? `top+=${cardsOffset - headerHeight} top` : `top+=${headerHeight} top`,
      end: `+=${totalScrollDistance}`,
      scrub: 0.2,
      anticipatePin: 1,
      markers: false,
      onUpdate: (self) => {
        if (!container) return;

        const progress = self.progress;
        const numTransitions = totalCards - 1;
        const scaledProgress = progress * numTransitions;
        const currentTransitionIndex = Math.min(Math.floor(scaledProgress), numTransitions - 1);
        const transitionProgress = scaledProgress - currentTransitionIndex;

        const peekAmount = 100;
        const stackedCardsWidth = peekAmount * (totalCards - 1);
        const containerWidth = container.offsetWidth;
        const activeCardWidth = containerWidth - stackedCardsWidth;

        cards.forEach((card, index) => {
          if (index < currentTransitionIndex) {
            const cardContent = card.querySelector('.card-content') as HTMLElement | null;
            const cardAnimation = card.querySelector('.card-animation') as HTMLElement | null;

            gsap.set(card, {
              width: peekAmount,
              flexBasis: peekAmount,
              zIndex: totalCards - index,
              opacity: 1,
              visibility: 'visible',
            });

            if (cardContent) {
              gsap.set(cardContent, {
                opacity: 0,
                visibility: 'hidden',
              });
            }
            if (cardAnimation) {
              gsap.set(cardAnimation, {
                opacity: 0,
                visibility: 'hidden',
              });
            }
          } else if (index === currentTransitionIndex) {
            const shouldBeOpen = transitionProgress < 0.5;
            const cardContent = card.querySelector('.card-content') as HTMLElement | null;
            const cardAnimation = card.querySelector('.card-animation') as HTMLElement | null;
            const currentState = cardStates.get(index);

            if (currentState !== (shouldBeOpen ? 'open' : 'closed')) {
              const targetWidth = shouldBeOpen ? activeCardWidth : peekAmount;
              const targetOpacity = shouldBeOpen ? 1 : 0;

              gsap.killTweensOf([card, cardContent, cardAnimation]);

              gsap.to(card, {
                width: targetWidth,
                flexBasis: targetWidth,
                duration: 0.6,
                ease: 'power2.inOut',
              });

              if (cardContent) {
                gsap.to(cardContent, {
                  opacity: targetOpacity,
                  visibility: shouldBeOpen ? 'visible' : 'hidden',
                  duration: 0.5,
                  ease: 'power2.out',
                  delay: shouldBeOpen ? 0.15 : 0,
                });
              }

              if (cardAnimation) {
                gsap.to(cardAnimation, {
                  opacity: targetOpacity,
                  visibility: shouldBeOpen ? 'visible' : 'hidden',
                  duration: 0.5,
                  ease: 'power2.out',
                  delay: shouldBeOpen ? 0.15 : 0,
                });

                if (shouldBeOpen && lottieRefs.current[index]) {
                  lottieRefs.current[index]!.goToAndPlay(0);
                }
              }

              cardStates.set(index, shouldBeOpen ? 'open' : 'closed');
            }

            gsap.set(card, {
              zIndex: totalCards + 10,
              opacity: 1,
              visibility: 'visible',
            });
          } else if (index === currentTransitionIndex + 1) {
            const shouldBeOpen = transitionProgress >= 0.5;
            const cardContent = card.querySelector('.card-content') as HTMLElement | null;
            const cardAnimation = card.querySelector('.card-animation') as HTMLElement | null;
            const currentState = cardStates.get(index);

            if (currentState !== (shouldBeOpen ? 'open' : 'closed')) {
              const targetWidth = shouldBeOpen ? activeCardWidth : peekAmount;
              const targetOpacity = shouldBeOpen ? 1 : 0;

              gsap.killTweensOf([card, cardContent, cardAnimation]);

              gsap.to(card, {
                width: targetWidth,
                flexBasis: targetWidth,
                duration: 0.6,
                ease: 'power2.inOut',
              });

              if (cardContent) {
                gsap.to(cardContent, {
                  opacity: targetOpacity,
                  visibility: shouldBeOpen ? 'visible' : 'hidden',
                  duration: 0.5,
                  ease: 'power2.out',
                  delay: shouldBeOpen ? 0.15 : 0,
                });
              }

              if (cardAnimation) {
                gsap.to(cardAnimation, {
                  opacity: targetOpacity,
                  visibility: shouldBeOpen ? 'visible' : 'hidden',
                  duration: 0.5,
                  ease: 'power2.out',
                  delay: shouldBeOpen ? 0.15 : 0,
                });

                if (shouldBeOpen && lottieRefs.current[index]) {
                  lottieRefs.current[index]!.goToAndPlay(0);
                }
              }

              cardStates.set(index, shouldBeOpen ? 'open' : 'closed');
            }

            gsap.set(card, {
              zIndex: totalCards - index + (shouldBeOpen ? totalCards : 0) + 10,
              opacity: 1,
              visibility: 'visible',
            });
          } else {
            const cardContent = card.querySelector('.card-content') as HTMLElement | null;
            const cardAnimation = card.querySelector('.card-animation') as HTMLElement | null;

            gsap.set(card, {
              width: peekAmount,
              flexBasis: peekAmount,
              zIndex: totalCards - index,
              opacity: 1,
              visibility: 'visible',
            });

            if (cardContent) {
              gsap.set(cardContent, {
                opacity: 0,
                visibility: 'hidden',
              });
            }
            if (cardAnimation) {
              gsap.set(cardAnimation, {
                opacity: 0,
                visibility: 'hidden',
              });
            }
          }
        });
      },
    });

    ScrollTrigger.refresh();

    return () => {
      scrollTrigger.kill();
      animationTriggered.clear();
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [animations.scroll1, animations.scroll2, animations.scroll3, animations.scroll4, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      const isOpen = index === openCardIndex;
      const cardAnimation = card.querySelector('.card-animation') as HTMLElement | null;
      const cardContent = card.querySelector('.card-content') as HTMLElement | null;
      gsap.set(card, {
        height: isOpen ? 'auto' : '80px',
      });
      if (cardAnimation) {
        gsap.set(cardAnimation, {
          height: isOpen ? 200 : 0,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
        });
      }
      if (cardContent) {
        gsap.set(cardContent, {
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
        });
      }
    });

    const animateCard = (index: number, isOpen: boolean) => {
      const card = cards[index];
      if (!card) return;

      const cardContent = card.querySelector('.card-content') as HTMLElement | null;
      const cardAnimation = card.querySelector('.card-animation') as HTMLElement | null;
      const targetHeight = isOpen ? 'auto' : '80px';
      const contentOpacity = isOpen ? 1 : 0;
      const animationOpacity = isOpen ? 1 : 0;
      const animationHeight = isOpen ? 200 : 0;

      gsap.killTweensOf([card, cardContent, cardAnimation]);

      gsap.to(card, {
        height: targetHeight,
        duration: 0.6,
        ease: 'power2.inOut',
      });

      if (cardAnimation) {
        gsap.to(cardAnimation, {
          height: animationHeight,
          opacity: animationOpacity,
          visibility: isOpen ? 'visible' : 'hidden',
          duration: 0.6,
          ease: 'power2.inOut',
        });
      }

      if (cardContent) {
        gsap.to(cardContent, {
          opacity: contentOpacity,
          visibility: isOpen ? 'visible' : 'hidden',
          duration: 0.5,
          ease: 'power2.out',
          delay: isOpen ? 0.15 : 0,
        });
      }

      if (cardAnimation && isOpen && lottieRefs.current[index]) {
        lottieRefs.current[index]!.goToAndPlay(0);
      }
    };

    cards.forEach((card, index) => {
      const isOpen = index === openCardIndex;
      animateCard(index, isOpen);
    });
  }, [openCardIndex, isMobile, animations.scroll1, animations.scroll2, animations.scroll3, animations.scroll4]);

  const handleCardClick = useCallback((index: number) => {
    if (isMobile) {
      setOpenCardIndex(prev => prev === index ? -1 : index);
    }
  }, [isMobile]);

  return (
    <>
      <section className="scroll-sections-container" ref={sectionRef}>
        <div className="scroll-heading">
          <h1 className="scroll-heading-text">{headingText}</h1>
        </div>

        <div className="scroll-content">
          <div className="scroll-cards-wrapper">
            <div className="scroll-cards-stack">
              {scrollData.map((item, index) => {
                const cardNumber = String(index + 1).padStart(2, '0');
                const animationKey = `scroll${index + 1}` as keyof Animations;
                const isLoading = loading[animationKey];
                const animationData = animations[animationKey];

                return (
                  <div
                    key={index}
                    ref={el => { cardsRef.current[index] = el; }}
                    className="scroll-card"
                    data-card-number={cardNumber}
                    onClick={() => handleCardClick(index)}
                    style={isMobile ? { cursor: 'pointer' } : {}}
                  >
                    <div className="card-number">{cardNumber}</div>
                    {isMobile ? (
                      <>
                        <div className="card-animation">
                          {isLoading && <div className="animation-placeholder">Loading...</div>}
                          {typeof animationData === "object" && animationData !== null && (
                            <LottieAnimation
                              ref={el => { lottieRefs.current[index] = el; }}
                              animationData={animationData}
                              className="lottie-card"
                              loop={true}
                              autoplay={false}
                            />
                          )}
                        </div>
                        <div className="card-content">
                          <div className="card-text-wrapper">
                            <div>
                              <h2 className="card-title">{item.title}</h2>
                              <p className="card-description">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="card-content">
                          <div className="card-text-wrapper">
                            <div>
                              <h2 className="card-title">{item.title}</h2>
                              <p className="card-description">{item.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="card-animation">
                          {isLoading && <div className="animation-placeholder">Loading...</div>}
                          {typeof animationData === "object" && animationData !== null && (
                            <LottieAnimation
                              ref={el => {
                                lottieRefs.current[index] = el;
                              }}
                              animationData={animationData}
                              className="lottie-card"
                              loop={true}
                              autoplay={false}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="scroll-svg-container">
          <img
            src={scrollSection.policyAppsSvgUrl || policyAppsSvgFallback}
            alt="Policy Apps"
            className="policy-apps-svg"
          />
        </div>
      </section>
    </>
  );
}

export default ScrollSections;

