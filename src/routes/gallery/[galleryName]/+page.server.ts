import { gql, GraphQLClient } from 'graphql-request';
import type { PageServerLoad } from './$types';

import { DATO_API_KEY, DATO_CONNECTION_URL } from '$env/static/private';

export const load = (async ({ url, params }) => {
  const page = params.galleryName;
  const galleryCollection = await getGalleryCollection(page);
  return {
    pageType: page,
    ...galleryCollection,
  };
}) satisfies PageServerLoad;

const query = gql`
  query GalleryCollection($pagePath: String!) {
    galleryCollection(filter: { url: { eq: $pagePath } }) {
      title
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
      displayType
    }
  }
`;

async function getGalleryCollection(pagePath: string) {
  const graphQLClient = new GraphQLClient(DATO_CONNECTION_URL, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${DATO_API_KEY}`,
    },
    body: JSON.stringify({ query, variables: { pagePath } }),
  });

  const data: App.SiteData['galleryCollection'] = await graphQLClient.request(query);
  return data;
}
