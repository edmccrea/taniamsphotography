import { gql, GraphQLClient } from 'graphql-request';
import type { PageServerLoad } from './$types';
import type { BlogPost } from '../../../types';
import { DATO_API_KEY } from '$env/static/private';

export const load = (async ({ request }) => {
  //TODO fix this mess
  const url = new URL(request.url);
  const urlMatch = url.pathname.split('/');
  const allBlogPostsQuery = gql`
    {
      allBlogPosts(filter: {url: {neq: "${urlMatch[2]}"}} orderBy: publishDate_DESC first: 4) {
        title
        category
        excerpt
        publishDate
        id
        url
        cardImage {
          responsiveImage(imgixParams: { auto: format, w: "500", q: "45" }) {
            base64
            bgColor
            src
            srcSet
          }
        }
      }
    }
  `;
  const query = gql`
  {
    blogPost(filter: {url: {eq: "${urlMatch[2]}"}}) {
      title
      category
      content {
        ... on ImageBlockRecord {
          image {
            responsiveImage(imgixParams: { auto: format, w: "1400", q: "100" }) {
              base64
              bgColor
              src
              srcSet
              width
              height
              aspectRatio
              alt
              title
            }
            blurUpThumb
          }
          caption
          id
        }
        ... on SubtitleBlockRecord {
          subtitle
          id
        }
        ... on TextBlockRecord {
          text
          id
        }
      }
      excerpt
      publishDate
      id
      url
      cardImage {
        responsiveImage(imgixParams: { auto: format, w: "500", q: "45" }) {
          base64
          bgColor
          src
          srcSet
        }
      }
    }
  }
`;
  return await getBlogData(query, allBlogPostsQuery);
}) satisfies PageServerLoad;

async function getBlogData(query: string, allBlogPostsQuery: string) {
  const graphQLClient = new GraphQLClient('https://graphql.datocms.com/', {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const blogPost: { blogPost: BlogPost } = await graphQLClient.request(query);
  const allBlogPosts: { allBlogPosts: BlogPost[] } = await graphQLClient.request(allBlogPostsQuery);
  return { ...blogPost, ...allBlogPosts };
}
