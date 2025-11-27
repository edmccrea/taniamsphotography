export async function GET() {
  const site = 'https://www.taniamccreasteele.com';

  const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
