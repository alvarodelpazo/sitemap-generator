export declare const sitemapService: {
    createSitemap: () => void;
    processNode: (originalNode: import("./node/Node").Node<Record<string, unknown>>) => import("./node/Node").Node<Record<string, unknown>>;
    bootstrapProcessors: () => void;
};
