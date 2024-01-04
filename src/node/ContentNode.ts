interface BaseContentNode {
  id: string;
  title: string;
  subtitle?: string;
  bundle: string;
  created: number;
  changed: number;
  isPublished: boolean;
  language: {
    id: string;
  };
  url: {
    path: string;
  };
  menuMachineName?: string;
}

export type ContentNode<T = Record<string, unknown>> = BaseContentNode & T;
