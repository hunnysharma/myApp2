import { useState, useMemo, memo } from 'react';
import './InteractiveCardSection.css';
import ComplianceSVG from '../assets/compliance.svg';
import GoBeyondSVG from '../assets/gobeyond.svg';

function InteractiveCardSection({ cmsData }) {
  const [activeView, setActiveView] = useState('before');

  const section = useMemo(() => (cmsData?.interactiveCardSection || {
    title: 'Go Beyond Typical Search',
    description: 'Traditional enterprise search tools only point you to possible answers. Ema\'s agentic intelligence does the work— querying multiple sources, running analytics, building visualizations, and automating actions. It\'s like having an entire team of AI employees ready to act on your behalf.',
    beforeCard: {
      title: 'BEFORE',
      description: 'Traditional enterprise search tools only point you to possible answers.',
      svgImageUrl: null,
    },
    afterCard: {
      title: 'AFTER',
      description: 'Ema\'s agentic intelligence does the work—querying multiple sources, running analytics, building visualizations, and automating actions.',
      svgImageUrl: null,
    },
  }), [cmsData?.interactiveCardSection]);

  const beforeSvg = useMemo(() => section.beforeCard?.svgImageUrl || ComplianceSVG, [section.beforeCard?.svgImageUrl]);
  const afterSvg = useMemo(() => section.afterCard?.svgImageUrl || GoBeyondSVG, [section.afterCard?.svgImageUrl]);

  return (
    <section className="interactive-card-section">
      <div className="interactive-container">
        <div className="interactive-content">
          <div className="interactive-text">
            <h2 className="interactive-title">{section.title}</h2>
            <p className="interactive-description">{section.description}</p>
          </div>
          <div className="interactive-visual">
            <div className="card-controls">
              <button
                className={`control-btn ${activeView === 'before' ? 'active' : ''}`}
                onClick={() => setActiveView('before')}
              >
                {section.beforeCard?.title || 'BEFORE'}
              </button>
              <button
                className={`control-btn ${activeView === 'after' ? 'active' : ''}`}
                onClick={() => setActiveView('after')}
              >
                {section.afterCard?.title || 'AFTER'}
              </button>
            </div>
            <div className="card-display">
              <div className="svg-container">
                {activeView === 'before' ? (
                  <img src={beforeSvg} alt="Before - Compliance Analysis" className="card-svg" />
                ) : (
                  <img src={afterSvg} alt="After - Go Beyond" className="card-svg" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(InteractiveCardSection);

