import { useEffect } from 'react';

type Props = {
  title: string;
  description: string;
  canonical: string;
  /** JSON-LD object or array of objects, injected as <script type="application/ld+json"> */
  jsonLd?: object | object[];
  image?: string;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-page <head> manager — sets title, description, canonical, Open Graph and
 * JSON-LD. No external deps. Written to be snapshot-friendly for the planned
 * SSG/prerender step (the head it produces is what a prerender will capture).
 */
export default function Seo({ title, description, canonical, jsonLd, image }: Props) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', canonical);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }

    const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    const nodes = blocks.map((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', 'jsonld');
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
      return s;
    });
    return () => { nodes.forEach((n) => n.remove()); };
  }, [title, description, canonical, image, JSON.stringify(jsonLd)]);

  return null;
}
