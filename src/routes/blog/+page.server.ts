import { gql, GraphQLClient } from "graphql-request";
import type { PageServerLoad } from "./$types";

import { DATO_API_KEY } from "$env/static/private";

export const load = (async () => {
  return await getBlogCardData();
}) satisfies PageServerLoad;

const query = gql`
  {
    allBlogPosts {
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

async function getBlogCardData() {
  const graphQLClient = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const data: App.BlogPost[] = await graphQLClient.request(query);
  return data;
}
