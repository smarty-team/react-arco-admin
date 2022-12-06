import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

const data = {
  2: `
    Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.
    
    - **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
    - **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.
    
    Importantly, Next.js let's you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.`,
  3: `
    We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

    You can use Static Generation for many types of pages, including:

    - Marketing pages
    - Blog posts
    - E-commerce product listings
    - Help and documentation

    You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

    On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

    In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
  `,
  5: `
    Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.
    
    - **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
    - **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.
    
    Importantly, Next.js let's you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.`,
  6: `
    We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

    You can use Static Generation for many types of pages, including:

    - Marketing pages
    - Blog posts
    - E-commerce product listings
    - Help and documentation

    You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

    On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

    In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
  `
};

export async function getPostData(id) {
  const fileContents = data[id];
  // 扉页内容
  const matterResult = matter(fileContents);
  // 内容
  const processContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processContent.toString()
  return {
    contentHtml,
    ...matterResult.data
  };
}

