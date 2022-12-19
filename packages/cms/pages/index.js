import Head from "next/head";
import Layout from "./components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>前端大班车</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home Page</h1>
    </Layout>
  );
}
