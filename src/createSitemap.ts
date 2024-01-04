import { existsSync, mkdirSync, writeFileSync } from 'fs-extra';

import {sitemapProcessor} from './node/sitemapProcessor';

export const createSitemap: () => void = () => {
  const publicDir = `${process.cwd()}/public`;
  if (!existsSync(`${publicDir}/sitemap`)) {
    mkdirSync(`${publicDir}/sitemap`);
  }
  const sitemapData = sitemapProcessor.getSitemapData();
  sitemapData.sitemaps.forEach((sitemap, index) => {
    writeFileSync(
      `${publicDir}/sitemap/sitemap.${index}.xml`,
      sitemap.replace(/#__slash__#/g, '/').replace(/\\\\u/g, '\\u')
    );
  });
  writeFileSync(`${publicDir}/sitemap/sitemap.xml`, sitemapData.index);
};
