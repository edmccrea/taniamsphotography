import { gql } from 'graphql-request';
import { dato } from '#lib/server/graphql.js';

export const prerender = true;

export async function GET() {
  const site = 'https://www.taniamccreasteele.com';
  const staticPages = ['', '/about', '/gallery', '/shop', '/contact', '/blog'];

  const data = await dato<{
    allGalleryCollections: { url: string }[];
    allBlogPosts: { url: string }[];
  }>(gql`
    {
      allGalleryCollections(first: 100) {
        url
      }
      allBlogPosts(first: 100) {
        url
      }
    }
  `);

  const pages = [
    ...staticPages,
    ...data.allGalleryCollections.map(gallery => `/gallery/${gallery.url}`),
    ...data.allBlogPosts.map(post => `/blog/${post.url}`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    page => `  <url>
    <loc>${site}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
