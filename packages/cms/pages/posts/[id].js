import Head from "next/head";
import Layout from "../components/layout";
import ArticleViewer from "components/article-viewer";
import { useArticle } from "libs/article";
import { useMenuId } from "libs/menu";
import { useUser } from "@/libs/user";
import { Affix } from "antd";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "styles/post.module.css";

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
  const ref = useRef();
  const [items, setItems] = useState([]);
  const [minLevel, setMinLevel] = useState(6);
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  useEffect(() => {
    console.log("init toc", ref.current);
    setTimeout(() => {
      if (ref.current) {
        console.log("init toc");
        const root = ref.current.querySelector(".markdown-body");

        /**
         * init table of content
         * refer to bytemd/packages/bytemd/src/toc.svelte
         **/
        const _items = [];
        let _minLevel = minLevel;
        // root.children is HTMLCollection
        Array.prototype.filter
          .call(root.children, (v) => v && v.nodeType === 1)
          .forEach((node, index) => {
            if (node.tagName[0].toLowerCase() === "h" && node.hasChildNodes()) {
              const i = Number(node.tagName[1]); // h1 h2 h3 h4 h5 h6
              _minLevel = Math.min(_minLevel, i);
              _items.push({
                level: i,
                text: node.innerText, // stringifyHeading(node),
              });
            }
          });
        setMinLevel(_minLevel);
        setItems(_items);
      }
    }, 0);
  }, [ref.current]);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        const root = ref.current.querySelector(".markdown-body");
        const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");

        const observer = new IntersectionObserver(
          (entries) => {
            const io = entries[0];
            if (io.isIntersecting === true) {
              const index = Array.prototype.indexOf.call(headings, io.target);
              setCurrentHeadingIndex((preState) => index);
            }
          },
          { threshold: [1] }
        );

        // observe all head
        headings.forEach((node) => observer.observe(node));

        return () => {
          headings.forEach((node) => observer.unobserve(node));
        };
      }
    }, 0);
  }, [ref.current]);

  const skipContent = (index) => {
    const root = ref.current.querySelector(".markdown-body");
    const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");
    setCurrentHeadingIndex(index);
    headings[index].scrollIntoView();
  };

  // 客户端获取用户信息
  const { user, error } = useUser({ callback: `/posts/${article._id}` });

  // 服务端渲染加载状态
  // 如果用户信息不存在，显示加载状态或错误信息
  if (!user || error) {
    let msg = "加载用户信息...";
    if (error) {
      msg = error.message || "加载用户信息出错, 请重试！";
    }
    return <Layout>{msg}</Layout>;
  }

  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex" ref={ref}>
        <ArticleViewer article={article} className="flex-1"></ArticleViewer>
        {items.length > 0 && (
          <div className="">
            <Affix offsetTop={90}>
              <div className="">
                <ul className="">
                  {items.map((item, index) => (
                    <li
                      key={String(index)}
                      className={`toc-${item.level} ${
                        currentHeadingIndex === index ? styles.active : ""
                      }`}
                      style={{ paddingLeft: (item.level - minLevel) * 16 + 8 }}
                      onClick={() => skipContent(index)}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Affix>
          </div>
        )}
      </div>
    </Layout>
  );
}
