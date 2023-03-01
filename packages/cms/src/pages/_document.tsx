import { Html, Head, Main, NextScript } from "next/document";

function createMarkup() {
  return {
    __html: `var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?83882d256e3353ab5f39c27a3fa50b23";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();`,
  };
}
function BaiduScript() {
  return <script dangerouslySetInnerHTML={createMarkup()}></script>;
}

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id="portal"></div>
        <NextScript />
        <BaiduScript></BaiduScript>
      </body>
    </Html>
  );
}
