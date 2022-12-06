import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "./components/layout";

export async function getStaticProps(context) {
  return {
    props: {
      data: {},
    },
  };
}
export default function Home({ data }) {
  return (
    <Layout>
      <Head>
        <title>Smart Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home Page</h1>
      <main className="bg-base-200">
        <button className="btn">Button</button>
        <div className="btn btn-ghost px-2">xxx</div>
        {/* <ul className="menu bg-base-100 p-2 rounded-box">
        <li className="menu-title">
          <span>前端框架</span>
        </li>
        <li>
          <a>React</a>
        </li>
        <li>
          <a>Vue</a>
        </li>
        <li className="menu-title">
          <span>基础知识</span>
        </li>
        <li>
          <a className="active">JavaScript</a>
        </li>
        <li>
          <a>CSS</a>
        </li>
      </ul> */}
      </main>
    </Layout>
  );
}
