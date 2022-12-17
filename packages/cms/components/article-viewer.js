import React from "react";
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import highlight from "@bytemd/plugin-highlight-ssr";
import { Viewer } from "@bytemd/react";
import themes from "juejin-markdown-themes"
import "highlight.js/styles/atom-one-light.css";

// md editor plugins
const plugins = [
  gfm(),
  frontmatter(),
  highlight(),
  {
    viewerEffect({ file }) {
      const $style = document.createElement("style");
      $style.innerHTML =
        themes[file.frontmatter.theme]?.style ?? themes.juejin.style;
      document.head.appendChild($style);
      return () => {
        $style.remove();
      };
    },
  },
];

export default function ArticleViewer({ article }) {
  return <Viewer value={article.content} plugins={plugins} />;
}
