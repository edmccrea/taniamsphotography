import { error } from '@sveltejs/kit';
import { prerender } from '$app/server';
import { gql } from 'graphql-request';
import * as v from 'valibot';
import { dato } from '#lib/server/graphql.js';
import type { About, BlogCard, BlogPost, Gallery, GalleryCard, Image } from '#lib/types.js';

const slug = v.pipe(v.string(), v.minLength(1), v.maxLength(200));

const IMAGE_FIELDS = 'src srcSet sizes width height alt base64';
const GALLERY_IMAGE = `responsiveImage(imgixParams: { auto: format, h: "1024", q: "45" }) { ${IMAGE_FIELDS} }`;
const COVER_IMAGE = `responsiveImage(imgixParams: { auto: format, w: "800", q: "45" }) { ${IMAGE_FIELDS} }`;
const CARD_IMAGE = `responsiveImage(imgixParams: { auto: format, w: "500", q: "45" }) { ${IMAGE_FIELDS} }`;
const POST_IMAGE = `responsiveImage(imgixParams: { auto: format, w: "1400", q: "100" }) { ${IMAGE_FIELDS} }`;

const BLOG_CARD_FIELDS = `
  id title category excerpt publishDate url
  cardImage { ${CARD_IMAGE} }
`;

export const getHomeGallery = prerender(async () => {
  const data = await dato<{ startPageCollection: { startPageGallery: { images: Image[] }[] } }>(gql`
    { startPageCollection { startPageGallery { images { ${GALLERY_IMAGE} } } } }
  `);
  return data.startPageCollection.startPageGallery.map(column => column.images);
});

export const getAbout = prerender(async () => {
  const data = await dato<{ about: About }>(gql`
    { about { aboutText pageTitle profileImage { ${GALLERY_IMAGE} } } }
  `);
  return data.about;
});

export const getGalleryIndex = prerender(async (): Promise<GalleryCard[]> => {
  const data = await dato<{
    allGalleryCollections: { title: string; url: string; images: Image[] }[];
  }>(gql`
    { allGalleryCollections(orderBy: position_ASC, first: 100) { title url images { ${COVER_IMAGE} } } }
  `);
  return data.allGalleryCollections.map(({ title, url, images }) => ({
    title,
    url,
    cover: images[0] ?? null,
    count: images.length,
  }));
});

export const getGallery = prerender(slug, async (url): Promise<Gallery> => {
  const data = await dato<{ galleryCollection: Gallery | null }>(
    gql`
      query Gallery($url: String!) {
        galleryCollection(filter: { url: { eq: $url } }) {
          title
          displayType
          images { ${GALLERY_IMAGE} }
        }
      }
    `,
    { url },
  );
  if (!data.galleryCollection) error(404, 'Gallery not found');
  return data.galleryCollection;
});

export const getBlogIndex = prerender(async () => {
  const data = await dato<{ allBlogPosts: BlogCard[] }>(gql`
    { allBlogPosts(orderBy: publishDate_DESC, first: 100) { ${BLOG_CARD_FIELDS} } }
  `);
  return data.allBlogPosts;
});

export const getBlogPost = prerender(slug, async url => {
  const data = await dato<{ blogPost: BlogPost | null; allBlogPosts: BlogCard[] }>(
    gql`
      query BlogPost($url: String!) {
        blogPost(filter: { url: { eq: $url } }) {
          ${BLOG_CARD_FIELDS}
          content {
            __typename
            ... on ImageBlockRecord { id caption image { ${POST_IMAGE} } }
            ... on SubtitleBlockRecord { id subtitle }
            ... on TextBlockRecord { id text }
          }
        }
        allBlogPosts(filter: { url: { neq: $url } }, orderBy: publishDate_DESC, first: 4) {
          ${BLOG_CARD_FIELDS}
        }
      }
    `,
    { url },
  );
  if (!data.blogPost) error(404, 'Post not found');
  return { post: data.blogPost, related: data.allBlogPosts };
});
