import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'm0jz8vp9',
    dataset: 'production',  
    useCdn: true,
    apiVersion: '2024-07-25',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
  }