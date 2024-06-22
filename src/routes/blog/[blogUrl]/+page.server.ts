import { gql, GraphQLClient } from "graphql-request";
import type { PageServerLoad } from "./$types";

import { DATO_API_KEY } from "$env/static/private";

export const load = (async ({ params }) => {
  const blogUrl = params.blogUrl;
  const latestPostsQuery = gql`
  {
    allBlogPosts(orderBy: publishDate_DESC, first: 3, filter: {url: {neq: "${blogUrl}"}}) {
      title
      url
    }
  }
`;

  const query = gql`
  {
    blogPost(filter: {url: {eq: "${blogUrl}"}}) {
      title
      category
      content {
        ... on ImageBlockRecord {
          image {
            responsiveImage(imgixParams: { auto: format, w: "700", q: "45" }) {
              base64
              bgColor
              src
              srcSet
            }
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

  const blogPost = await getBlogData(query);
  const latestPosts = await getLatestPosts(latestPostsQuery);
  return {
    blogPost,
    latestPosts,
  };
}) satisfies PageServerLoad;

async function getBlogData(query: string) {
  const graphQLClient = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const { blogPost } = (await graphQLClient.request(query)) as {
    blogPost: App.BlogPost;
  };
  return blogPost;
}

const getLatestPosts = async (query: string) => {
  const graphQLClient = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const { allBlogPosts } = (await graphQLClient.request(query)) as {
    allBlogPosts: App.BlogPost[];
  };
  return allBlogPosts;
};
