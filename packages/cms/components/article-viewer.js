import React from "react";
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import highlight from "@bytemd/plugin-highlight-ssr";
import { Viewer } from "@bytemd/react";
import themes from "juejin-markdown-themes";
// import "highlight.js/styles/atom-one-light.css";

// md editor plugins
const plugins = [
  gfm(),
  frontmatter(),
  highlight(),
  {
    viewerEffect({ file }) {
      let $style, $link;
      if (file.frontmatter) {
        $style = document.createElement("style");
        const theme = file.frontmatter.theme;
        $style.innerHTML = themes[theme]?.style ?? themes.juejin.style;
        document.head.appendChild($style);

        const hl = file.frontmatter.highlight ?? "github";
        $link = document.createElement("link");
        $link.rel = "stylesheet";
        $link.type = "text/css";
        $link.href = `//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${hl}.min.css`;
        document.head.appendChild($link);
      }
      return () => {
        $style && $style.remove();
        $link && $link.remove();
      };
    },
  },
];

export default function ArticleViewer({ article }) {
  return <Viewer value={article.content} plugins={plugins} />;
}
