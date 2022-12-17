import Head from "next/head";
import Layout from "../components/layout";
import ArticleViewer from "components/article-viewer";
import { useArticle } from "libs/article";
import { useMenuId } from "libs/menu";

// 生成 `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const paths = await useMenuId();
  return {
    paths,
    fallback: "blocking",
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  // 根据id获取对应文章内容
  const article = await useArticle(params.id);
  return {
    // Passed to the page component as props
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
      {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
    </Layout>
  );
}
