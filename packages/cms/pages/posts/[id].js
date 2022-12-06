import Head from "next/head";
import Layout from "../../components/layout";
import { getMenuIDs } from "../../libs/menus";
import { getPostData } from "../../libs/posts";

// 生成 `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const paths = await getMenuIDs();
  return {
    paths,
    fallback: "blocking",
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  // 根据id获取对应文章内容
  const postData = await getPostData(params.id);
  return {
    // Passed to the page component as props
    props: { postData },
  };
}

export default function Home({ postData }) {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>{postData.title}</h2>
      <p>{postData.data}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
