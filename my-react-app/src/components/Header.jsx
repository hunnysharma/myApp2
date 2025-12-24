import { useEffect, useState, useCallback, memo } from 'react';
import { urlForImage } from '../lib/sanity';
import { fetchHeader } from '../services/cms';
import './Header.css';

function Header() {
  const [headerData, setHeaderData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetchHeader()
      .then(data => setHeaderData(data))
      .catch(() => {});
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

  return (
    <header className={`header ${isScrolled ? 'sticky-header' : ''}`}>
      <div className="header-container">
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
        <nav className="nav">
          {navigation.length > 0 ? (
            navigation.map((item, index) => (
              <a 
                key={index} 
                href={item.url} 
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
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);

