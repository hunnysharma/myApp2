import { useMemo, memo } from 'react';
import './CTASection.css';

function CTASection({ cmsData }) {
  const defaultData = useMemo(() => ({
    description: "Turn customer experience into your competitive edge",
    buttonText: "Hire Ema Today",
    buttonLink: "#",
    circleImage: null,
  }), []);

  const cmsSection = cmsData?.ctaSection || {};
  const description = cmsSection?.description || defaultData.description;
  const buttonText = cmsSection?.buttonText || defaultData.buttonText;
  const buttonLink = cmsSection?.buttonLink || defaultData.buttonLink;
  const circleImage = cmsSection?.circleImage || defaultData.circleImage;

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-left">
          {circleImage && (
            <div className="cta-circle-image-wrapper">
              <img src={circleImage} alt="CTA Circle" className="cta-circle-image" />
            </div>
          )}
        </div>
        
        <div className="cta-right">
          <p className="cta-description">{description}</p>
          <a href={buttonLink} className="cta-button">
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(CTASection);

