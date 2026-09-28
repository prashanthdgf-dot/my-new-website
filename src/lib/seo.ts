/**
 * Utility to dynamically update SEO, Canonical, OpenGraph, Twitter meta tags, and JSON-LD Structured Data
 */

export const BASE_URL = 'https://www.dhanusgoldfitness.com';
export const DEFAULT_IMAGE =
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg';

export const updateMetaTags = (
  title: string,
  description: string,
  image?: string,
  path?: string
) => {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '/';
  const fullUrl = cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;
  const metaImage = image || DEFAULT_IMAGE;

  document.title = title;

  const setMeta = (attr: string, value: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${value}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, value);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard SEO
  setMeta('name', 'description', description);
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Dynamic Self-Referencing Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);

  // Open Graph
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Dhanus Gold Fitness');
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:image', metaImage);
  setMeta('property', 'og:image:secure_url', metaImage);
  setMeta('property', 'og:url', fullUrl);

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', metaImage);
};

/**
 * Injects or updates dynamic JSON-LD Schema on a specific route
 */
export const injectJsonLd = (schemaId: string, schemaData: object) => {
  let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = schemaId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(schemaData);
};

/**
 * Removes a specific dynamic JSON-LD Schema
 */
export const removeJsonLd = (schemaId: string) => {
  const scriptEl = document.getElementById(schemaId);
  if (scriptEl) {
    scriptEl.remove();
  }
};

/**
 * Injects breadcrumbs schema for a specific route
 */
export const setBreadcrumbsSchema = (items: { name: string; path: string }[]) => {
  // A breadcrumb trail must start at Home
  const trail = items[0]?.path === '/' ? items : [{ name: 'Home', path: '/' }, ...items];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${BASE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
  injectJsonLd('schema-breadcrumbs', schema);
};

/**
 * Injects FAQ schema when visible FAQs match on page
 */
export const setFaqSchema = (faqs: { question: string; answer: string }[]) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  injectJsonLd('schema-faq', schema);
};

/**
 * Page-level schema (breadcrumbs, FAQ) must not leak onto the next page, otherwise Google sees
 * an FAQPage on URLs that have no FAQ. Call before navigating.
 */
export const clearRouteSchemas = () => {
  removeJsonLd('schema-breadcrumbs');
  removeJsonLd('schema-faq');
};
