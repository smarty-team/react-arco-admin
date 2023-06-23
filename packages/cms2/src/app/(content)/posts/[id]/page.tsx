import { Metadata } from "next";
import { getMenu, getMenuIds } from "../../libs/menu";
import { ArticleViewer } from "./components/article-viewer";

export async function generateStaticParams() {
  const menu = await getMenu("http://localhost:3000/menus");
  return getMenuIds(menu);
}

// 获取菜单数据
export async function getArticle(id: string) {
  return fetch("http://localhost:3000/article/" + id)
    .then((res) => res.json())
    .then((json) => json.data);
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const article = await getArticle(params.id);
  return {
    title: article.title,
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  return (
    <div className="prose max-w-full">
      {article ? (
        <ArticleViewer article={article}></ArticleViewer>
      ) : (
        "没有内容可以显示，可以试试别的文章"
      )}
    </div>
  );
}
