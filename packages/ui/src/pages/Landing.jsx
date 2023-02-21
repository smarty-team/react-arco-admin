import { useNavigate } from "react-router";

import Menu from "../components/menu";
import NavBar from "../components/content/navbar";
import Footer from "../components/content/footer";
import { useState } from "react";
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-base-100 drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar></NavBar>
        <Hero1></Hero1>
        {/* <Footer></Footer> */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <Menu></Menu>
      </div>
    </div>
  );
}

function MyFooter() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
}

function Hero1() {
  return (
    <div class="">
      {" "}
      <div class="from-primary to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-20">
        <Primary />
        <Section1 />
        <Section2 />
        <Section3 />
        <Footer />
      </div>
    </div>
  );
}

function Primary() {
  function Round() {
    return (
      <svg
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block h-6 w-6 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    );
  }

  return (
    <div class="from-primary to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-20">
      <div class="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-40 lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
        <div class="lg:pl-10 lg:pb-32">
          <div class="mb-2 py-4 text-center lg:py-10 lg:text-left">
            <h1 class="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              🚀 Web全栈工程师进阶实战
            </h1>{" "}
            <h2 class="font-title text-lg font-extrabold sm:text-xl lg:text-2xl">
              基于Typscript、React 、NestJS 、NextJS、Docker的企业级实战课程
            </h2>
          </div>{" "}
          <div class="flex w-full flex-col items-center space-y-10 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0">
            <div class="my-2 flex max-w-sm flex-col gap-2 text-left">
              <div class="flex gap-2">
                <Round /> 掌握NestJS + NextJS + Typescript 的全栈思想
              </div>{" "}
              <div class="flex gap-2">
                <Round /> 搭建企业级中后台框架
              </div>{" "}
              <div class="flex gap-2">
                <Round /> 体验真实的企业开发流程
              </div>{" "}
              <div class="flex gap-2">
                <Round /> 实现前端高性能网站开发
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div class="mt-4 flex flex-1 justify-center space-x-2 lg:mt-6 lg:justify-start">
            <a
              href="/components"
              class="btn btn-ghost btn-active lg:btn-lg normal-case"
            >
              <span class="hidden sm:inline">浏览Demo</span>{" "}
              <span class="inline sm:hidden">组件</span>
            </a>{" "}
            <a href="/docs/install" class="btn lg:btn-lg normal-case">
              购买链接
            </a>
          </div>
        </div>{" "}
        <div>
          <div class="w-full min-w-[330px] max-w-[350px] h-[100px]">
            <script
              async=""
              type="text/javascript"
              src="//cdn.carbonads.com/carbon.js?serve=CEAI423U&amp;placement=daisyuicom"
              id="_carbonads_js"
            ></script>
            <div id="carbonads">
              <span>
                <span class="carbon-wrap">
                  <a
                    class="carbon-img"
                    target="_blank"
                    rel="noopener sponsored"
                  >
                    {/* <img src="https://cdn4.buysellads.net/uu/1/127308/1673380159-carbon_260x200_ad_pricing.png" alt="ads via Carbon" border="0" height="100" width="130" style="max-width: 130px;"> */}
                  </a>
                  <a
                    class="carbon-text"
                    target="_blank"
                    rel="noopener sponsored"
                  >
                    从0到１平滑上手 NestJS+ React + NextJS + 全栈开发。
                  </a>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
      <svg
        class="fill-secondary col-start-1 row-start-1 h-auto w-full"
        width="1600"
        height="595"
        viewBox="0 0 1600 595"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"></path>
      </svg>
    </div>
  );
}

function Section1() {
  return (
    <div class="hero bg-base-100 text-base-content mx-auto max-w-md md:max-w-full">
      <div class="hero-content px-4 text-center md:px-0">
        <div>
          <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">
            抓住前端向全栈延伸的普遍痛点
          </h2>
          {"    "}
          <h3 class="mb-5 text-3xl font-bold">
            研磨一套React专属课程体系
          </h3>{" "}
          <p class="mx-auto mb-5 w-full max-w-lg">
            从0到１平滑上手 <span class="badge badge-outline"> NestJS </span>+{" "}
            <span class="badge badge-outline"> React </span> +{" "}
            <span class="badge badge-outline"> NextJS </span> + {"     "}
            全栈开发。
          </p>{" "}
          <div class="mt-10 mb-20 flex flex-col lg:flex-row">
            <img src="/src/assets/p0.png" />
          </div>
          <div class="mt-10 mb-20 flex flex-col lg:flex-row">
            <div class="flex w-full flex-col text-left">
              <img src="/src/assets/d2.gif" alt="" />
            </div>{" "}
            <div class="flex w-full flex-col text-left">
              <img src="/src/assets/d1.gif" alt="" />
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

/**
 * 架构图
 * @returns
 */
function Section2() {
  return (
    <div class="hero bg-base-100 text-base-content mx-auto max-w-md md:max-w-full">
      <div class="hero-content px-4 text-center md:px-0">
        <div>
          <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">
            快速开发可复用、可扩展的企业级全栈应用
          </h2>
          {"    "}
          <h3 class="mb-5 text-3xl font-bold">
            掌握前端高阶人才的核心技能
          </h3>{" "}
          <p>
            从前端、后端、测试到部署，企业开发全流程实战，提升项目开发的全局观
          </p>
          <div class="mt-10 mb-20 flex flex-col lg:flex-row">
            <img src="/src/assets/p11.png" />
          </div>
          <div class="mt-10 mb-20 flex flex-col lg:flex-row">
            <img src="/src/assets/p12.png" />
          </div>
          <div class="mt-10 mb-20 flex flex-col lg:flex-row">
            <img src="/src/assets/p14.png" />
          </div>
          <div class="mt-10 mb-20 flex flex-col lg:flex-row">
            <img src="/src/assets/p13.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 课程大纲
 * @returns
 */
function Section3() {
  return (
    <div class="hero bg-base-100 text-base-content mx-auto max-w-md md:max-w-full">
      <div class="hero-content px-4 text-center md:px-0">
        <div>
          <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">
            课程大纲
          </h2>
          {"    "}
          <h3 class="mb-5 text-3xl font-bold">
            落地技术点丰富，严抠开发细节，强化代码质量，助力前端高手养成
          </h3>{" "}
          {/* <div class="mt-10 flex flex-col lg:flex-row">
            <img src="/src/assets/p3.png" />
          </div> */}
          <div class="mt-10 flex flex-col items-center">
            <Card1 />
            <Card2 />
            <Card3 />
            <Card4 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-open border border-base-300 bg-base-100 rounded-box md:w-1/2 w-full my-2"
    >
      <div className="collapse-title text-xl font-medium">{props.header}</div>
      <div className="collapse-content mx-4 ">{props.contents}</div>
    </div>
  );
}

function Card1() {
  return (
    <Card
      header="NestJS 中后台实战"
      contents={
        <ul className="list-decimal text-left">
          <li>
            基础篇
            <ul className="ml-4 list-disc text-left">
              <li>为什么Nest是Node开发的首选框架</li>
              <li>快速搭建nestjs 开发环境</li>
              <li>RESTful API风格</li>
              <li>Swagger接口文档</li>
              <li>Class-Validator 数据校验</li>
              <li>控制反转 IOC 与 DI</li>
              <li>模块化 Modules</li>
              <li>异常过滤器 - 异常处理</li>
              <li>拦截器 - 统一返回格式</li>
            </ul>
          </li>
          <li>
            服务端开发
            <ul className="ml-4 list-disc text-left">
              <li>配置管理</li>
              <li>数据库与ORM</li>
              <li>日志收集</li>
              <li>RESTful接口开发</li>&#x20;
              <li>门卫Guard与拦截器 Incepter的作用</li>
              <li>基于JsonWebToken的登录鉴权</li>
              <li>Key-Value数据库Redis</li>
              <li>基于Redis验证码验证码过期</li>
              <li>RBAC权限设计</li>
              <li>短信接口联调</li>
              <li>CMS系统实现</li>
              <li>数据备份与恢复功能</li>
              <li>单元测试</li>
              <li>集成测试</li>
            </ul>
          </li>
        </ul>
      }
    ></Card>
  );
}

function Card2() {
  return (
    <Card
      header="React  + ArcoDesign 的中后台"
      contents={
        <ul className="list-decimal text-left">
          <li>
            React基础篇
            <ul className="ml-4 list-disc text-left">
              <li>React基础</li>
              <li>JSX</li>
              <li>CSS in JS</li>
              <li>React组件化开发</li>
              <li>React Hooks</li>
              <li>状态管理</li>
              <li>整合AD</li>
              <li>架构拆解</li>
              <li>国际化</li>
              <li>数据模拟</li>
              <li>权限控制</li>
            </ul>
          </li>
          <li>
            TS in React
            <ul className="ml-4 list-disc text-left">
              <li>ts基础</li>
              <li>tsx</li>
              <li>组件强类型定义</li>
              <li>props和state类型</li>
              <li>redux类型处理</li>
            </ul>
          </li>
          <li>
            管理后台开发
            <ul className="ml-4 list-disc text-left">
              <li>用户登录</li>
              <li>看板模块</li>
              <li>用户管理</li>
              <li>角色管理</li>
              <li>内容管理</li>
              <li>数据库管理</li>
              <li>服务器状态监控</li>
              <li>字典管理模块</li>
              <li>日志监控</li>
              <li>错误处理</li>
            </ul>
          </li>
        </ul>
      }
    ></Card>
  );
}

function Card3() {
  return (
    <Card
      header="Next.js 高性能网站开发实战"
      contents={
        <ul className="list-decimal text-left">
          <li>
            Next.js基础
            <ul className="ml-4 list-disc text-left">
              <li>快速创建项目</li>
              <li>页面创建</li>
              <li>文件路由</li>
              <li>内建CSS支持</li>
              <li>布局layout</li>
              <li>静态资源管理</li>
              <li>API路由</li>
              <li>数据获取</li>
              <li>多种渲染模式</li>
              <li>项目打包部署</li>
            </ul>
          </li>
          <li>
            CMS网站开发
            <ul className="ml-4 list-disc text-left">
              <li>页面创建</li>
              <li>路由导航</li>
              <li>页面布局</li>
              <li>Meta信息</li>
              <li>数据请求</li>
              <li>服务端渲染</li>
              <li>静态网站生成</li>
              <li>MD文档展示</li>
              <li>主题切换</li>
              <li>站内搜索</li>
            </ul>
          </li>
        </ul>
      }
    ></Card>
  );
}

function Card4() {
  return (
    <Card
      header="Docker部署与持续集成"
      contents={
        <ul className="list-disc text-left">
          <li>安全加固： CORS & helmet & RateLimit</li>
          <li>PM2进程守护PM2</li>
          <li>Docker容器化封装</li>
          <li>Linux的基础</li>
          <li>Nginx实现反向代理</li>
          <li>阿里云域名解析、安全朱</li>
          <li>打造自动化工作流</li>
          <li>Github Action 实现持续集成</li>
        </ul>
      }
    ></Card>
  );
}
