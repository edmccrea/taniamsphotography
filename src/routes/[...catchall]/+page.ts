import type { PageLoad } from "./$types";

export const load = (({ url }) => {
  return {
    pageType: url.pathname.slice(1),
  };
}) satisfies PageLoad;
