import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '0cfyzdqo',
  dataset: 'production',
  useCdn: false, // Set to `false` to ensure fresh data always during development
  apiVersion: '2024-04-12',
});
