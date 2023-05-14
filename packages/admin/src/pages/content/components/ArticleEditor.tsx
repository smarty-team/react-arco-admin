import { Input } from '@arco-design/web-react';
import React from 'react';

import 'bytemd/dist/index.css';
import gfm from '@bytemd/plugin-gfm';
import frontmatter from '@bytemd/plugin-frontmatter';
import highlight from '@bytemd/plugin-highlight';

import { Editor } from '@bytemd/react';
import '../style/index.css';
import theme from './plugins/plugin-theme';
import iframe from './plugins/plugin-iframe';

// md editor plugins
const plugins = [gfm(), frontmatter(), highlight(), theme(), iframe()];

export function ArticleEditor({ article, setArticle }) {
  return (
    <div>
      <Input
        value={article.title || ''}
        onChange={(title) => {
          setArticle({ ...article, title });
        }}
        autoFocus={true}
        placeholder="输入文章标题"
        size="large"
        style={{ fontSize: 32, fontWeight: 'bold' }}
      ></Input>
      <Editor
        value={article.content}
        plugins={plugins}
        editorConfig={{ autofocus: true }}
        onChange={(content) => {
          setArticle({ ...article, content });
        }} remarkRehype={{allowDangerousHtml: true}}
      />
    </div>
  );
}
