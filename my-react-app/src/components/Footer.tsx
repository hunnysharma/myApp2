import { useMemo, memo } from 'react';
import './Footer.css';
import type { CMSData } from '../types/cms';

interface FooterProps {
  cmsData?: CMSData | null;
}

function Footer({ cmsData }: FooterProps) {
  const defaultData = useMemo(() => ({
    logo: {
      text: 'Ema',
      tagline: 'Your Universal AI Employee',
    },
    email: 'ask@ema.co',
    address: '321 Castro St\nMountain View, CA 94041',
    socialLinks: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ema-ai', icon: 'linkedin' },
      { name: 'Twitter', url: 'https://twitter.com/ema_ai', icon: 'twitter' },
    ],
    sections: [
      {
        title: 'Solutions',
        links: [
          { label: 'Customer Support', url: 'https://www.ema.co/customer-support' },
          { label: 'Data Professional', url: 'https://www.ema.co/personas#Data-Professional' },
          { label: 'Employee Assistant', url: 'https://www.ema.co/personas#Employee-Assistant' },
          { label: 'Pharmacist Assistant', url: 'https://www.ema.co/personas#Pharmacist-Assistant' },
          { label: 'Proposal Manager', url: 'https://www.ema.co/personas#Proposal-Manager' },
          { label: 'Compliance Analyst', url: 'https://www.ema.co/personas#Compliance-Analyst' },
          { label: 'FAQs', url: 'https://support.ema.co/' },
          { label: 'Partners', url: 'https://www.ema.co/partners' },
          { label: 'Integrations', url: 'https://www.ema.co/integrations' },
          { label: 'Intelligent Actions', url: 'https://www.ema.co/intelligent-actions' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Blogs', url: 'https://www.ema.co/blog' },
          { label: 'Customers', url: 'https://www.ema.co/resources#customer' },
          { label: 'Videos', url: 'https://www.ema.co/resources#videos' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', url: 'https://www.ema.co/about-us' },
          { label: 'Join the team', url: 'https://www.ema.co/careers' },
          { label: 'News', url: 'https://www.ema.co/news' },
          { label: 'Our Advisors', url: 'https://www.ema.co/advisors' },
        ],
      },
    ],
    legalLinks: [
      { label: 'Privacy Policy', url: '/privacy-policy' },
      { label: 'Cookie Settings', url: '#', isButton: true },
    ],
    copyright: '© 2024 Ema | Privacy Policy',
  }), []);

  const cmsFooter = cmsData?.footer || {};
  const logo = cmsFooter.logo || defaultData.logo;
  const email = cmsFooter.email || defaultData.email;
  const address = cmsFooter.address || defaultData.address;
  const socialLinks = cmsFooter.socialLinks && cmsFooter.socialLinks.length > 0
    ? cmsFooter.socialLinks
    : defaultData.socialLinks;
  const sections = cmsFooter.sections && cmsFooter.sections.length > 0
    ? cmsFooter.sections
    : defaultData.sections;
  const legalLinks = cmsFooter.legalLinks && cmsFooter.legalLinks.length > 0
    ? cmsFooter.legalLinks
    : defaultData.legalLinks;
  const copyright = cmsFooter.copyright || defaultData.copyright;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <svg width="113" height="36" viewBox="0 0 113 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Ema Logo">
                  <path id="Fill 2" fillRule="evenodd" clipRule="evenodd" d="M84.8039 17.7558C86.0414 17.7558 87.3636 18.5652 87.3636 20.8369V31.3699H92.9555V19.5002C92.9555 13.6142 88.7919 12.9785 87.0019 12.9785C84.5036 12.9785 82.7604 13.8329 81.1729 15.8348L81.0175 16.0306L80.903 15.8074C79.6441 13.3462 77.1219 12.9785 75.7309 12.9785C73.7281 12.9785 72.0692 13.8206 70.6596 15.5526L70.3731 15.9046V13.3434H64.7812V31.3699H70.3731V19.9058L70.3911 19.8703C71.0858 18.5067 72.2013 17.7558 73.5327 17.7558C74.7702 17.7558 76.0923 18.5652 76.0923 20.8369V31.3699H81.6845V19.8643L81.7036 19.828C82.4166 18.4725 83.4886 17.7558 84.8039 17.7558Z" fill="white"></path>
                  <path id="Fill 4" fillRule="evenodd" clipRule="evenodd" d="M106.475 26.4356L106.402 26.4842C105.475 27.0985 104.35 27.7265 103.036 27.7265C101.748 27.7265 100.916 27.0261 100.916 25.942C100.916 24.7229 101.958 24.3658 103.118 24.0807C103.808 23.9059 105.228 23.7396 106.298 23.6315L106.475 23.6132V26.4356ZM113.002 29.8941C112.032 28.9101 111.748 27.9265 111.748 26.6149V19.3374C111.748 15.3299 109.029 12.9375 104.475 12.9375C102.288 12.9375 100.251 13.3275 98.5788 14.0657L97.3582 19.2781C99.4634 18.2405 101.454 17.7554 103.596 17.7554C105.56 17.7554 106.475 18.5026 106.475 20.1073V20.8249L106.328 20.8378C104.311 21.0143 101.534 21.3322 99.7635 21.845C96.7762 22.6965 95.3242 24.3679 95.3242 26.9546C95.3242 29.6122 97.6902 31.7745 100.598 31.7745C102.832 31.7745 104.782 30.8764 106.558 29.0285L106.835 28.7397C106.835 28.7397 106.857 30.2215 108.797 31.8609L113.002 29.8941Z" fill="white"></path>
                  <path id="Fill 6" fillRule="evenodd" clipRule="evenodd" d="M49.7012 26.1874L49.7353 25.9944C50.0652 24.1359 50.2827 22.2171 50.3829 20.2908L50.3908 20.1356H59.913V15.2598H50.3831L50.3746 15.1051C50.2704 13.2248 50.0521 11.3464 49.7258 9.52125L49.6915 9.32822H61.5994L60.6591 4.09375H42.3828C43.9542 8.18322 44.7837 12.9108 44.7837 17.7847C44.7837 22.6307 43.9628 27.3359 42.4081 31.41H61.019L61.9591 26.1874H49.7012Z" fill="white"></path>
                  <path id="Fill 8" fillRule="evenodd" clipRule="evenodd" d="M18.1279 36C26.841 36 34.1643 30.0896 36.2585 22.0903C33.9017 26.1014 29.5216 28.62 24.5067 28.62C21.9886 28.62 20.2608 28.0606 18.2383 26.8762C25.9091 27.7522 32.3585 23.901 34.09 17.4856C36.2732 8.74298 28.9205 0 18.1292 0C8.10207 0 0 8.05888 0 17.9999C0 27.9411 8.11674 36 18.1292 36H18.1279Z" fill="white"></path>
                </g>
              </svg>
            </div>
            {logo?.tagline && (
              <p className="footer-tagline">{logo.tagline}</p>
            )}
            <button className="footer-email-button">
              {email}
            </button>
          </div>
          <div className="footer-address-section">
            <div className="footer-address">{address?.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < (address?.split('\n').length || 1) - 1 && <br />}
              </span>
            ))}</div>
            {legalLinks && legalLinks.map((link, index) => (
              <a key={index} href={link.url} className="footer-legal-link">
                {link.label}
              </a>
            ))}
          </div>
          {socialLinks && socialLinks.length > 0 && (
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.name}
                >
                  {social.icon === 'linkedin' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                    </svg>
                  )}
                  {social.icon === 'twitter' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="footer-right">
          {sections && sections.map((section, index) => (
            <div key={index} className="footer-nav-section">
              <a href={section.title === 'Solutions' ? 'https://www.ema.co/personas' : section.title === 'Resources' ? 'https://www.ema.co/resources' : 'https://www.ema.co/about-us'} className="footer-nav-title" target="_blank" rel="noopener noreferrer">
                {section.title}
              </a>
              <div className="footer-nav-links">
                {section.links && section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    className="footer-nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {copyright && (
        <div className="footer-bottom">
          <p className="footer-copyright">{copyright}</p>
        </div>
      )}
    </footer>
  );
}

export default memo(Footer);

