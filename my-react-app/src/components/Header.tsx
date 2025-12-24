import { useEffect, useState, useCallback, memo } from 'react';
import { urlForImage } from '../lib/sanity';
import { fetchHeader } from '../services/cms';
import type { HeaderData } from '../types/cms';
import './Header.css';

function Header() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetchHeader()
      .then((data) => setHeaderData(data))
      .catch((error) => {
        console.error('Error fetching header data:', error);
      });
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 0);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const logo = headerData?.logo || {
    text: 'Ema',
    link: '/',
    image: null,
  };

  const navigation = headerData?.navigation || [];
  const ctaButton = headerData?.ctaButton || {
    text: 'Hire Ema',
    url: null,
  };

  const logoImageUrl = logo.image ? urlForImage(logo.image) : null;
  const dropdownArrowUrl = headerData?.dropdownArrowUrl || null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdowns({});
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scroll on body and html
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      // Cleanup
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      <header className={`header ${isScrolled ? 'sticky-header' : ''} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <div className="header-container">
          <div className={`logo ${isMobileMenuOpen ? 'hide-on-mobile-menu' : ''}`}>
            <a href={logo.link || '/'}>
              {logoImageUrl ? (
                <img
                  src={logoImageUrl}
                  alt={logo.text || 'Logo'}
                  className="logo-image"
                />
              ) : (
                <div className="logo-icon"></div>
              )}
            </a>
          </div>
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'hide-on-mobile-menu' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hamburger-icon"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="#0F7B0F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <nav className={`nav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            {/* Desktop Navigation Links */}
            {navigation.length > 0 ? (
              navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.url || '#'}
                  className={`nav-link ${item.hasDropdown ? 'dropdown' : ''}`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    dropdownArrowUrl ? (
                      <img
                        src={dropdownArrowUrl}
                        alt="Dropdown"
                        className="dropdown-arrow"
                      />
                    ) : (
                      <span className="dropdown-arrow">▼</span>
                    )
                  )}
                </a>
              ))
            ) : (
              <>
                <a href="#product" className="nav-link dropdown">
                  Product {dropdownArrowUrl ? (
                    <img src={dropdownArrowUrl} alt="Dropdown" className="dropdown-arrow" />
                  ) : (
                    <span className="dropdown-arrow">▼</span>
                  )}
                </a>
                <a href="#product" className="nav-link dropdown">
                  Product {dropdownArrowUrl ? (
                    <img src={dropdownArrowUrl} alt="Dropdown" className="dropdown-arrow" />
                  ) : (
                    <span className="dropdown-arrow">▼</span>
                  )}
                </a>
                <a href="#product" className="nav-link dropdown">
                  Product {dropdownArrowUrl ? (
                    <img src={dropdownArrowUrl} alt="Dropdown" className="dropdown-arrow" />
                  ) : (
                    <span className="dropdown-arrow">▼</span>
                  )}
                </a>
                <a href="#product" className="nav-link dropdown">
                  Product {dropdownArrowUrl ? (
                    <img src={dropdownArrowUrl} alt="Dropdown" className="dropdown-arrow" />
                  ) : (
                    <span className="dropdown-arrow">▼</span>
                  )}
                </a>
                <a href="#product" className="nav-link dropdown">
                  Product {dropdownArrowUrl ? (
                    <img src={dropdownArrowUrl} alt="Dropdown" className="dropdown-arrow" />
                  ) : (
                    <span className="dropdown-arrow">▼</span>
                  )}
                </a>
              </>
            )}
            <button
              className="btn-primary"
              onClick={() => {
                if (ctaButton.url) {
                  window.location.href = ctaButton.url;
                }
              }}
            >
              {ctaButton.text}
            </button>

            {/* Mobile Menu Structure */}
            <div className="mobile-menu-header">
              <div className="logo">
                <a href={logo.link || '/'}>
                  {logoImageUrl ? (
                    <img
                      src={logoImageUrl}
                      alt={logo.text || 'Logo'}
                      className="logo-image"
                    />
                  ) : (
                    <div className="logo-icon"></div>
                  )}
                </a>
              </div>
              <button
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="mobile-menu-content">
              {navigation.length > 0 ? (
                navigation.map((item, index) => (
                  <div key={index} className="mobile-menu-item">
                    {item.hasDropdown && item.subItems ? (
                      <>
                        <button
                          className="mobile-menu-link mobile-menu-dropdown-toggle"
                          onClick={() => toggleDropdown(index)}
                        >
                          <span>{item.label}</span>
                          <svg
                            className={`mobile-dropdown-arrow ${openDropdowns[index] ? 'open' : ''}`}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M3 4.5L6 7.5L9 4.5"
                              stroke="#1F2937"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        {openDropdowns[index] && (
                          <div className="mobile-menu-dropdown">
                            {item.subItems.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.url || '#'}
                                className="mobile-menu-sublink"
                                onClick={closeMobileMenu}
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.url || '#'}
                        className="mobile-menu-link"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className="mobile-menu-item">
                    <button
                      className="mobile-menu-link mobile-menu-dropdown-toggle"
                      onClick={() => toggleDropdown(0)}
                    >
                      <span>Products</span>
                      <svg
                        className={`mobile-dropdown-arrow ${openDropdowns[0] ? 'open' : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openDropdowns[0] && (
                      <div className="mobile-menu-dropdown">
                        <a href="#ai-employee-builder" className="mobile-menu-sublink" onClick={closeMobileMenu}>AI Employee Builder</a>
                        <a href="#pre-built-agents" className="mobile-menu-sublink" onClick={closeMobileMenu}>Pre-built AI Agents</a>
                        <a href="#generative-workflow" className="mobile-menu-sublink" onClick={closeMobileMenu}>Generative Workflow Engine</a>
                      </div>
                    )}
                  </div>
                  <div className="mobile-menu-item">
                    <button
                      className="mobile-menu-link mobile-menu-dropdown-toggle"
                      onClick={() => toggleDropdown(1)}
                    >
                      <span>Solutions</span>
                      <svg
                        className={`mobile-dropdown-arrow ${openDropdowns[1] ? 'open' : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openDropdowns[1] && (
                      <div className="mobile-menu-dropdown">
                        <a href="#customer-experience" className="mobile-menu-sublink" onClick={closeMobileMenu}>Customer Experience</a>
                        <a href="#employee-experience" className="mobile-menu-sublink" onClick={closeMobileMenu}>Employee Experience</a>
                        <a href="#sales-marketing" className="mobile-menu-sublink" onClick={closeMobileMenu}>Sales and Marketing</a>
                      </div>
                    )}
                  </div>
                  <div className="mobile-menu-item">
                    <button
                      className="mobile-menu-link mobile-menu-dropdown-toggle"
                      onClick={() => toggleDropdown(2)}
                    >
                      <span>Resources</span>
                      <svg
                        className={`mobile-dropdown-arrow ${openDropdowns[2] ? 'open' : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openDropdowns[2] && (
                      <div className="mobile-menu-dropdown">
                        <a href="#blogs" className="mobile-menu-sublink" onClick={closeMobileMenu}>Blogs</a>
                        <a href="#newsletter" className="mobile-menu-sublink" onClick={closeMobileMenu}>Newsletter</a>
                        <a href="#videos" className="mobile-menu-sublink" onClick={closeMobileMenu}>Videos</a>
                        <a href="#testimonials" className="mobile-menu-sublink" onClick={closeMobileMenu}>Customer Testimonials</a>
                        <a href="#reports" className="mobile-menu-sublink" onClick={closeMobileMenu}>Reports</a>
                        <a href="#whitepapers" className="mobile-menu-sublink" onClick={closeMobileMenu}>Whitepapers</a>
                      </div>
                    )}
                  </div>
                  <div className="mobile-menu-item">
                    <button
                      className="mobile-menu-link mobile-menu-dropdown-toggle"
                      onClick={() => toggleDropdown(3)}
                    >
                      <span>Company</span>
                      <svg
                        className={`mobile-dropdown-arrow ${openDropdowns[3] ? 'open' : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openDropdowns[3] && (
                      <div className="mobile-menu-dropdown">
                        <a href="#about" className="mobile-menu-sublink" onClick={closeMobileMenu}>About</a>
                        <a href="#careers" className="mobile-menu-sublink" onClick={closeMobileMenu}>Join the Team</a>
                        <a href="#news" className="mobile-menu-sublink" onClick={closeMobileMenu}>News</a>
                        <a href="#advisors" className="mobile-menu-sublink" onClick={closeMobileMenu}>Our Advisors</a>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="mobile-menu-footer">
              <button
                className="btn-primary mobile-cta-button"
                onClick={() => {
                  if (ctaButton.url) {
                    window.location.href = ctaButton.url;
                  }
                  closeMobileMenu();
                }}
              >
                {ctaButton.text}
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default memo(Header);

