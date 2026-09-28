/**
 * Crawler-readable content injected inside <div id="root"> by the server.
 * React's createRoot().render() replaces it as soon as the app loads, so visitors never see it,
 * but search engines and link-preview bots get real text (heading, summary, address, links)
 * in the very first HTML response instead of an empty div.
 */
const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LINKS: Array<[string, string]> = [
  ['/gym-in-kengeri', 'Gym in Kengeri'],
  ['/personal-training-kengeri', 'Personal training in Kengeri'],
  ['/weight-loss-training-kengeri', 'Weight loss training'],
  ['/muscle-building-kengeri', 'Muscle building & strength training'],
  ['/womens-fitness-kengeri', "Women's fitness"],
  ['/group-fitness', 'Group fitness & Zumba'],
  ['/nutrition-guidance', 'Nutrition guidance'],
  ['/transformations', 'Member transformations'],
  ['/trainers', 'Our trainers'],
  ['/reviews', 'Member reviews'],
  ['/faq', 'FAQ'],
  ['/about', 'About us'],
  ['/contact', 'Contact & location'],
];

export function buildCrawlerShell(title: string, description: string, path: string): string {
  const heading = title.split('|')[0].trim();
  const links = LINKS.filter(([href]) => href !== path)
    .map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`)
    .join('');
  return (
    `<div data-crawler-shell="1">` +
    `<h1>${esc(heading)}</h1>` +
    `<p>${esc(description)}</p>` +
    `<p>Dhanus Gold Fitness, 3rd &amp; 4th Floor, No. 18, Hoysala Circle, Outer Ring Road, above Trends Junior, ` +
    `Kengeri Satellite Town, Bengaluru 560060. Phone / WhatsApp: <a href="tel:+919740018911">+91 97400 18911</a>. ` +
    `Open Monday–Saturday 5:30 AM–10:00 PM, Sunday 5:00 PM–9:00 PM.</p>` +
    `<nav aria-label="Main pages"><ul>${links}</ul></nav>` +
    `</div>`
  );
}
