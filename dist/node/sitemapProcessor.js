"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitemapProcessor = void 0;
let sitemapData = [];
const sitemapDataIds = new Map();
// Use a function to avoid conf to be instantiated when this file is required.
const getDomain = () => 'https://www.selfbank.es';
const setSitemapData = (node) => {
    const nodeData = {
        id: node.data.content.id,
        changed: node.data.content.changed,
        content: `<url><loc>${`${getDomain()}${node.data.content.url.path}`}</loc><lastmod>${new Date((node.data.content.changed || 1546344000) * 1000)
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
exports.sitemapProcessor = {
    getSitemapData: () => {
        const sitemaps = [];
        let sitemapIndex = 1;
        sitemaps[sitemapIndex] = [];
        const maxItems = 2000;
        const indexItems = [];
        indexItems.push(`<sitemap><loc>${getDomain()}/sitemap/sitemap.${sitemapIndex}.xml</loc></sitemap>`);
        sitemapData
            .sort((a, b) => b.changed - a.changed)
            .forEach((item, index) => {
            sitemaps[sitemapIndex].push(item.content);
            if ((index + 1) % maxItems === 0) {
                sitemapIndex += 1;
                indexItems.push(`<sitemap><loc>${getDomain()}/sitemap/sitemap.${sitemapIndex}.xml</loc></sitemap>`);
                sitemaps[sitemapIndex] = [];
            }
        });
        return {
            index: `${sitemapIndexHeader}${indexItems.join('')}${sitemapIndexFooter}`,
            sitemaps: sitemaps.map(sitemap => `${sitemapHeader}${sitemap.join('')}${sitemapFooter}`),
        };
    },
    addStaticNode: (data) => {
        setSitemapData(data);
    },
    processNode: (node) => {
        setSitemapData(node);
        return node;
    },
    bootstrap: () => {
        sitemapData = [];
    },
};
