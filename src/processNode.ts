import { Node } from './node/Node';
import { sitemapProcessor } from './node/sitemapProcessor';

export const bootstrapProcessors = (): void => {
  sitemapProcessor.bootstrap();
};

export const processNode = (
  originalNode: Node<Record<string, unknown>>
): Node<Record<string, unknown>> => {
  let node = originalNode;
  node = sitemapProcessor.processNode(node);
  return node;
};
