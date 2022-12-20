import * as icons from '@icon-park/svg';
import type { BytemdPlugin, BytemdViewerContext } from 'bytemd';
import themes from 'juejin-markdown-themes';

type VFile = BytemdViewerContext['file'];

interface VFileWithFm extends VFile {
  frontmatter: {
    theme: string;
    highlight: string;
  };
}

export default function theme(): BytemdPlugin {
  return {
    viewerEffect(ctx) {
      const file = ctx.file as VFileWithFm;
      let $style, link;
      if (file.frontmatter) {
        $style = document.createElement('style');
        const theme = file.frontmatter.theme;
        $style.innerHTML = themes[theme]?.style ?? themes.juejin.style;
        document.head.appendChild($style);

        const hl = file.frontmatter.highlight ?? 'github';
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${hl}.min.css`;
        document.head.appendChild(link);
      }

      return () => {
        $style && $style.remove();
        link && link.remove();
      };
    },
    actions: [
      {
        title: 'markdown主题',
        icon: icons.Theme({}),
        handler: {
          type: 'dropdown',
          actions: Object.keys(themes).map((key) => ({
            title: key,
            handler: {
              type: 'action',
              click({ editor }) {
                const theme = themes[key];
                const highlight = theme.highlight
                  ? '\nhighlight: ' + theme.highlight
                  : '';
                editor.setSelection({ line: 1, ch: 0 })
                editor.replaceSelection('---\ntheme: ' + key + highlight + '\n---\n');
                editor.focus();
              },
            },
          })),
        },
      },
    ],
  };
}
