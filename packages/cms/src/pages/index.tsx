import { flatMenu, getMenu } from "../libs/menu";
import Head from "next/head";
import Layout from "../components/layout";
import Counter from "../features/counter/Counter";

export async function getStaticProps() {
  const menu = await getMenu()

  return {
    // 作为属性传递给页面组件
    props: { menu: flatMenu(menu) },
  };
}

export default function Home({menu}) {
  return (
    <Layout menu={menu}>
      <Head>
        <title>前端大班车</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home Page</h1>
      <Counter />

    </Layout>
  );
}
