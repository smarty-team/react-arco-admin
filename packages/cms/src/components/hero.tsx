import { Fragment } from "react";
import TimeLine from "./timeline";

export default function Hero() {
  return (
    <div className="px-4 sm:px-6 xl:px-8 pt-10 pb-16">
      <h1 className="text-5xl leading-none font-extrabold tracking-tight mb-4">
        🚀 工程师进阶之旅
      </h1>
      <p className="text-2xl tracking-tight mb-10">用最适合您的方式学习</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
        <section className="flex">
          <CardA1 />
        </section>
        <section className="flex">
          <CardA2 />
        </section>
        <section className="flex">
          <CardA3 />
        </section>
        <section className="flex">
          <CardA4 />
        </section>
        <section className="flex">
          <CardA5 />
        </section>
        <section className="flex">
          <CardA6 />
        </section>

        <section className="md:col-span-3 flex flex-wrap md:flex-nowrap items-center bg-gray-800 shadow-lg rounded-2xl py-6 md:py-4 px-6 md:pr-5 space-y-4 md:space-y-0 md:space-x-8">
          <Card2 />
        </section>
      </div>
      {/* <section>
        <h2 className="text-3xl tracking-tight font-extrabold mt-16 mb-8">
          Tailwind 的新变化
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 xl:gap-8 font-semibold text-gray-900 text-center">
          <li className="flex">
            <Card3 />
          </li>
          <li className="flex">
            <Card3 />
          </li>
          <li className="flex">
            <Card3 />
          </li>
          <li className="flex">
            <Card3 />
          </li>
          <li className="flex">
            <Card3 />
          </li>
          <li className="flex">
            <Card3 />
          </li>
          <li className="flex">
            <Card3 />
          </li>
          <li className="flex">
            <Card3 />
          </li>
          <li className="flex">
            <Card3 />
          </li>
        </ul>
      </section> */}
      <section>
        <header className="flex items-center justify-between mt-16 mb-8">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900">
            最近的更新
          </h2>
          <a
            href="https://blog.tailwindcss.com"
            className="font-medium text-gray-900"
          >
            查看所有最近的更新
          </a>
        </header>
        <TimeLine></TimeLine>
      </section>
      <section>
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 mt-16 mb-8">
          参与社区
        </h2>
        <ListCard></ListCard>
      </section>
    </div>
  );
}

function CardA1(props) {
  return (
    <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
      <div
        className={`w-full flex md:flex-col bg-gradient-to-br from-purple-500  to-indigo-500`}
      >
        <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
          <h2 className="text-xl font-semibold mb-2 text-shadow">Vue系列</h2>
          <p className="font-medium text-violet-100 text-shadow mb-4">
            大厂真题精选 50 +
          </p>
          <a
            className="mt-auto bg-violet-800 bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex"
            href="/docs/installation"
          >
            开始学习
          </a>
        </div>
        <div className="docs_image__1HDuG relative md:pl-6 xl:pl-8 hidden sm:block"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20 hidden sm:block"
      // style="background:linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))"
      ></div>
    </div>
  );
}

function CardA2(props) {
  return (
    <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
      <div
        className={`w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500`}
      >
        <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
          <h2 className="text-xl font-semibold mb-2 text-shadow">
            React面试通关
          </h2>
          <p className="font-medium text-violet-100 text-shadow mb-4">
            大厂真题精选 30 +
          </p>
          <a
            className="mt-auto bg-rose-900 bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex"
            href="/docs/installation"
          >
            开始学习
          </a>
        </div>
        <div className="docs_image__1HDuG relative md:pl-6 xl:pl-8 hidden sm:block"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20 hidden sm:block"
      // style="background:linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))"
      ></div>
    </div>
  );
}

function CardA3(props) {
  return (
    <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
      <div
        className={`w-full flex md:flex-col bg-gradient-to-br from-yellow-400 to-orange-500`}
      >
        <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
          <h2 className="text-xl font-semibold mb-2 text-shadow">
            Webpack系列
          </h2>
          <p className="font-medium text-violet-100 text-shadow mb-4">
            大厂真题 20 +
          </p>
          <a
            className="mt-auto bg-amber-900 bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex"
            href="/docs/installation"
          >
            开始学习
          </a>
        </div>
        <div className="docs_image__1HDuG relative md:pl-6 xl:pl-8 hidden sm:block"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20 hidden sm:block"
      // style="background:linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))"
      ></div>
    </div>
  );
}

function CardA4(props) {
  return (
    <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
      <div
        className={`w-full flex md:flex-col bg-gradient-to-br from-green-500  to-green-800`}
      >
        <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
          <h2 className="text-xl font-semibold mb-2 text-shadow">
            HTML、CSS系列
          </h2>
          <p className="font-medium text-violet-100 text-shadow mb-4">
            大厂真题 50 +
          </p>
          <a
            className="mt-auto bg-green-800 bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex"
            href="/docs/installation"
          >
            开始学习
          </a>
        </div>
        <div className="docs_image__1HDuG relative md:pl-6 xl:pl-8 hidden sm:block"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20 hidden sm:block"
      // style="background:linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))"
      ></div>
    </div>
  );
}

function CardA5(props) {
  return (
    <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
      <div
        className={`w-full flex md:flex-col bg-gradient-to-br from-blue-500 to-indigo-800`}
      >
        <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
          <h2 className="text-xl font-semibold mb-2 text-shadow">JS、TS系列</h2>
          <p className="font-medium text-violet-100 text-shadow mb-4">
            大厂真题 30 +
          </p>
          <a
            className="mt-auto bg-blue-900 bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex"
            href="/docs/installation"
          >
            开始学习
          </a>
        </div>
        <div className="docs_image__1HDuG relative md:pl-6 xl:pl-8 hidden sm:block"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20 hidden sm:block"
      // style="background:linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))"
      ></div>
    </div>
  );
}

function CardA6(props) {
  return (
    <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
      <div
        className={`w-full flex md:flex-col bg-gradient-to-br from-pink-400 to-red-500`}
      >
        <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
          <h2 className="text-xl font-semibold mb-2 text-shadow">NodeJS系列</h2>
          <p className="font-medium text-violet-100 text-shadow mb-4">
            大厂真题 20 +
          </p>
          <a
            className="mt-auto bg-red-900 bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex"
            href="/docs/installation"
          >
            开始学习
          </a>
        </div>
        <div className="docs_image__1HDuG relative md:pl-6 xl:pl-8 hidden sm:block"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20 hidden sm:block"
      // style="background:linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))"
      ></div>
    </div>
  );
}

function Card2() {
  return (
    <Fragment>
      <h2 className="flex-none">🚌</h2>
      <p className="flex-auto text-white text-lg font-medium">
        本站由【Web全栈工程师进阶课程】代码实现，课程上新<span className="text-red-400">限时 5 折</span>👉🏻👉🏻👉🏻
      </p>
      <a
        href="/landing"
        className="flex-none bg-white hover:bg-gray-100 transition-colors duration-200 text-gray-900 font-semibold rounded-lg py-3 px-4"
      >
        浏览课程
      </a>
    </Fragment>
  );
}

function Card3() {
  return (
    <a
      className="relative rounded-xl ring-1 ring-black ring-opacity-5 shadow-sm w-full pt-8 pb-6 px-6"
      href="/docs/ring-width"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="144"
        height="48"
        fill="none"
        viewBox="0 0 144 48"
        className="h-auto max-w-full mx-auto mb-3"
      >
        <path fill="#fff" d="M0 0h144v48H0z"></path>
        <path
          fill="#A5F3FC"
          d="M46 11a4 4 0 00-4 4v12a4 4 0 004 4h26.638l-2.412-5.858a3 3 0 013.916-3.916l17 7A3 3 0 0193 31h5a4 4 0 004-4V15a4 4 0 00-4-4H46z"
        ></path>
        <path
          fill="#22D3EE"
          d="M72.293 23.293a1 1 0 011.088-.218l17 7a1 1 0 01.013 1.844l-4.653 1.994 5.673 5.673a1 1 0 010 1.414L90 42.414a1 1 0 01-1.414 0l-5.673-5.672-1.994 4.652a1 1 0 01-1.844-.013l-7-17a1 1 0 01.218-1.088z"
        ></path>
        <path
          fill="#22D3EE"
          d="M38 15a8 8 0 018-8h52a8 8 0 018 8v12a8 8 0 01-8 8h-8.343l-.412-.412 1.937-.83A2.994 2.994 0 0092.236 33H98a6 6 0 006-6V15a6 6 0 00-6-6H46a6 6 0 00-6 6v12a6 6 0 006 6h27.462l.823 2H46a8 8 0 01-8-8V15z"
        ></path>
      </svg>
      Focus 轮廓环功能类
      <span className="absolute top-2 right-2 bg-fuchsia-100 text-fuchsia-600 rounded-full text-xs py-0.5 px-2">
        2.0+
      </span>
    </a>
  );
}
function ListCard() {
  return (
    <ul className="grid sm:grid-cols-2 gap-6 xl:gap-8">
      <li>
        <a
          href="https://github.com/smarty-team/react-arco-admin"
          className="flex items-start space-x-4"
        >
          <svg
            fill="currentColor"
            className="flex-none text-gray-900 w-12 h-12"
          >
            <rect width="48" height="48" rx="12"></rect>
            <path
              d="M23.997 12a12 12 0 00-3.792 23.388c.6.12.816-.264.816-.576l-.012-2.04c-3.336.72-4.044-1.608-4.044-1.608-.552-1.392-1.332-1.764-1.332-1.764-1.08-.744.084-.72.084-.72 1.2.084 1.836 1.236 1.836 1.236 1.08 1.824 2.808 1.296 3.492.996.12-.78.42-1.308.756-1.608-2.664-.3-5.46-1.332-5.46-5.928 0-1.32.468-2.388 1.236-3.228a4.32 4.32 0 01.12-3.168s1.008-.324 3.3 1.224a11.496 11.496 0 016 0c2.292-1.56 3.3-1.224 3.3-1.224.66 1.644.24 2.88.12 3.168.768.84 1.236 1.92 1.236 3.228 0 4.608-2.808 5.616-5.484 5.916.432.372.816 1.104.816 2.22l-.012 3.3c0 .312.216.696.828.576A12 12 0 0023.997 12z"
              fill="currentColor"
              className="text-gray-50"
            ></path>
          </svg>
          <div className="flex-auto">
            <h3 className="font-bold text-gray-900">GitHub </h3>
            <p>学习本站源代码</p>
          </div>
        </a>
      </li>
      <li>
        <a href="https://www.josephxia.com/landing" className="flex items-start space-x-4">
          <svg
            fill="currentColor"
            className="flex-none text-indigo-400 w-12 h-12"
          >
            <rect width="48" height="48" rx="12"></rect>
            <path
              d="M21.637 23.57c-.745 0-1.332.653-1.332 1.45 0 .797.6 1.45 1.332 1.45.744 0 1.332-.653 1.332-1.45.013-.797-.588-1.45-1.332-1.45zm4.767 0c-.744 0-1.332.653-1.332 1.45 0 .797.6 1.45 1.332 1.45.745 0 1.332-.653 1.332-1.45 0-.797-.587-1.45-1.332-1.45z"
              fill="currentColor"
              className="text-indigo-50"
            ></path>
            <path
              d="M32.75 12.613H15.248a2.684 2.684 0 00-2.678 2.69v17.66a2.684 2.684 0 002.678 2.69h14.811l-.692-2.416 1.672 1.554 1.58 1.463 2.809 2.482V15.304a2.684 2.684 0 00-2.678-2.69zm-5.042 17.058s-.47-.561-.862-1.058c1.711-.483 2.364-1.554 2.364-1.554-.535.353-1.045.6-1.502.77a8.591 8.591 0 01-1.894.562 9.151 9.151 0 01-3.383-.013 10.964 10.964 0 01-1.92-.561 7.652 7.652 0 01-.953-.445c-.04-.026-.078-.039-.117-.065-.027-.013-.04-.026-.053-.039-.235-.13-.365-.222-.365-.222s.627 1.045 2.285 1.541c-.392.497-.875 1.084-.875 1.084-2.886-.091-3.983-1.985-3.983-1.985 0-4.206 1.88-7.615 1.88-7.615C20.211 18.661 22 18.7 22 18.7l.131.157c-2.35.679-3.435 1.71-3.435 1.71s.287-.156.77-.378c1.398-.614 2.508-.784 2.965-.823.079-.013.144-.026.223-.026a10.647 10.647 0 016.57 1.228s-1.033-.98-3.253-1.66l.183-.208s1.79-.04 3.67 1.371c0 0 1.881 3.41 1.881 7.615 0 0-1.11 1.894-3.997 1.985z"
              fill="currentColor"
              className="text-indigo-50"
            ></path>
          </svg>
          <div className="flex-auto">
            <h3 className="font-bold text-gray-900">视频课程</h3>
            <p>学习本站视频搭建方法</p>
          </div>
        </a>
      </li>
      {/* <li>
        <a
          href="https://twitter.com/tailwindcss"
          className="flex items-start space-x-4"
        >
          <svg
            fill="currentColor"
            className="flex-none text-light-blue-400 w-12 h-12"
          >
            <rect width="48" height="48" rx="12"></rect>
            <path
              d="M37.127 15.989h-.001a11.04 11.04 0 01-3.093.836 5.336 5.336 0 002.37-2.932 10.815 10.815 0 01-3.421 1.284 5.42 5.42 0 00-3.933-1.679c-2.976 0-5.385 2.373-5.385 5.3-.003.406.044.812.138 1.207a15.351 15.351 0 01-11.102-5.54 5.235 5.235 0 00-.733 2.663c0 1.837.959 3.461 2.406 4.413a5.338 5.338 0 01-2.449-.662v.066c0 2.57 1.86 4.708 4.32 5.195a5.55 5.55 0 01-1.418.186c-.34 0-.68-.033-1.013-.099.684 2.106 2.676 3.637 5.034 3.68a10.918 10.918 0 01-6.69 2.269 11.21 11.21 0 01-1.285-.077 15.237 15.237 0 008.242 2.394c9.918 0 15.337-8.077 15.337-15.083 0-.23-.006-.459-.017-.683a10.864 10.864 0 002.686-2.746l.007.008z"
              fill="currentColor"
              className="text-light-blue-50"
            ></path>
          </svg>
          <div className="flex-auto">
            <h3 className="font-bold text-gray-900">Twitter</h3>
            <p>关注 Tailwind 的推特账户，了解新闻和更新。</p>
          </div>
        </a>
      </li> */}
      <li>
        <a
          href="https://space.bilibili.com/478824720"
          className="flex items-start space-x-4"
        >
          <svg fill="currentColor" className="flex-none text-red-500 w-12 h-12">
            <rect width="48" height="48" rx="12"></rect>
            <path
              d="M36.83 18.556c0-2.285-1.681-4.124-3.758-4.124a184.713 184.713 0 00-8.615-.182h-.914c-2.925 0-5.799.05-8.612.183-2.072 0-3.753 1.848-3.753 4.133A75.6 75.6 0 0011 23.99a78.487 78.487 0 00.173 5.429c0 2.285 1.68 4.139 3.753 4.139 2.955.137 5.987.198 9.07.192 3.087.01 6.11-.054 9.069-.193 2.077 0 3.758-1.853 3.758-4.138.121-1.813.177-3.62.172-5.434a73.982 73.982 0 00-.165-5.428zM21.512 28.97v-9.979l7.363 4.987-7.363 4.992z"
              fill="currentColor"
              className="text-red-50"
            ></path>
          </svg>
          <div className="flex-auto">
            <h3 className="font-bold text-gray-900">Bilibili</h3>
            <p>欢迎参观全栈然叔的B栈。</p>
          </div>
        </a>
      </li>
      <li>
        <a
          href="https://space.bilibili.com/480140591"
          className="flex items-start space-x-4"
        >
          <svg fill="currentColor" className="flex-none text-red-500 w-12 h-12">
            <rect width="48" height="48" rx="12"></rect>
            <path
              d="M36.83 18.556c0-2.285-1.681-4.124-3.758-4.124a184.713 184.713 0 00-8.615-.182h-.914c-2.925 0-5.799.05-8.612.183-2.072 0-3.753 1.848-3.753 4.133A75.6 75.6 0 0011 23.99a78.487 78.487 0 00.173 5.429c0 2.285 1.68 4.139 3.753 4.139 2.955.137 5.987.198 9.07.192 3.087.01 6.11-.054 9.069-.193 2.077 0 3.758-1.853 3.758-4.138.121-1.813.177-3.62.172-5.434a73.982 73.982 0 00-.165-5.428zM21.512 28.97v-9.979l7.363 4.987-7.363 4.992z"
              fill="currentColor"
              className="text-red-50"
            ></path>
          </svg>
          <div className="flex-auto">
            <h3 className="font-bold text-gray-900">Bilibili</h3>
            <p>欢迎参观全栈然叔的B栈。</p>
          </div>
        </a>
      </li>
    </ul>
  );
}
