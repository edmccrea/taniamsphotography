import { gql, GraphQLClient } from "graphql-request";
import type { PageServerLoad } from "./$types";

import { DATO_API_KEY, DATO_CONNECTION_URL } from "$env/static/private";

export const load = (async ({ url }) => {
  const galleryCollection = await getGalleryCollection();
  return {
    pageType: url.pathname.slice(1),
    ...galleryCollection,
  };
}) satisfies PageServerLoad;

const query = gql`
  {
    galleryCollection {
      title
      gallery {
        title
        displayType
        images {
          responsiveImage(imgixParams: { auto: format, h: "1024", q: "45" }) {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            base64
          }
          blurUpThumb
        }
      }
    }
  }
`;

async function getGalleryCollection() {
  const graphQLClient = new GraphQLClient(DATO_CONNECTION_URL, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const data: App.SiteData["galleryCollection"] = await graphQLClient.request(
    query
  );
  return data;
}
