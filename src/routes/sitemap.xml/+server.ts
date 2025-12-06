import { gql, GraphQLClient } from 'graphql-request';
import { DATO_API_KEY } from '$env/static/private';

export async function GET() {
  const site = 'https://www.taniamccreasteele.com';
  const staticPages = [
    '',
    '/about',
    '/collections',
    '/shop',
    '/contact',
    '/blog'
  ];

  const query = gql`
    {
      allGalleryCollections {
        url
      }
      allBlogPosts {
        url
      }
    }
  `;

  const graphQLClient = new GraphQLClient('https://graphql.datocms.com/', {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const data: {
    allGalleryCollections: { url: string }[];
    allBlogPosts: { url: string }[];
  } = await graphQLClient.request(query);

  const galleryPages = data.allGalleryCollections.map(
    (gallery) => `/gallery/${gallery.url}`
  );

  const blogPages = data.allBlogPosts.map((post) => `/blog/${post.url}`);

  const pages = [...staticPages, ...galleryPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${site}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
