import Head from "next/head";
import Layout from "../../components/layout";
import { ArticleViewer } from "../../components/article-viewer";
import { getArticle } from "../../libs/article";
import { flatMenu, getMenu, getMenuIds } from "../../libs/menu";
import { useNeedLogin } from "../../libs/user";
import { useRouter } from "next/router";
import { Confirm } from "../../components/confirm";

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
  // 如果不满足登录或新用户要求，需要重新登录
  const { needLogin, message } = useNeedLogin();
  const router = useRouter();

  return (
    <Layout menu={menu}>
      <Head>
        <title>{article ? article.title + '前端大班车' : '前端大班车'}</title>
      </Head>
      {needLogin ? (
        <Confirm
          title="需要登录"
          message={message}
          btnText="去登录"
          callback={() => router.push(`/login?callback=/posts/${article._id}`)}
        ></Confirm>
      ) : (
        <div className="prose max-w-full">
          {article ? <ArticleViewer article={article}></ArticleViewer> : <div className="p-4">没有内容可以显示，可以试试别的文章</div>}  
        </div>
      )}
    </Layout>
  );
}
