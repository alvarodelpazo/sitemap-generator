import { processNode, bootstrapProcessors } from "./processNode"
import { createSitemap } from "./createSitemap"

export const sitemapService = {
    createSitemap,
    processNode,
    bootstrapProcessors
}