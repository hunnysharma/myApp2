// Sanity App SDK Configuration
// Using @sanity/sdk for React hooks and real-time updates
import { createClient } from '@sanity/sdk';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

// Validate required configuration
if (!projectId) {
  throw new Error(
    'Missing VITE_SANITY_PROJECT_ID environment variable. ' +
    'Please create a .env file with VITE_SANITY_PROJECT_ID=scmusisq'
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_API_TOKEN || '',
});

