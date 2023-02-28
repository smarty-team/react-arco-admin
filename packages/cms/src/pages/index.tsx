import { flatMenu, getMenu } from "../libs/menu";
import Head from "next/head";
import Layout from "../components/layout";
import Hero from "../components/hero";

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
      <Hero></Hero>
    </Layout>
  );
}
