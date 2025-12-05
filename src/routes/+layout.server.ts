import { gql, GraphQLClient } from 'graphql-request';
import type { LayoutServerLoad } from './$types';
import type { SiteData } from '../types';

import { DATO_API_KEY, DATO_CONNECTION_URL } from '$env/static/private';

export const load = (async () => {
  return await getSiteData();
}) satisfies LayoutServerLoad;

const query = gql`
  {
    startPageCollection {
      startPageGallery {
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

    about {
      aboutText
      pageTitle
      profileImage {
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

    allGalleryCollections(orderBy: displayType_DESC) {
      title
      url
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
`;

async function getSiteData() {
  const graphQLClient = new GraphQLClient(DATO_CONNECTION_URL, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${DATO_API_KEY}`,
    },
  });

  const data: SiteData = await graphQLClient.request(query);
  return data;
}
