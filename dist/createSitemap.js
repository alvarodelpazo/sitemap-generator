"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSitemap = void 0;
const fs_extra_1 = require("fs-extra");
const sitemapProcessor_1 = require("./node/sitemapProcessor");
const createSitemap = () => {
    const publicDir = `${process.cwd()}/public`;
    if (!(0, fs_extra_1.existsSync)(`${publicDir}/sitemap`)) {
        (0, fs_extra_1.mkdirSync)(`${publicDir}/sitemap`);
    }
    const sitemapData = sitemapProcessor_1.sitemapProcessor.getSitemapData();
    sitemapData.sitemaps.forEach((sitemap, index) => {
        (0, fs_extra_1.writeFileSync)(`${publicDir}/sitemap/sitemap.${index}.xml`, sitemap.replace(/#__slash__#/g, '/').replace(/\\\\u/g, '\\u'));
    });
    (0, fs_extra_1.writeFileSync)(`${publicDir}/sitemap/sitemap.xml`, sitemapData.index);
};
exports.createSitemap = createSitemap;
