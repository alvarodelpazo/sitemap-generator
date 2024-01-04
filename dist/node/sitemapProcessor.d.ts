import { Node } from "./Node";
export declare const sitemapProcessor: {
    getSitemapData: () => {
        index: string;
        sitemaps: string[];
    };
    addStaticNode: (data: Node<Record<string, unknown>>) => void;
    processNode: (node: Node<Record<string, unknown>>) => Node<Record<string, unknown>>;
    bootstrap: () => void;
};
