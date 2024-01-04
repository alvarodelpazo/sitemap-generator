import { Node } from "./Node";

type nodeData = {
  id: string;
  changed: number;
  content: string;
};

let sitemapData: nodeData[] = [];
const sitemapDataIds = new Map();

// Use a function to avoid conf to be instantiated when this file is required.
const getDomain = (value: string) => value;

const setSitemapData = (node: Node<Record<string, unknown>>) => {
  const nodeData: nodeData = {
    id: node.data.content.id,
    changed: node.data.content.changed,
    content: `<url><loc>${`${getDomain()}${node.data.content.url.path}`}</loc><lastmod>${new Date(
      (node.data.content.changed || 1546344000) * 1000
    )
      .toISOString()
      .replace('000Z', '000000Z')}</lastmod></url>`,
  };
  sitemapData.push(nodeData);
  sitemapDataIds.set(nodeData.id, true);
};
const sitemapHeader = `<?xml version='1.0' encoding='utf-8'?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
const sitemapFooter = '</urlset>';
const sitemapIndexHeader = `<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const sitemapIndexFooter = '</sitemapindex>';

export const sitemapProcessor = {
  getSitemapData: (): {
    index: string;
    sitemaps: string[];
  } => {
    const sitemaps: string[][] = [];
    let sitemapIndex = 1;
    sitemaps[sitemapIndex] = [];
    const maxItems = 2000;
    const indexItems: string[] = [];
    indexItems.push(
      `<sitemap><loc>${getDomain()}/sitemap/sitemap.${sitemapIndex}.xml</loc></sitemap>`
    );
    sitemapData
      .sort((a, b) => b.changed - a.changed)
      .forEach((item, index) => {
        sitemaps[sitemapIndex].push(item.content);
        if ((index + 1) % maxItems === 0) {
          sitemapIndex += 1;
          indexItems.push(
            `<sitemap><loc>${getDomain()}/sitemap/sitemap.${sitemapIndex}.xml</loc></sitemap>`
          );
          sitemaps[sitemapIndex] = [];
        }
      });

    return {
      index: `${sitemapIndexHeader}${indexItems.join('')}${sitemapIndexFooter}`,
      sitemaps: sitemaps.map(sitemap => `${sitemapHeader}${sitemap.join('')}${sitemapFooter}`),
    };
  },

  addStaticNode: (data: Node<Record<string, unknown>>): void => {
    setSitemapData(data);
  },

  processNode: (node: Node<Record<string, unknown>>): Node<Record<string, unknown>> => {
    setSitemapData(node);
    return node;
  },
  bootstrap: (): void => {
    sitemapData = [];
  },
};
