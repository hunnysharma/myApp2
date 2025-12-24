// Sanity Client Configuration
import { createClient } from '@sanity/client';

// Get environment variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

// Validate required configuration
if (!projectId) {
  throw new Error(
    'Missing VITE_SANITY_PROJECT_ID environment variable. ' +
    'Please create a .env file with VITE_SANITY_PROJECT_ID=scmusisq'
  );
}

// Initialize Sanity client
export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: import.meta.env.DEV ? false : true, // Disable CDN in development to avoid CORS issues
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
  token: import.meta.env.VITE_SANITY_API_TOKEN || '', // Optional, for authenticated requests
});

interface ImageSource {
  asset?: {
    url?: string;
    _ref?: string;
  };
  _type?: string;
}

interface ImageOptions {
  format?: string;
  [key: string]: string | number | undefined;
}

// Helper function to get image URL from Sanity image reference
export function urlForImage(source: ImageSource | string | null | undefined, options: ImageOptions = {}): string | null {
  if (!source) return null;

  const { format, ...otherParams } = options;

  // If it's already a URL string, return it (or add format if needed)
  if (typeof source === 'string') {
    if (format && !source.includes('format=')) {
      const separator = source.includes('?') ? '&' : '?';
      return `${source}${separator}format=${format}`;
    }
    return source;
  }

  // If it has a direct URL (from GROQ query with asset->)
  if (source.asset?.url) {
    let url = source.asset.url;

    // Build query parameters
    const params = new URLSearchParams();
    if (format) {
      params.append('format', format);
    }
    // Add other query parameters
    Object.entries(otherParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    if (params.toString()) {
      const separator = url.includes('?') ? '&' : '?';
      url = `${url}${separator}${params.toString()}`;
    }

    return url;
  }

  // If it's a Sanity image reference object with _ref
  if (source.asset?._ref) {
    const imageRef = source.asset._ref;
    const [_file, id, extension] = imageRef.split('-');
    const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
    let url = `https://cdn.sanity.io/images/${import.meta.env.VITE_SANITY_PROJECT_ID}/${dataset}/${id}-${extension}`;

    // Build query parameters
    const params = new URLSearchParams();
    if (format) {
      params.append('format', format);
    }
    Object.entries(otherParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    if (params.toString()) {
      url = `${url}?${params.toString()}`;
    }

    return url;
  }

  // If it's a direct asset reference
  if (source._type === 'image' && source.asset) {
    return urlForImage(source, options);
  }

  return null;
}

interface FileSource {
  asset?: {
    _ref?: string;
  };
}

// Helper function to get SVG URL from Sanity file reference
export function urlForFile(source: FileSource | string | null | undefined): string | null {
  if (!source) return null;

  // If it's already a URL string, return it
  if (typeof source === 'string') {
    return source;
  }

  // If it's a Sanity file reference object
  if (source.asset?._ref) {
    const fileRef = source.asset._ref;
    const [_file, id, extension] = fileRef.split('-');
    const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
    return `https://cdn.sanity.io/files/${import.meta.env.VITE_SANITY_PROJECT_ID}/${dataset}/${id}.${extension}`;
  }

  return null;
}

