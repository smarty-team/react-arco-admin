import Head from "next/head";
import Layout from "../components/layout";
import ArticleViewer from "components/article-viewer";
import { getArticle } from "@/libs/article";
import { flatMenu, getMenu, getMenuIds } from "libs/menu";
import { useUser } from "@/libs/user";
import Loading from "pages/components/loading";

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
  // 客户端获取用户信息
  const { user, error } = useUser({ callback: `/posts/${article._id}` });

  // 显示错误信息
  if (error) return <div>获取用户失败，请重试！</div>;

  // 如果用户信息不存在，显示加载状态
  if (!user) return <Loading></Loading>;

  return (
    <Layout menu={menu}>
      <Head>
        <title>{article.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="prose max-w-full">
        <ArticleViewer article={article}></ArticleViewer>
      </div>
    </Layout>
  );
}
