import { Suspense } from 'react';
import { SanityProvider } from '@sanity/sdk-react';
import { sanityClient } from '../lib/sanity-sdk';

function LoadingFallback() {
  return (
    <div className="loading-screen">
      <div className="loader"></div>
    </div>
  );
}

export function CMSProvider({ children }) {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET;

  if (!projectId || !dataset) {
    return <>{children}</>;
  }

  return (
    <SanityProvider client={sanityClient}>
      <Suspense fallback={<LoadingFallback />}>
        {children}
      </Suspense>
    </SanityProvider>
  );
}

