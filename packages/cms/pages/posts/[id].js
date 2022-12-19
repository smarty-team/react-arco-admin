import Head from "next/head";
import Layout from "../components/layout";
import ArticleViewer from "components/article-viewer";
import { useArticle } from "libs/article";
import { useMenuId } from "libs/menu";

// 生成 `/posts/1`,`/posts/2`,...
export async function getStaticPaths() {
  const paths = await useMenuId();
  return {
    paths,
    fallback: "blocking", // for ISR
  };
}

// `getStaticPaths` 要求使用 `getStaticProps`
export async function getStaticProps({ params }) {
  // 根据id获取对应文章内容
  const article = await useArticle(params.id);
  return {
    // 作为属性传递给页面组件
    props: { article },
  };
}

export default function Article({ article }) {
  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ArticleViewer article={article}></ArticleViewer>
    </Layout>
  );
}
