import { ContentNode } from './ContentNode';

export interface Node<T = Record<string, unknown>> {
  data: {
    content: ContentNode<T>;
  };
}
