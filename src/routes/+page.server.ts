import { gql, GraphQLClient } from "graphql-request";
import type { PageServerLoad } from "./$types";

import { DATO_API_KEY } from "$env/static/private";

export const load = (() => {
  return getStartPageImages();
}) satisfies PageServerLoad;

const query = gql`
  query {
    startPageCollection {
      startPageGallery {
        images {
          basename
          url
        }
      }
    }
  }
`;

async function getStartPageImages() {
  const graphQLClient = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const data = await graphQLClient.request(query);
  return data;
}
