import Head from "next/head";
import Link from 'next/link'
import Layout from "../components/layout";
import ArticleViewer from "components/article-viewer";
import { getArticle } from "@/libs/article";
import { flatMenu, getMenu, getMenuIds } from "libs/menu";
import { useUser } from "@/libs/user";
import Loading from "pages/components/loading";
import { useRouter } from "next/router";
import { useToken } from "@/libs/token";

// 生成 `/posts/1`,`/posts/2`,...
export async function getStaticPaths() {
  const menu = await getMenu();
  const paths = getMenuIds(menu);
  return {
    paths,
    fallback: "blocking", // for ISR
  };
}

// `getStaticPaths` 要求使用 `getStaticProps`
export async function getStaticProps({ params }) {
  const menu = await getMenu();
  // 根据id获取对应文章内容
  const article = await getArticle(params.id);
  return {
    // 作为属性传递给页面组件
    props: { menu: flatMenu(menu), article },
  };
}

export default function Article({ menu, article }) {
  const token = useToken(article._id)

  // 获取用户信息
  const { error, isLoading } = useUser({
    token,
    callback: `/posts/${article._id}`,
  });
  // 显示错误信息
  if (error) return <div>获取用户失败，<Link href="/login" className="link link-info">请重试</Link>！</div>;

  // 显示加载状态
  if (isLoading) return <Loading></Loading>;

  return (
    <Layout menu={menu}>
      <Head>
        <title>{article.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="prose max-w-full">
        <h1 className="pl-5 mt-4">{article.title}</h1> <ArticleViewer article={article}></ArticleViewer>
      </div>
    </Layout>
  );
}
