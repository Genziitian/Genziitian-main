// Request-scoped collector used during prerender (SSR). The <Seo> component
// writes its props here at render time when there is no DOM, so the prerender
// script can emit the correct <head> into the static HTML.
export type HeadData = {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object | object[];
  image?: string;
};

export const __ssrHead: { current: HeadData | null } = { current: null };
