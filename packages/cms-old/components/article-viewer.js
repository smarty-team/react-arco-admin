import React from "react";
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import highlight from "@bytemd/plugin-highlight-ssr";
import { Viewer } from "@bytemd/react";

// md editor plugins
const plugins = [gfm(), frontmatter(), highlight()];

export default function ArticleViewer({ article, ...props }) {
  return <Viewer value={article.content} plugins={plugins} {...props} />;
}
