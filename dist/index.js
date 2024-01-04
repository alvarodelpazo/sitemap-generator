"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitemapService = void 0;
const processNode_1 = require("./processNode");
const createSitemap_1 = require("./createSitemap");
exports.sitemapService = {
    createSitemap: createSitemap_1.createSitemap,
    processNode: processNode_1.processNode,
    bootstrapProcessors: processNode_1.bootstrapProcessors
};
