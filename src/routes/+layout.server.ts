import { gql, GraphQLClient } from "graphql-request";
import type { LayoutServerLoad } from "./$types";

import { DATO_API_KEY } from "$env/static/private";

export const load = (async () => {
  return await getSiteData();
}) satisfies LayoutServerLoad;

const query = gql`
  {
    startPageCollection {
      startPageGallery {
        images {
          basename
          url
        }
      }
    }

    about {
      aboutText
      pageTitle
      profileImage {
        url
      }
    }
  }
`;

async function getSiteData() {
  const graphQLClient = new GraphQLClient("https://graphql.datocms.com/", {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const data = await graphQLClient.request(query);
  return data;
}
