import { Input } from '@arco-design/web-react';
import React from 'react';

import 'bytemd/dist/index.css';
import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import '../style/index.css';

// md editor plugins
const plugins = [gfm()];

export function ArticleEditor({
  article,
  setArticle,
}) {
  return (
    <>
      <Input
        value={article.title}
        onChange={(title) => {
          setArticle({ ...article, title });
        }}
      ></Input>
      <Editor
        value={article.content}
        plugins={plugins}
        onChange={(content) => {
          setArticle({ ...article, content });
        }}
      />
    </>
  );
}
