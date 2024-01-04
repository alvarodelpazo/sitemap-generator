"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNode = exports.bootstrapProcessors = void 0;
const sitemapProcessor_1 = require("./node/sitemapProcessor");
const bootstrapProcessors = () => {
    sitemapProcessor_1.sitemapProcessor.bootstrap();
};
exports.bootstrapProcessors = bootstrapProcessors;
const processNode = (originalNode) => {
    let node = originalNode;
    node = sitemapProcessor_1.sitemapProcessor.processNode(node);
    return node;
};
exports.processNode = processNode;
