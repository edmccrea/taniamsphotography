import { gql, GraphQLClient } from "graphql-request";
import type { PageServerLoad } from "./$types";

import { DATO_API_KEY } from "$env/static/private";

export const load = (async ({ request }) => {
  //TODO fix this mess
  const urlMatch = request.url.split("/");
  console.log(urlMatch[4]);
  const query = gql`
  {
    blogPost(filter: {url: {eq: "${urlMatch[4]}"}}) {
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
  return await getBlogData(query);
}) satisfies PageServerLoad;

async function getBlogData(query: string) {
  const graphQLClient = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const data: App.BlogPost = await graphQLClient.request(query);
  return data;
}
